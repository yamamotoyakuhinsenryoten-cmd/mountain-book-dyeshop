import { chromium } from "playwright";
import { writeFile } from "fs/promises";
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

export async function POST(request: Request) {
  try {
    const { prompt, chatUrl, logType, slug } = await request.json();

    // Chromeが起動していなければ起動
    if (!(await isChromeRunning())) {
      console.log("専用Chromeを起動します");
      startChrome();
      await waitForChrome();
    }

    // Chromeへ接続
    const browser = await chromium.connectOverCDP(CDP_URL);

    const context = browser.contexts()[0];
    const page = await context.newPage();

    await page.goto(chatUrl);

    const editable = page.locator('[contenteditable="true"]');

    await editable.click();
    await editable.fill(prompt);
    await editable.press("Enter");

    const stopButton = page.locator('button[aria-label="回答を停止"]');

    await stopButton.waitFor({
      state: "visible",
    });

    await stopButton.waitFor({
      state: "hidden",
    });

    const answers = page.locator('[data-message-author-role="assistant"]');

    const answer = await answers.last().innerText();

    // コードブロックなどを除去
    const code = answer
      .replace(/^```[^\n]*\n/, "")
      .replace(/^TypeScript\s*\n/, "")
      .replace(/\n```$/, "")
      .trim();

    // TSファイルを保存
    const filePath = path.join(
      process.cwd(),
      "data",
      "logs",
      logType,
      `${slug}.ts`,
    );

    await writeFile(filePath, code, "utf-8");

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
