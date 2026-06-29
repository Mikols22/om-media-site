"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const projects = [
  {
    id: "meridian",
    title: "Avalon | Summerhouse Design",
    subheading: "High-end interior and architectural showcase.",
    video: "/videos/177-59th-st-horizontal.mp4",
  },
  {
    id: "apex",
    title: "Warwick Farm Brewing | Bourbon Release",
    subheading: "Dynamic event coverage for an exclusive product launch.",
    video: "/videos/warwick_farm-brewing_bourbon-release.mov",
  },
  {
    id: "noir",
    title: "Asher Architects | Ocean County NJ",
    subheading: "Stunning coastal architecture and luxury design.",
    video: "/videos/26-laurel-ridge-rd-asher-architects.mov",
  },
];

export default function StickyPortfolio() {
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const intersectionRatios = useRef<number[]>(
    new Array(projects.length).fill(0),
  );

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

  const activeProject = projects[activeProjectIndex];

  return (
    <section className="flex bg-black">
      <aside className="sticky top-0 flex h-screen w-[40%] flex-col justify-between border-r border-white/10 bg-zinc-950 p-16 lg:p-24">
        <div className="flex flex-col justify-center">
          <p className="text-sm uppercase tracking-[0.2em] text-neutral-500">
            PORTFOLIO
          </p>

          <h2 className="mt-4 mb-16 text-5xl font-bold tracking-tighter text-white lg:text-6xl xl:text-7xl">
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
      </aside>

      <div className="flex w-[60%] flex-col">
        {projects.map((project, index) => (
          <div
            key={project.id}
            data-index={index}
            ref={(element) => {
              cardRefs.current[index] = element;
            }}
            className="relative min-h-[80vh] w-full overflow-hidden"
          >
            <video
              src={project.video}
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-black/20" />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent px-10 pb-10 pt-24 lg:px-14 lg:pb-14">
              <span className="text-sm font-medium uppercase tracking-[0.25em] text-white/50">
                0{index + 1}
              </span>
              <h3 className="mt-2 text-3xl font-semibold tracking-tight text-white lg:text-4xl">
                {project.title}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
