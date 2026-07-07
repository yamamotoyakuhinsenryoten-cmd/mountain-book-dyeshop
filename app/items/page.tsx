import Image from "next/image";
import Link from "next/link";
import { items } from "@/data/items";

export default function Items() {
  return (
    <main className="min-h-screen bg-white text-neutral-900 px-8 py-20">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl mb-2">商品一覧</h1>
        <p className="text-sm text-neutral-500 mb-16">
          試作、失敗、途中経過を含みます。
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {items.map((item, index) => (
            <Link
              href={`/items/${item.slug}`}
              key={index}
              className="border border-neutral-200 p-6 space-y-4 hover:-translate-y-1 transition"
            >
              <div className="relative w-full aspect-square overflow-hidden bg-neutral-100">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="space-y-1">
                <p className="text-sm text-neutral-400">{item.date}</p>
                <p className="text-xs text-neutral-400 uppercase tracking-widest">
                  {item.category}
                </p>

                <h2 className="text-xl">{item.title}</h2>
              </div>

              <p className="text-sm text-neutral-600 leading-relaxed">
                {item.note}
              </p>

              <p className="text-sm border-t border-neutral-200 pt-4 text-neutral-500">
                {item.price}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
