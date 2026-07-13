import { backlogs } from "@/data/backlogs";
import Link from "next/link";

export default function BacklogsPage() {
  return (
    <main className="max-w-3xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Backlog</h1>
      <div className="back-link">
        <a href="/">← Top</a>
      </div>
      <div className="space-y-3">
        {backlogs.map((item, index) => (
          <div key={index} className="flex items-center gap-4">
            <span>{item.done ? "✓" : "□"}</span>

            <span className={item.done ? "line-through text-gray-400" : ""}>
              {item.title}
            </span>

            <span className="text-sm text-gray-500">{item.category}</span>
            {item.link && <Link href={item.link.value}>→{item.link.name}</Link>}
          </div>
        ))}
      </div>
      <div className="back-link">
        <a href="/">← Top</a>
      </div>
    </main>
  );
}
