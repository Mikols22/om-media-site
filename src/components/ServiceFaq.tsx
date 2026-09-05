"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import type { FaqItem } from "@/lib/faqSchema";

const ease = [0.22, 1, 0.36, 1] as const;

export default function ServiceFaq({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="border-t border-white/10 px-6 py-20 lg:px-12 lg:py-28">
      <h2 className="text-3xl font-bold tracking-tight text-white lg:text-4xl">
        Frequently Asked Questions
      </h2>

      <div className="mt-10 divide-y divide-white/10 border-t border-white/10">
        {items.map((item, index) => {
          const isOpen = openIndex === index;

          return (
            <div key={item.question}>
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : index)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-6 py-6 text-left"
              >
                <span className="text-lg font-medium text-white">
                  {item.question}
                </span>
                <span className="shrink-0 text-2xl text-neutral-500">
                  {isOpen ? "–" : "+"}
                </span>
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3, ease }}
                    className="overflow-hidden"
                  >
                    <p className="pb-6 text-neutral-400">{item.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
