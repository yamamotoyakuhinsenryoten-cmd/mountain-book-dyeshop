import Link from "next/link";
import Image from "next/image";
import { logs } from "@/data/logs";

export default function LogsPage() {
  return (
    <main className="max-w-5xl mx-auto p-8">
      <h1 className="text-3xl mb-8">制作ログ</h1>

      <div className="grid gap-8">
        {logs.map((log) => (
          <Link
            key={log.slug}
            href={`/logs/${log.slug}`}
            className="border p-6 rounded-lg hover:shadow"
          >
            {log.thumbnail && (
              <div className="relative w-full h-96 overflow-hidden rounded-md">
                <Image
                  src={log.thumbnail}
                  alt={log.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}

            <p className="mt-4 text-sm text-gray-500">{log.date}</p>

            <h2 className="text-xl">{log.title}</h2>

            <p className="mt-2">{log.summary}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
