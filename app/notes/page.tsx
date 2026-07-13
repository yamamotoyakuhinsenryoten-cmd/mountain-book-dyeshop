import { notes } from "@/data/notes";

export default function NotesPage() {
  return (
    <main className="max-w-3xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Note</h1>
      <div className="back-link">
        <a href="/">← Top</a>
      </div>
      <div className="space-y-3">
        {notes.map((item, index) => (
          <div key={index} className="flex items-center gap-4">
            <span>
              <a href={`/notes/${item.slug}`}>{item.title}</a>
            </span>
            <span className="text-sm text-gray-500">{item.category}</span>
          </div>
        ))}
      </div>
    </main>
  );
}
