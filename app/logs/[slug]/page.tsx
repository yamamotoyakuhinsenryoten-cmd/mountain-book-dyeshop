import { logs } from "@/data/logs";
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

  return <WorkLog log={log} />;
}
