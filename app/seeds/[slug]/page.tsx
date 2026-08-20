import { seeds } from "@/data/seeds";
import SeedDetail from "./SeedDetail";

export default async function SeedPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const seed = seeds.find((seed: { slug: string }) => seed.slug === slug);

  if (!seed) {
    return <div>Seed not found</div>;
  }

  return <SeedDetail seed={seed} slug={slug} />;
}
