import type { Metadata } from "next";
import IndustryGrid from "@/components/IndustryGrid";
import { caseStudies } from "@/content/portfolio";

const title = "Our Work | OM Media";
const description =
  "Browse OM Media's portfolio of video production and photography across real estate, hospitality, commercial, and more.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    type: "website",
  },
};

export default function WorkPage() {
  return (
    <main className="min-h-screen bg-black pt-16 lg:pt-20">
      <div className="px-6 py-20 lg:px-12 lg:py-28">
        <p className="text-sm uppercase tracking-[0.2em] text-neutral-500">
          Portfolio
        </p>
        <h1 className="mt-4 text-5xl font-bold tracking-tighter text-white sm:text-6xl lg:text-7xl">
          Our Best Work
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-neutral-400">
          [PLACEHOLDER: expanded portfolio intro copy — featured case studies
          below, or browse the full archive by industry.]
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 px-6 pb-20 sm:grid-cols-2 lg:px-12 lg:pb-28">
        {caseStudies.map((project) => (
          <div
            key={project.id}
            className="relative aspect-video overflow-hidden rounded-2xl bg-zinc-950"
          >
            <video
              src={project.video}
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6">
              <h2 className="text-xl font-semibold text-white">
                {project.title}
              </h2>
              <p className="mt-1 text-sm text-neutral-300">
                {project.subheading}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-white/10 px-6 py-20 lg:px-12 lg:py-28">
        <h2 className="text-3xl font-bold tracking-tight text-white lg:text-4xl">
          Browse by Industry
        </h2>
        <div className="mt-10">
          <IndustryGrid />
        </div>
      </div>
    </main>
  );
}
