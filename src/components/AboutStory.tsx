"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { storyBlocks } from "@/content/about";

const ease = [0.22, 1, 0.36, 1] as const;

function StoryBlock({
  text,
  featured = false,
}: {
  text: string;
  featured?: boolean;
}) {
  const className = featured
    ? "text-2xl font-medium text-white md:text-3xl"
    : "text-lg text-gray-400 md:text-xl";

  return (
    <motion.p
      initial={{ opacity: featured ? 0.4 : 0.5 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: false, amount: 0.6, margin: "-35% 0px -35% 0px" }}
      transition={{ duration: 0.8, ease }}
      className={`leading-snug tracking-tight ${className}`}
    >
      {text}
    </motion.p>
  );
}

export default function AboutStory() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="scroll-mt-16 bg-black lg:scroll-mt-20"
    >
      <div className="md:grid md:grid-cols-2">
        <div className="relative h-[50vh] md:sticky md:top-0 md:h-screen">
          <motion.div
            style={{ scale: imageScale }}
            className="relative h-full w-full overflow-hidden"
          >
            <Image
              src="/images/team-photo.jpg"
              alt="OM Media studio environment"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/30" />
          </motion.div>
        </div>

        <div className="flex flex-col justify-center px-6 py-[30vh] md:px-12 lg:px-16">
          <p className="mb-8 text-sm uppercase tracking-[0.2em] text-neutral-500">
            Our Story
          </p>

          <div className="space-y-8">
            {storyBlocks.map((block) => (
              <StoryBlock
                key={block.text}
                text={block.text}
                featured={block.featured}
              />
            ))}
          </div>

          <Link
            href="/about"
            className="mt-10 inline-block text-sm font-medium uppercase tracking-[0.2em] text-white transition-opacity duration-300 hover:opacity-70"
          >
            Read Our Full Story →
          </Link>
        </div>
      </div>
    </section>
  );
}
