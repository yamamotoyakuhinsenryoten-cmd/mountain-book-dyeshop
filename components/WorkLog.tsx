import Image from "next/image";
import type { Log } from "@/data/logs/types";

type Props = { log: Log };

export default function WorkLog({ log }: Props) {
  return (
    <main className="log-page">
      <h1>{log.info.title}</h1>
      <div className="back-link">
        <a href="/logs">← Logs</a>
      </div>
      <section>
        <h2>Info</h2>

        <ul>
          {log.info.details.map((item) => (
            <li key={item.label}>
              {item.label}: {item.value}
            </li>
          ))}
        </ul>
      </section>

      <section className="detail">
        <h2>Media</h2>

        {log.media.map((item, index) => {
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
          }
        })}
      </section>
      <section className="comments">
        <h2>Log</h2>
        <ul>
          {log.log.map((item, index) => (
            <li key={index} className="whitespace-pre-wrap">
              <strong>{item.role === "user" ? "User" : "Assistant"}: </strong>
              {item.text}
            </li>
          ))}
        </ul>
      </section>
      {log.source && <section><h2>Source</h2><a href={log.source}>{log.source}</a></section>}
      <section className="links">
        <h2>Related</h2>
        <ul>
          {log.related.map((item) => (
            <li key={`${item.kind}-${item.title}`}>
              {item.kind === "external" ? <a href={item.url} target="_blank" rel="noopener noreferrer">{item.title}</a> :
                item.kind === "log" ? <a href={`/logs/${item.slug}`}>{item.title}</a> : item.title}
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
