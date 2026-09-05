import Link from "next/link";

export default function ServiceHero({
  eyebrow,
  title,
  intro,
  serviceAreas,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  serviceAreas?: readonly string[];
}) {
  return (
    <div className="px-6 py-20 lg:px-12 lg:py-28">
      <p className="text-sm uppercase tracking-[0.2em] text-neutral-500">
        {eyebrow}
      </p>
      <h1 className="mt-4 max-w-4xl text-5xl font-bold tracking-tighter text-white sm:text-6xl lg:text-7xl">
        {title}
      </h1>
      <p className="mt-6 max-w-2xl text-lg text-neutral-400">{intro}</p>

      {serviceAreas && serviceAreas.length > 0 && (
        <p className="mt-4 text-sm uppercase tracking-[0.15em] text-neutral-500">
          Serving {serviceAreas.join(" · ")}
        </p>
      )}

      <Link
        href="/contact"
        className="mt-10 inline-block rounded-full bg-white px-8 py-4 text-sm font-bold uppercase tracking-wide text-black transition-colors duration-300 hover:bg-neutral-200"
      >
        Get In Touch
      </Link>
    </div>
  );
}
