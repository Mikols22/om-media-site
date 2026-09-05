import Link from "next/link";

export default function ServiceCTA({
  title,
  description,
  note,
}: {
  title: string;
  description?: string;
  note?: string;
}) {
  return (
    <div className="border-t border-white/10 px-6 py-20 text-center lg:px-12 lg:py-28">
      <h2 className="text-3xl font-bold tracking-tight text-white lg:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mx-auto mt-4 max-w-xl text-neutral-400">{description}</p>
      )}
      <Link
        href="/contact"
        className="mt-8 inline-block rounded-full bg-white px-8 py-4 text-sm font-bold uppercase tracking-wide text-black transition-colors duration-300 hover:bg-neutral-200"
      >
        Get In Touch
      </Link>
      {note && <p className="mt-6 text-sm text-neutral-500">{note}</p>}
    </div>
  );
}
