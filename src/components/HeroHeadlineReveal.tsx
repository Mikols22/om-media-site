"use client";

import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useRef } from "react";
import { useIsTouchDevice } from "@/lib/useIsTouchDevice";

const HEADLINE = "We don't just market. We dominate.";
const SUBLINE = "Award-winning video production and digital strategy.";
const WORDS = HEADLINE.split(" ");

const ease = [0.22, 1, 0.36, 1] as const;

// Fraction of the pin's scroll progress spent revealing words — the
// remainder is the subline fade-in and a brief settle before release.
const REVEAL_END = 0.75;
// Each word's transition window is 1.5x its even slice of REVEAL_END, so it
// starts before the previous word finishes — continuous, not stepped.
const OVERLAP = 0.5;
// Extra scroll distance (vh) per word — keeps the pin's pace independent of
// word count so editing the copy doesn't throw off the timing.
const VH_PER_WORD = 35;

function getWordRange(index: number, total: number): [number, number] {
  const slice = REVEAL_END / total;
  const start = index * slice;
  const end = Math.min(start + slice * (1 + OVERLAP), REVEAL_END);
  return [start, end];
}

function RevealWord({
  word,
  range,
  progress,
}: {
  word: string;
  range: [number, number];
  progress: MotionValue<number>;
}) {
  const filter = useTransform(progress, range, ["blur(12px)", "blur(0px)"]);
  const opacity = useTransform(progress, range, [0.25, 1]);

  return (
    <motion.span style={{ filter, opacity }} className="inline-block text-white">
      {word}
    </motion.span>
  );
}

function PinnedReveal() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  // Scroll-linked MotionValues fed straight into a `style` prop don't update
  // the DOM here (confirmed: the same value renders live when used as
  // children, but is frozen at its initial value as a style — reproducible
  // with a minimal repro, unclear if it's a framer-motion/React 19/Turbopack
  // interaction). Routing through useSpring first is a proven, reliable
  // workaround; a stiff spring keeps the added lag negligible.
  const progress = useSpring(scrollYProgress, {
    stiffness: 400,
    damping: 45,
    mass: 0.3,
  });

  const sublineOpacity = useTransform(progress, [REVEAL_END, 1], [0, 1]);
  const sublineY = useTransform(progress, [REVEAL_END, 1], [20, 0]);

  const pinHeight = 100 + WORDS.length * VH_PER_WORD;

  return (
    <div
      ref={containerRef}
      style={{ height: `${pinHeight}vh` }}
      className="relative bg-black"
    >
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center px-6 text-center">
        <h1 className="max-w-5xl text-5xl font-bold leading-[1.05] tracking-tighter sm:text-6xl md:text-7xl lg:text-8xl">
          {WORDS.map((word, index) => (
            <span key={`${word}-${index}`}>
              <RevealWord
                word={word}
                range={getWordRange(index, WORDS.length)}
                progress={progress}
              />
              {index < WORDS.length - 1 && " "}
            </span>
          ))}
        </h1>

        <motion.p
          style={{ opacity: sublineOpacity, y: sublineY }}
          className="mt-6 max-w-2xl text-lg font-light tracking-wide text-white/75 sm:mt-8 sm:text-xl md:text-2xl"
        >
          {SUBLINE}
        </motion.p>
      </div>
    </div>
  );
}

// Touch devices skip the pin entirely — a scroll-jacked, blur-scrubbing
// section is the kind of effect that reads as janky on touch scrolling
// (the same reasoning that already keeps Lenis off on touch, see
// SmoothScroll.tsx). Simple staggered fade instead: no pin, no scrubbing.
function StaggeredFade() {
  return (
    <section className="bg-black px-6 py-20 text-center lg:py-28">
      <motion.h1
        className="mx-auto max-w-5xl text-5xl font-bold leading-[1.05] tracking-tighter text-white sm:text-6xl md:text-7xl lg:text-8xl"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.8, ease }}
      >
        {HEADLINE}
      </motion.h1>

      <motion.p
        className="mx-auto mt-6 max-w-2xl text-lg font-light tracking-wide text-white/75 sm:mt-8 sm:text-xl md:text-2xl"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.8, ease, delay: 0.15 }}
      >
        {SUBLINE}
      </motion.p>
    </section>
  );
}

export default function HeroHeadlineReveal() {
  const isTouchDevice = useIsTouchDevice();
  return isTouchDevice ? <StaggeredFade /> : <PinnedReveal />;
}
