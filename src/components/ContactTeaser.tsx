"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const ease = [0.22, 1, 0.36, 1] as const;

export default function ContactTeaser() {
  return (
    <section
      id="contact"
      className="scroll-mt-20 border-y border-white/10 bg-zinc-950 lg:scroll-mt-[100px]"
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.9, ease }}
        className="mx-auto flex max-w-4xl flex-col items-center px-6 py-24 text-center lg:py-32"
      >
        <p className="text-sm uppercase tracking-[0.2em] text-neutral-500">
          Get In Touch
        </p>
        <h2 className="mt-4 text-4xl font-bold tracking-tighter text-white lg:text-6xl">
          Have a project in mind?
        </h2>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-neutral-400 lg:text-lg">
          Tell us what you&apos;re working on and we&apos;ll follow up with next
          steps — no project too big or too small.
        </p>

        <Link
          href="/contact"
          className="mt-10 rounded-full bg-white px-8 py-4 text-sm font-bold uppercase tracking-wide text-black transition-colors duration-300 hover:bg-neutral-200"
        >
          Get In Touch
        </Link>
      </motion.div>
    </section>
  );
}
