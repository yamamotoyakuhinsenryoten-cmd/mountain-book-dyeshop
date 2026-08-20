import Image from "next/image";
import type { Log } from "@/data/logs/types";
import ReactMarkdown from "react-markdown";

type Props = { log: Log };

export default function LogDetail({ log }: Props) {
  return (
    <main className="log-page">
      <h1>{log.title}</h1>
      <div className="back-link">
        <a href="/logs">← Logs</a>
      </div>
      {log.type === "work" ||
        (log.type === "experience" && (
          <section>
            <h2>Info</h2>

            <ul>
              {log.details.map((item) => (
                <li key={item.label}>
                  {item.label}: {item.value}
                </li>
              ))}
            </ul>
          </section>
        ))}
      {(log.type === "work" || log.type === "experience") &&
        log.insights.length > 0 && (
          <section>
            <h2>Insight</h2>
            <ul className="list-disc pl-5">
              {log.insights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        )}
      {log.type === "development" && (
        <section className="detail">
          <div className="markdown">
            <ReactMarkdown>{log.markdown}</ReactMarkdown>
          </div>
        </section>
      )}
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
      {log.source && (
        <section>
          <h2>Source</h2>
          <a href={log.source.url} target="_blank" rel="noopener noreferrer">
            {log.source.title}
          </a>
        </section>
      )}
      <section className="links">
        <h2>Related</h2>
        <ul>
          {log.related.map((item) => (
            <li key={`${item.kind}-${item.title}`}>
              {item.kind === "external" ? (
                <a href={item.url} target="_blank" rel="noopener noreferrer">
                  {item.title}
                </a>
              ) : item.kind === "log" ? (
                <a href={`/logs/${item.slug}`}>{item.title}</a>
              ) : (
                item.title
              )}
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
