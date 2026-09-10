import Image from "next/image";
import type { Log } from "@/data/logs/types";
import { getMediaUrl } from "@/lib/media";

type Props = { log: Log };

export default function LogDetail({ log }: Props) {
  return (
    <main className="log-page">
      <h1>{log.title}</h1>

      <div className="back-link">
        <a href="/logs">← Logs</a>
      </div>

      {(log.type === "work" || log.type === "experience") && (
        <section>
          <h2>Info / 基本情報</h2>

          <ul>
            {log.details.map((item) => (
              <li key={item.label}>
                {item.label}: {item.value}
              </li>
            ))}
          </ul>
        </section>
      )}

      {(log.type === "work" || log.type === "experience") &&
        log.insights.length > 0 && (
          <section>
            <h2>Insight / 考察</h2>

            <ul className="list-disc pl-5">
              {log.insights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        )}

      {log.type === "development" && (
        <>
          <section>
            <h2>Purpose / 目的</h2>
            <p className="whitespace-pre-line">{log.purpose}</p>
          </section>

          <section>
            <h2>Policy / 方針</h2>
            <p className="whitespace-pre-line">{log.policy}</p>
          </section>

          <section>
            <h2>Steps / 進め方</h2>

            <ol className="list-decimal pl-5">
              {log.steps.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ol>
          </section>

          <section>
            <h2>Execution / 実行</h2>
            {log.execution.map((item, index) => (
              <article key={item.title}>
                <h3>
                  {index + 1}. {item.title}
                </h3>

                <p className="execution-body">{item.body}</p>
              </article>
            ))}
          </section>

          <section>
            <h2>Result / 結果</h2>
            <p className="whitespace-pre-line">{log.result}</p>
          </section>

          <section>
            <h2>Next / 次</h2>

            <ul className="list-disc pl-5">
              {log.next.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        </>
      )}

      <section className="detail">
        <h2>Media / 画像</h2>

        {log.media.map((item) => {
          switch (item.type) {
            case "image":
              return (
                <div className="media" key={item.src}>
                  <Image
                    src={getMediaUrl(item.src)}
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
                    src={getMediaUrl(item.src)}
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
          <h2>Source / 情報源</h2>

          <a href={log.source.url} target="_blank" rel="noopener noreferrer">
            {log.source.title}
          </a>
        </section>
      )}

      <section className="links">
        <h2>Related / 関連ページ</h2>

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
