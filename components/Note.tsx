type Props = {
  note: {
    title: string;
    text: string;
  };
};

export default function Devnote({ note }: Props) {
  return (
    <article>
      <h1 className="text-3xl font-bold mb-6">{note.title}</h1>

      <div className="whitespace-pre-wrap leading-relaxed">{note.text}</div>
      <section className="links">
        <h2>Links</h2>
        <ul>
          {(note as any).links?.map((item: any) => (
            <li key={item.name}>
              <a href={item.value} target="_blank" rel="noopener noreferrer">
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      </section>

      <div className="back-link">
        <a href="/notes">← notes</a>
      </div>
    </article>
  );
}
