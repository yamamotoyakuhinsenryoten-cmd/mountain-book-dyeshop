import { logs } from "@/data/logs";

export default function logsPage() {
  return (
    <main className="max-w-3xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">log</h1>
      <div className="back-link">
        <a href="/">← Top</a>
      </div>
      <div className="space-y-3">
        {logs.map((item, index) => (
          <div key={index} className="flex items-center gap-4">
            <span>
              <a href={`/logs/${item.slug}`}>
                <span>{item.date}</span> {item.title}
              </a>
            </span>
            <span className="text-sm text-gray-500">{item.category}</span>
          </div>
        ))}
      </div>
    </main>
  );
}
