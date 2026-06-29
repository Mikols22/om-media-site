"use client";

import AboutStory from "@/components/AboutStory";
import CreatorForm from "@/components/CreatorForm";
import PersonalBranding from "@/components/PersonalBranding";
import Preloader from "@/components/Preloader";
import ServicesIndustries from "@/components/ServicesIndustries";
import StickyPortfolio from "@/components/StickyPortfolio";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const headlineReveal = {
  initial: { opacity: 0, y: 30, filter: "blur(12px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
};

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Preloader isLoading={isLoading} />

      <section className="relative h-screen w-full overflow-hidden bg-black">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src="/videos/144-89th-st-wolstenhome-associates.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-black/60" />

        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
          <motion.h1
            className="max-w-5xl text-5xl font-bold leading-[1.05] tracking-tighter text-white sm:text-6xl md:text-7xl lg:text-8xl"
            {...headlineReveal}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            We don&apos;t just market. We dominate.
          </motion.h1>

          <motion.p
            className="mt-6 max-w-2xl text-lg font-light tracking-wide text-white/75 sm:mt-8 sm:text-xl md:text-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
          >
            Award-winning video production and digital strategy.
          </motion.p>

          <motion.div
            className="pointer-events-none absolute left-1/2 top-1/2 -z-10 -translate-x-1/2 -translate-y-1/2 text-[15rem] font-black leading-none tracking-tighter text-white/5"
            animate={{ y: [-20, 20] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          >
            OM
          </motion.div>
        </div>
      </section>

      <StickyPortfolio />

      <ServicesIndustries />

      <PersonalBranding />

      <AboutStory />

      <CreatorForm />
    </>
  );
}
