import { notes } from "@/data/notes";
import Note from "@/components/Note";

export default async function NotePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const note = notes.find((item) => item.slug === slug);

  if (!note) {
    return <div>Not found</div>;
  }

  return <Note note={note} />;
}
