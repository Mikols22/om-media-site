"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const ease = [0.22, 1, 0.36, 1] as const;

export default function PersonalBranding() {
  return (
    <section className="flex min-h-[80vh] w-full flex-col border-y border-white/10 bg-zinc-950 md:flex-row">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.9, ease }}
        className="z-10 flex w-full flex-col justify-center p-8 md:w-1/2 md:p-16 lg:p-24"
      >
        <p className="text-sm uppercase tracking-[0.2em] text-neutral-500">
          Personal Branding
        </p>

        <h2 className="mt-4 text-3xl font-bold tracking-tighter text-white sm:text-4xl lg:text-5xl">
          Your story, elevated to icon status.
        </h2>

        <p className="mt-6 text-base leading-relaxed text-neutral-400 lg:text-lg">
          We craft cinematic personal brands for founders, executives, and
          creators who refuse to blend in. From executive portraits to
          thought-leadership films, every frame is designed to position you as
          the authority in your field.
        </p>

        <ul className="mt-8 space-y-3 border-t border-white/10 pt-8">
          {[
            "Executive & founder brand films",
            "LinkedIn & social content systems",
            "Keynote and speaking reel production",
          ].map((item) => (
            <li
              key={item}
              className="flex items-center gap-3 text-sm text-neutral-300 lg:text-base"
            >
              <span className="h-px w-6 shrink-0 bg-white/40" />
              {item}
            </li>
          ))}
        </ul>
      </motion.div>

      <div className="relative min-h-[50vh] w-full md:min-h-full md:w-1/2">
        <Image
          src="/images/summerhouse-design-branding.jpg"
          alt="Executive personal branding portrait"
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="h-full w-full object-cover object-center"
        />
      </div>
    </section>
  );
}
