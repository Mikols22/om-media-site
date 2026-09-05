"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { caseStudies as projects } from "@/content/portfolio";

function PosterPlaceholder({ title }: { title: string }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 border border-dashed border-white/10 bg-gradient-to-br from-zinc-900 via-zinc-950 to-black px-6 text-center">
      <span className="text-xs uppercase tracking-[0.3em] text-neutral-600">
        Poster Placeholder
      </span>
      <span className="text-sm text-neutral-700">{title}</span>
    </div>
  );
}

export default function StickyPortfolio() {
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState<boolean[]>(
    new Array(projects.length).fill(false),
  );
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const intersectionRatios = useRef<number[]>(
    new Array(projects.length).fill(0),
  );

  // Drives the caption/dots in the sticky aside — narrow band around the
  // vertical center so only the most-centered card "wins".
  useEffect(() => {
    const cards = cardRefs.current.filter(
      (card): card is HTMLDivElement => card !== null,
    );
    if (cards.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.getAttribute("data-index"));
          if (!Number.isNaN(index)) {
            intersectionRatios.current[index] = entry.intersectionRatio;
          }
        });

        const bestIndex = intersectionRatios.current.reduce(
          (best, ratio, index) =>
            ratio > intersectionRatios.current[best] ? index : best,
          0,
        );

        if (intersectionRatios.current[bestIndex] > 0) {
          setActiveProjectIndex(bestIndex);
        }
      },
      {
        root: null,
        rootMargin: "-45% 0px -45% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    );

    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  // Drives video mount/unmount — a generous margin so a card's video starts
  // buffering shortly before it's on-screen, and is dropped (pausing
  // playback and releasing the resource) once it's scrolled well past.
  // Deliberately separate from the observer above: that one narrows to a
  // single "most centered" card, which would pause a still-visible
  // neighbor's video prematurely if reused here.
  useEffect(() => {
    const cards = cardRefs.current.filter(
      (card): card is HTMLDivElement => card !== null,
    );
    if (cards.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        setVisibleCards((current) => {
          const next = [...current];
          entries.forEach((entry) => {
            const index = Number(entry.target.getAttribute("data-index"));
            if (!Number.isNaN(index)) {
              next[index] = entry.isIntersecting;
            }
          });
          return next;
        });
      },
      {
        root: null,
        rootMargin: "200px 0px 200px 0px",
        threshold: 0,
      },
    );

    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  const activeProject = projects[activeProjectIndex];

  return (
    <section
      id="work"
      className="flex scroll-mt-16 flex-col bg-black md:flex-row lg:scroll-mt-20"
    >
      <aside className="flex w-full flex-col border-b border-white/10 bg-zinc-950 px-6 py-16 md:sticky md:top-0 md:h-screen md:w-[40%] md:justify-between md:border-b-0 md:border-r md:p-16 lg:p-24">
        <div className="flex flex-col justify-center">
          <p className="text-sm uppercase tracking-[0.2em] text-neutral-500">
            PORTFOLIO
          </p>

          <h2 className="mt-4 mb-10 text-4xl font-bold tracking-tighter text-white sm:text-5xl md:mb-16 lg:text-6xl xl:text-7xl">
            Our Best Work
          </h2>

          <div className="min-h-[7rem] lg:min-h-[8rem]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProject.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="text-sm font-medium uppercase tracking-[0.2em] text-white">
                  {activeProject.title}
                </p>
                <p className="mt-4 max-w-sm text-lg font-light leading-relaxed text-neutral-400 lg:text-xl">
                  {activeProject.subheading}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="mt-10 md:mt-0">
          <div className="flex items-center gap-3">
            {projects.map((project, index) => (
              <div
                key={project.id}
                className={`h-px transition-all duration-500 ease-out ${
                  index === activeProjectIndex
                    ? "w-12 bg-white"
                    : "w-6 bg-neutral-800"
                }`}
              />
            ))}
          </div>

          <Link
            href="/work"
            className="mt-8 inline-block text-sm font-medium uppercase tracking-[0.2em] text-white transition-opacity duration-300 hover:opacity-70"
          >
            View All Work →
          </Link>
        </div>
      </aside>

      <div className="flex w-full flex-col md:w-[60%]">
        {projects.map((project, index) => (
          <div
            key={project.id}
            data-index={index}
            ref={(element) => {
              cardRefs.current[index] = element;
            }}
            className="relative min-h-[80vh] w-full overflow-hidden bg-zinc-950"
          >
            {visibleCards[index] ? (
              <video
                src={project.video}
                autoPlay
                muted
                loop
                playsInline
                preload="none"
                className="absolute inset-0 h-full w-full object-cover"
              />
            ) : project.poster ? (
              <Image
                src={project.poster}
                alt={project.title}
                fill
                sizes="(max-width: 768px) 100vw, 60vw"
                className="object-cover"
              />
            ) : (
              <PosterPlaceholder title={project.title} />
            )}
            <div className="absolute inset-0 bg-black/20" />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent px-6 pb-8 pt-20 md:px-10 md:pb-10 md:pt-24 lg:px-14 lg:pb-14">
              <span className="text-sm font-medium uppercase tracking-[0.25em] text-white/50">
                0{index + 1}
              </span>
              <h3 className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl lg:text-4xl">
                {project.title}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
