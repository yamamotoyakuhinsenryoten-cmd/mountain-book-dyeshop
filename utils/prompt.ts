export async function buildLogPrompt(
  logType: string,
  slug: string,
  chatTitle: string,
  chatUrl: string,
) {
  const promptFile = {
    work: "create-work-log.txt",
    experience: "create-experience-log.txt",
    development: "create-development-log.txt",
  }[logType];

  if (!promptFile) {
    throw new Error("不正なログタイプです");
  }

  const res = await fetch(`/prompts/${promptFile}`);

  if (!res.ok) {
    throw new Error("テンプレートが見つかりません");
  }

  const template = await res.text();

  return template
    .replaceAll("{{logType}}", logType)
    .replaceAll("{{slug}}", slug)
    .replaceAll("{{chatTitle}}", chatTitle)
    .replaceAll("{{chatUrl}}", chatUrl);
}
