type Props = {
  log: {
    title: string;
    text: string;
  };
};

export default function DevLog({ log }: Props) {
  return (
    <article>
      <h1 className="text-3xl font-bold mb-6">{log.title}</h1>

      <div className="whitespace-pre-wrap leading-relaxed">{log.text}</div>
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
    </article>
  );
}
