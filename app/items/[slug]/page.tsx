import { items } from "@/data/items";
import Image from "next/image";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const item = items.find((item) => item.slug === slug);

  if (!item) {
    return <p className="p-8">作品が見つかりません。</p>;
  }

  return (
    <main className="min-h-screen bg-white text-neutral-900 px-8 py-20">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="space-y-2">
          <p className="text-sm text-neutral-400">{item.date}</p>

          <p className="text-xs uppercase tracking-widest text-neutral-400">
            {item.category}
          </p>

          <h1 className="text-3xl">{item.title}</h1>
        </div>

        <div className="relative aspect-square overflow-hidden bg-neutral-100">
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover"
          />
        </div>

        <div className="space-y-4 text-neutral-700 leading-relaxed">
          <p>{item.note}</p>

          <p>次回はもう少し染液を濃くして試したい。</p>
        </div>
      </div>
    </main>
  );
}
