"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

const layers = [
  {
    image: "/images/process-1.jpg",
    eyebrow: "01 — Discovery",
    headline: "We find the story worth telling.",
  },
  {
    image: "/images/process-2.jpg",
    eyebrow: "02 — Production",
    headline: "Cinema-grade craft, every frame.",
  },
  {
    image: "/images/process-3.jpg",
    eyebrow: "03 — Delivery",
    headline: "Built to dominate your market.",
  },
];

export default function ScrollSequence() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const opacity1 = useTransform(scrollYProgress, [0, 0.33], [1, 0]);
  const opacity2 = useTransform(
    scrollYProgress,
    [0.33, 0.4, 0.6, 0.66],
    [0, 1, 1, 0],
  );
  const opacity3 = useTransform(scrollYProgress, [0.66, 0.75], [0, 1]);

  const opacities = [opacity1, opacity2, opacity3];

  return (
    <div ref={containerRef} className="relative h-[400vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-black">
        {layers.map((layer, index) => (
          <motion.div
            key={layer.image}
            style={{ opacity: opacities[index] }}
            className="absolute inset-0"
          >
            <Image
              src={layer.image}
              alt={layer.headline}
              fill
              priority={index === 0}
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
              <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-white/70">
                {layer.eyebrow}
              </p>
              <h2 className="max-w-4xl text-4xl font-bold leading-tight tracking-tighter text-white sm:text-5xl md:text-6xl lg:text-7xl">
                {layer.headline}
              </h2>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
