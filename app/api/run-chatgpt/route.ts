import { chromium } from "playwright";

export async function POST(request: Request) {
  const { prompt, chatUrl } = await request.json();

  const browser = await chromium.connectOverCDP("http://localhost:9222");

  const context = browser.contexts()[0];
  const page = await context.newPage();

  await page.goto(chatUrl);

  const editable = page.locator('[contenteditable="true"]');

  await editable.click();
  await editable.fill(prompt);
  await editable.press("Enter");

  const stopButton = page.locator('button[aria-label="回答を停止"]');

  await stopButton.waitFor({ state: "visible" });
  await stopButton.waitFor({ state: "hidden" });

  const answers = page.locator('[data-message-author-role="assistant"]');

  const answer = await answers.last().innerText();

  return Response.json({
    answer,
  });
}
