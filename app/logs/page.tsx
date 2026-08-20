import { logs } from "@/data/logs";
import type { Log } from "@/data/logs/types";

function groupByCategory(logs: Log[]) {
  return Object.values(Object.groupBy(logs, (log) => log.category)).map(
    (group) =>
      [...(group ?? [])].sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      ),
  );
}

export default function LogsPage() {
  const workLogs = groupByCategory(logs.filter((log) => log.type === "work"));

  const experienceLogs = groupByCategory(
    logs.filter((log) => log.type === "experience"),
  );

  const developmentLogs = groupByCategory(
    logs.filter((log) => log.type === "development"),
  );

  return (
    <main className="max-w-3xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">log</h1>

      <div className="back-link">
        <a href="/">← Top</a>
      </div>

      <section className="mt-8">
        <h2 className="text-xl font-bold mb-4">Work</h2>

        <div className="space-y-3">
          {workLogs.map((group, index) => (
            <div key={index} className="space-y-1">
              {group.map((item) => (
                <div key={item.slug} className="flex items-center gap-4">
                  <a href={`/logs/${item.slug}`}>
                    <span>{item.createdAt}</span> {item.title}
                  </a>

                  <span className="text-sm text-gray-500">{item.category}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-bold mb-4">Experience</h2>

        <div className="space-y-3">
          {experienceLogs.map((group, index) => (
            <div key={index} className="space-y-1">
              {group.map((item) => (
                <div key={item.slug} className="flex items-center gap-4">
                  <a href={`/logs/${item.slug}`}>
                    <span>{item.createdAt}</span> {item.title}
                  </a>

                  <span className="text-sm text-gray-500">{item.category}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-bold mb-4">Development</h2>

        <div className="space-y-8">
          {developmentLogs.map((group, index) => (
            <div key={index} className="space-y-1">
              {group.map((item) => (
                <div key={item.slug} className="flex items-center gap-4">
                  <a href={`/logs/${item.slug}`}>
                    <span>{item.createdAt}</span> {item.title}
                  </a>

                  <span className="text-sm text-gray-500">{item.category}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
