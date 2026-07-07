import { logs } from "@/data/logs";

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

  return (
    <main className="log-page">
      <h1>{log.title}</h1>
      <div className="back-link">
        <a href="/logs">← ログ一覧へ戻る</a>
      </div>
      <section>
        <h2>Summary</h2>

        <ul>
          {log.info?.map((item) => (
            <li key={item.label}>
              {item.label}: {item.value}
            </li>
          ))}
        </ul>
      </section>

      <section className="detail">
        <h2>Detail</h2>

        {log.content.map((item: any, index: number) => {
          switch (item.type) {
            case "image":
              return (
                <div className="media" key={item.src}>
                  <img src={item.src} />
                  {item.caption && <p>{item.caption}</p>}
                </div>
              );
            case "video":
              return (
                <div className="media" key={item.src}>
                  <video
                    src={item.src}
                    controls
                    preload="metadata"
                    playsInline
                  />
                  {item.caption && <p>{item.caption}</p>}
                </div>
              );
            case "text":
              return (
                <p className="log-text" key={index}>
                  {item.text}
                </p>
              );
          }
        })}
      </section>
      <section className="comments">
        <h2>Comments</h2>
        <ul>
          {(log as any).comments?.map((item: any) => (
            <li key={item.text} className="comments">
              {item.text}
            </li>
          ))}
        </ul>
      </section>
      <section className="nexts">
        <h2>Next</h2>
        <ul>
          {(log as any).nexts?.map((item: any) => (
            <li key={item.text}>{item.text}</li>
          ))}
        </ul>
      </section>
      <section className="links">
        <h2>Links</h2>
        <ul>
          {(log as any).links?.map((item: any) => (
            <li key={item.name}>
              <a href={item.link} target="_blank" rel="noopener noreferrer">
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      </section>

      <div className="back-link">
        <a href="/logs">← ログ一覧へ戻る</a>
      </div>
    </main>
  );
}
