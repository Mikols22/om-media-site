"use client";

import Image from "next/image";
import Link from "next/link";
import { type GridItem, categoryHref, industryItems } from "@/content/industries";
import { useIsTouchDevice } from "@/lib/useIsTouchDevice";

function BentoCard({ item }: { item: GridItem }) {
  const isTouchDevice = useIsTouchDevice();

  return (
    <Link
      href={categoryHref(item.slug)}
      className={`group relative flex min-h-[240px] flex-col justify-end overflow-hidden rounded-2xl border border-white/10 bg-neutral-900 p-6 transition-colors duration-300 hover:border-white/20 ${item.className}`}
    >
      <div className="absolute inset-0 z-0">
        <Image
          src={item.imageSrc || "/placeholder.jpg"}
          alt={item.title}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className={`object-cover transition-all duration-700 group-hover:scale-105 group-hover:opacity-100 ${
            isTouchDevice ? "opacity-100" : "opacity-30"
          }`}
        />
        <div
          className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-opacity duration-500 group-hover:opacity-80 ${
            isTouchDevice ? "opacity-80" : ""
          }`}
        />
      </div>

      <div className="relative z-10 mt-auto pointer-events-none">
        <p className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-neutral-400">
          INDUSTRY
        </p>
        <h3 className="text-2xl font-bold tracking-tight text-white">
          {item.title}
        </h3>
      </div>
    </Link>
  );
}

export default function IndustryGrid() {
  return (
    <div className="grid auto-rows-[minmax(12rem,auto)] grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
      {industryItems.map((item) => (
        <BentoCard key={item.id} item={item} />
      ))}
    </div>
  );
}
