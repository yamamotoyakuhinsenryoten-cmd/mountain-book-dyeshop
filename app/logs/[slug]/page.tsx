import { logs } from "@/data/logs";
import LogDetail from "@/components/LogDetail";

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

  return <LogDetail log={log} />;
}
