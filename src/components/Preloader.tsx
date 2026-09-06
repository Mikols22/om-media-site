"use client";

import { AnimatePresence, motion } from "framer-motion";

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
            <video
              src="/videos/om-media-loading-page.mp4"
              autoPlay
              muted
              playsInline
              className="pointer-events-none w-full max-w-lg object-contain md:max-w-2xl"
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
