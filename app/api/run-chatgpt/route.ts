import { chromium } from "playwright";
import { writeFile, readFile } from "fs/promises";
import { spawn } from "child_process";
import path from "path";

const CHROME_PATH =
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";

const CHROME_PROFILE = "C:\\chrome-playwright";

const CDP_URL = "http://localhost:9222";

async function isChromeRunning() {
  try {
    const response = await fetch(CDP_URL);
    return response.ok;
  } catch {
    return false;
  }
}

function startChrome() {
  spawn(
    CHROME_PATH,
    ["--remote-debugging-port=9222", `--user-data-dir=${CHROME_PROFILE}`],
    {
      detached: true,
      stdio: "ignore",
    },
  ).unref();
}

async function waitForChrome() {
  for (let i = 0; i < 20; i++) {
    if (await isChromeRunning()) {
      return;
    }

    await new Promise((resolve) => setTimeout(resolve, 500));
  }

  throw new Error("Chromeの起動に失敗しました");
}

async function updateLogsIndex(logType: string, slug: string, code: string) {
  const exportMatch = code.match(/export const (\w+)/);

  if (!exportMatch) {
    throw new Error("ログのexport名を取得できませんでした");
  }

  const exportName = exportMatch[1];

  const indexPath = path.join(process.cwd(), "data", "logs", "index.ts");

  let indexCode = await readFile(indexPath, "utf-8");

  const importLine = `import { ${exportName} } from "./${logType}/${slug}";`;

  // importを追加
  if (!indexCode.includes(importLine)) {
    const logTypeImport = `${importLine}\n`;

    indexCode = indexCode.replace(
      /import \{ Log \} from "\.\/types";/,
      `${logTypeImport}import { Log } from "./types";`,
    );
  }

  // logs配列に追加
  const logEntry = `  ${exportName},`;

  if (!indexCode.includes(logEntry)) {
    indexCode = indexCode.replace(/(\n\];)/, `\n${logEntry}$1`);
  }

  await writeFile(indexPath, indexCode, "utf-8");
}

export async function POST(request: Request) {
  try {
    const { prompt, chatUrl, logType, slug } = await request.json();

    // ============================================================
    // Chrome
    // ============================================================

    if (!(await isChromeRunning())) {
      console.log("専用Chromeを起動します");
      startChrome();
      await waitForChrome();
    }

    // Chromeへ接続
    const browser = await chromium.connectOverCDP(CDP_URL);

    const context = browser.contexts()[0];
    const page = await context.newPage();

    await page.goto(chatUrl, {
      waitUntil: "domcontentloaded",
    });

    // ============================================================
    // ChatGPTの入力欄
    // ============================================================

    const editable = page.locator(
      'div#prompt-textarea[contenteditable="true"], ' +
        'div#prompt-textarea[contenteditable="plaintext-only"]',
    );

    await editable.waitFor({
      state: "visible",
      timeout: 30000,
    });

    console.log("ChatGPT入力欄を確認しました");

    // 入力欄をクリックしてフォーカス
    await editable.click();

    // ============================================================
    // プロンプト入力
    // ============================================================
    //
    // keyboard.type() / keyboard.insertText() は、
    // ChatGPT側のComposerでMarkdownの自動整形や
    // 改行の扱いに影響する可能性がある。
    //
    // fill()ならEnterキーを発生させず、
    // 改行を含む文字列を一度に入力できる。
    //
    await editable.fill(prompt);

    console.log("ChatGPTにプロンプトを入力しました");

    // 入力欄の内容を確認
    const inputText = await editable.innerText();

    console.log("ChatGPT入力欄の文字数:", inputText.length);

    console.log(
      "ChatGPT入力欄の改行数:",
      (inputText.match(/\n/g) || []).length,
    );

    // 入力が完全に空なら失敗
    if (!inputText.trim()) {
      throw new Error("ChatGPTの入力欄への入力に失敗しました");
    }

    // ============================================================
    // 送信
    // ============================================================

    await page.waitForTimeout(300);

    // 入力欄にフォーカスした状態でEnterを1回だけ送信
    await editable.press("Enter");

    console.log("ChatGPTへ送信しました");

    // ============================================================
    // 回答生成待ち
    // ============================================================

    await page.waitForTimeout(500);

    // 「回答を停止」ボタンはUI変更で存在しない場合があるため、
    // 必須条件にはしない。
    const stopButton = page.locator(
      'button[aria-label="回答を停止"], ' +
        'button[aria-label="Stop generating"]',
    );

    try {
      await stopButton.waitFor({
        state: "visible",
        timeout: 10000,
      });

      console.log("回答生成開始を確認しました");

      await stopButton.waitFor({
        state: "hidden",
        timeout: 120000,
      });

      console.log("回答生成完了を確認しました");
    } catch {
      console.log("回答停止ボタンを確認できなかったため、回答本文を待機します");
    }

    // ============================================================
    // 回答取得
    // ============================================================

    const answers = page.locator('[data-message-author-role="assistant"]');

    await answers.last().waitFor({
      state: "visible",
      timeout: 120000,
    });

    // 回答内容が安定するまで待つ
    let answer = "";

    for (let i = 0; i < 30; i++) {
      const currentAnswer = await answers.last().innerText();

      if (currentAnswer.trim() && currentAnswer === answer) {
        break;
      }

      answer = currentAnswer;

      await page.waitForTimeout(1000);
    }

    if (!answer.trim()) {
      throw new Error("ChatGPTから回答を取得できませんでした");
    }

    console.log("ChatGPTの回答を取得しました");

    // ============================================================
    // コードブロックなどを除去
    // ============================================================

    const code = answer
      .replace(/^```[^\n]*\n/, "")
      .replace(/^TypeScript\s*\n/, "")
      .replace(/\n```$/, "")
      .trim();

    // ============================================================
    // TSファイルを保存
    // ============================================================

    const filePath = path.join(
      process.cwd(),
      "data",
      "logs",
      logType,
      `${slug}.ts`,
    );

    await writeFile(filePath, code, "utf-8");

    // ============================================================
    // logs/index.tsを更新
    // ============================================================

    await updateLogsIndex(logType, slug, code);

    return Response.json({
      answer: code,
      filePath,
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        error: "ChatGPTの実行に失敗しました",
      },
      {
        status: 500,
      },
    );
  }
}
