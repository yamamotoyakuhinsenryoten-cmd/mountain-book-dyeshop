import Link from "next/link";
import Image from "next/image";
import { items } from "@/data/items";

export default function LogsPage() {
  return (
    <main className="max-w-5xl mx-auto p-8">
      <h1 className="text-3xl mb-8">Logs</h1>
      <div className="back-link">
        <a href="/">← Top</a>
      </div>
      <div className="grid gap-8">
        {items.map((item) => (
          <Link
            key={item.slug}
            href={`/items/${item.slug}`}
            className="border p-6 rounded-lg hover:shadow"
          >
            <div className="relative w-full h-96 overflow-hidden rounded-md">
              <Image src={item.image} alt={item.title} fill className="object-cover" />
            </div>

            <p className="mt-4 text-sm text-gray-500">{item.date}</p>

            <h2 className="text-xl">{item.title}</h2>

            <p className="mt-2">{item.note}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
