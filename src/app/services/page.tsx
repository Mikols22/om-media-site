import type { Metadata } from "next";
import Link from "next/link";
import { serviceLines } from "@/content/services";

const title = "Services | OM Media";
const description =
  "OM Media's full range of services — social media management, content creation, branding shoots, podcast production, and video production.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    type: "website",
  },
};

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-black pt-16 lg:pt-20">
      <div className="px-6 py-20 lg:px-12 lg:py-28">
        <p className="text-sm uppercase tracking-[0.2em] text-neutral-500">
          What We Do
        </p>
        <h1 className="mt-4 text-5xl font-bold tracking-tighter text-white sm:text-6xl lg:text-7xl">
          Services
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-neutral-400">
          [PLACEHOLDER: expanded services intro copy — what makes OM
          Media&apos;s approach different across each service line below.]
        </p>
      </div>

      <div className="border-t border-white/10 px-6 py-20 lg:px-12 lg:py-28">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {serviceLines.map((service) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className="group rounded-2xl border border-white/10 bg-zinc-950 p-8 transition-all duration-300 hover:border-white/30"
            >
              <h2 className="text-2xl font-bold text-white">
                {service.name}
              </h2>
              <p className="mt-3 text-neutral-400">{service.tagline}</p>
              <span className="mt-6 inline-block text-sm font-medium uppercase tracking-[0.2em] text-white transition-opacity duration-300 group-hover:opacity-70">
                Learn More →
              </span>
            </Link>
          ))}
        </div>
      </div>

      <div className="border-t border-white/10 px-6 py-20 text-center lg:px-12 lg:py-28">
        <h2 className="text-3xl font-bold tracking-tight text-white lg:text-4xl">
          See Our Work by Industry
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-neutral-400">
          Browse our portfolio across real estate, hospitality, commercial,
          and more.
        </p>
        <Link
          href="/work"
          className="mt-8 inline-block rounded-full border border-white/30 px-8 py-4 text-sm font-medium text-white transition-colors duration-300 hover:border-white"
        >
          View Our Work
        </Link>
      </div>
    </main>
  );
}
