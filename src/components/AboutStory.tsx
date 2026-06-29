"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

const storyBlocks = [
  {
    text: "We are more than a production company—we are a full-scale creative agency.",
    className: "text-lg text-gray-400 md:text-xl",
  },
  {
    text: "Built on the talents of industry-leading visual storytellers, OM Media operates as a unified force to elevate the brands we partner with.",
    className: "text-lg text-gray-400 md:text-xl",
  },
  {
    text: "Our team's dedication to the craft has landed our work in Dwell and The New York Times, alongside projects for artists like Dierks Bentley and The O'Jays.",
    className: "text-2xl font-medium text-white md:text-3xl",
    featured: true,
  },
  {
    text: "Based out of the Bucks County and Philadelphia area, our roster of creators scales to meet your unique needs, delivering uncompromising visual strategy nationwide.",
    className: "text-lg text-gray-400 md:text-xl",
  },
];

const ease = [0.22, 1, 0.36, 1] as const;

function StoryBlock({
  text,
  className,
  featured = false,
}: {
  text: string;
  className: string;
  featured?: boolean;
}) {
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
    <section ref={sectionRef} className="bg-black">
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
                className={block.className}
                featured={block.featured}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
