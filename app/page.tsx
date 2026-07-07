export default function Home() {
  return (
    <main className="min-h-screen flex flex-col justify-center px-8 bg-white text-neutral-900">
      <div className="max-w-xl space-y-6">
        <h1 className="text-3xl md:text-4xl">山本薬品染料店</h1>

        <p className="text-sm text-neutral-600 leading-relaxed">
          染めと制作の作業場。
          <br />
          完成品ではなく、途中の記録を置いていく場所。
        </p>

        {/* <a
          href="/items"
          className="inline-block border border-neutral-900 px-4 py-2 text-sm hover:bg-neutral-900 hover:text-white transition"
        >
          商品一覧
        </a> */}
        <a
          href="/logs"
          className="inline-block border border-neutral-900 px-4 py-2 text-sm hover:bg-neutral-900 hover:text-white transition"
        >
          ログ一覧
        </a>
      </div>
    </main>
  );
}
