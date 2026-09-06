"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { LOGO_URL } from "@/lib/assets";

// Not tied to real asset loading: the hero/case-study videos this site
// preloads are 170MB-770MB (see CLAUDE.md's Assets section), so gating on
// their actual load progress would make the preloader run far longer than
// this brief brand moment is meant to last. A short fixed duration, with the
// bar animating smoothly across it, is the honest tradeoff.
export const PRELOADER_DURATION_MS = 2000;

export default function Preloader({ isLoading }: { isLoading: boolean }) {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center gap-8 bg-black text-white"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <Image
              src={LOGO_URL}
              alt="OM Media"
              width={128}
              height={128}
              priority
              className="h-20 w-20 sm:h-24 sm:w-24"
            />
          </motion.div>

          <div className="h-px w-48 overflow-hidden bg-white/15 sm:w-56">
            <motion.div
              className="h-full bg-white"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{
                duration: PRELOADER_DURATION_MS / 1000,
                ease: "linear",
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
