import { logs } from "@/data/logs";
import DevLog from "@/components/DevLog";
import WorkLog from "@/components/WorkLog";

export default async function LogPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const log = logs.find((item) => item.slug === slug);

  if (!log) {
    return <div>Not found</div>;
  }

  if (log.type === "dev") {
    return <DevLog log={log as any} />;
  }

  if (log.type === "work") {
    return <WorkLog log={log as any} />;
  }
}
