const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.connectOverCDP("http://localhost:9222");

  const context = browser.contexts()[0];
  const page = await context.newPage();

  const chatUrl = "https://chatgpt.com/c/6a8b05af-2950-83ee-b4c9-7ee59965591b";

  await page.goto(chatUrl);

  console.log("URL:", page.url());
  console.log("TITLE:", await page.title());

  // ChatGPTの入力欄
  const editable = page.locator('[contenteditable="true"]');

  await editable.click();

  const prompt = "Playwrightからのテストです";
  await editable.fill(prompt);

  console.log("プロンプト入力完了");

  // 送信
  await editable.press("Enter");

  console.log("送信完了");

  // 回答生成中は「回答を停止」ボタンが表示される
  const stopButton = page.locator('button[aria-label="回答を停止"]');

  await stopButton.waitFor({ state: "visible" });

  console.log("回答生成中");

  // ボタンが消えたら回答生成完了
  await stopButton.waitFor({ state: "hidden" });

  console.log("回答生成完了");

  // 最後のassistantメッセージを取得
  const answers = page.locator('[data-message-author-role="assistant"]');

  const answer = await answers.last().innerText();

  console.log("\n--- ChatGPTの回答 ---\n");
  console.log(answer);

  console.log("\n--- 完了 ---");

  // ブラウザを閉じずに残す
  await new Promise(() => {});
})();
