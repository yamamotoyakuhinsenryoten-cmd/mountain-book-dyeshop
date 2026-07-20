type Props = {
  log: {
    title: string;
    info: { label: string; value: string }[];
    content: { type: string; src?: string; caption?: string; text?: string }[];
    comments?: { text: string }[];
    nexts?: { text: string }[];
    links?: { name: string; link: string }[];
  };
};

import Image from "next/image";

export default function WorkLog({ log }: Props) {
  return (
    <main className="log-page">
      <h1>{log.title}</h1>
      <div className="back-link">
        <a href="/logs">← Logs</a>
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
                  <Image
                    src={item.src}
                    alt={item.caption ?? ""}
                    width={800}
                    height={600}
                    className="w-full h-auto"
                  />
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
            <li key={item.text} className="whitespace-pre-wrap">
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
        <a href="/logs">← Logs</a>
      </div>
    </main>
  );
}
