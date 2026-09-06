"use client";

import { motion } from "framer-motion";

import CanvasScroll from "@/components/CanvasScroll";
import AboutStory from "@/components/AboutStory";
import ContactTeaser from "@/components/ContactTeaser";
import CreatorForm from "@/components/CreatorForm";
import PersonalBranding from "@/components/PersonalBranding";
import ServicesIndustries from "@/components/ServicesIndustries";
import StickyPortfolio from "@/components/StickyPortfolio";
import { getAssetUrl } from "@/lib/assets";

const ease = [0.22, 1, 0.36, 1] as const;

export default function Home() {
  return (
    <>
      <section className="relative h-screen w-full overflow-hidden bg-black">
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="/images/hero-poster.jpg"
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source
            src={getAssetUrl(
              "hero.mp4",
              "/videos/144-89th-st-wolstenhome-associates.mp4",
            )}
            type="video/mp4"
          />
        </video>
      </section>

      <section className="bg-black px-6 py-20 text-center lg:py-28">
        <motion.h1
          className="mx-auto max-w-5xl text-5xl font-bold leading-[1.05] tracking-tighter text-white sm:text-6xl md:text-7xl lg:text-8xl"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.8, ease }}
        >
          We don&apos;t just market. We dominate.
        </motion.h1>

        <motion.p
          className="mx-auto mt-6 max-w-2xl text-lg font-light tracking-wide text-white/75 sm:mt-8 sm:text-xl md:text-2xl"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.8, ease, delay: 0.15 }}
        >
          Award-winning video production and digital strategy.
        </motion.p>
      </section>

      {/* Cinematic Apple Scroll Component */}
      <CanvasScroll />

      <StickyPortfolio />

      <ServicesIndustries />

      <PersonalBranding />

      <AboutStory />

      <ContactTeaser />

      <CreatorForm />
    </>
  );
}