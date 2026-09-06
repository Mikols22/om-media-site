"use client";

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useLenis } from "lenis/react";
import { useIsTouchDevice } from "@/lib/useIsTouchDevice";

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M6 6l12 12M18 6L6 18"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
      />
    </svg>
  );
}

function Lightbox({
  images,
  alt,
  index,
  onIndexChange,
  onClose,
}: {
  images: string[];
  alt: string;
  index: number;
  onIndexChange: (index: number) => void;
  onClose: () => void;
}) {
  const lenis = useLenis();

  // Lock scroll while the lightbox is open. Lenis (desktop) drives scroll
  // itself via its own wheel/RAF loop, so pausing it — not just toggling
  // `overflow` — is what actually stops it; the overflow lock still matters
  // on touch devices, where Lenis isn't mounted at all.
  useEffect(() => {
    lenis?.stop();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      lenis?.start();
      document.body.style.overflow = previousOverflow;
    };
  }, [lenis]);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      } else if (event.key === "ArrowRight") {
        onIndexChange(Math.min(index + 1, images.length - 1));
      } else if (event.key === "ArrowLeft") {
        onIndexChange(Math.max(index - 1, 0));
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [index, images.length, onIndexChange, onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 p-4 sm:p-10"
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full text-white/70 transition-colors duration-200 hover:text-white sm:right-8 sm:top-8"
      >
        <CloseIcon className="h-6 w-6" />
      </button>

      {/* eslint-disable-next-line @next/next/no-img-element -- full-res
          lightbox view of a locally-hosted image, sized to viewport rather
          than a fixed layout box */}
      <img
        src={images[index]}
        alt={`${alt} ${index + 1}`}
        className="max-h-full max-w-full object-contain"
      />
    </motion.div>
  );
}

function DesktopGallery({
  images,
  alt,
  onOpen,
}: {
  images: string[];
  alt: string;
  onOpen: (index: number) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const [extraScroll, setExtraScroll] = useState(0);

  // The strip's natural width isn't known until images have loaded and laid
  // out (they have no reserved intrinsic size), so measure it live and keep
  // the pin's scroll distance in sync — this is also what makes the pin
  // release exactly when the last image passes, rather than an arbitrary
  // fixed vh guess.
  useEffect(() => {
    const strip = stripRef.current;
    if (!strip) return;

    function measure() {
      const stripWidth = strip?.scrollWidth ?? 0;
      setExtraScroll(Math.max(0, stripWidth - window.innerWidth));
    }

    measure();
    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(strip);
    window.addEventListener("resize", measure);
    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [images.length]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], [0, -extraScroll]);
  const smoothX = useSpring(x, { stiffness: 220, damping: 32, mass: 0.5 });

  return (
    <div
      ref={containerRef}
      style={{ height: `calc(100vh + ${extraScroll}px)` }}
      className="relative"
    >
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div ref={stripRef} style={{ x: smoothX }} className="flex gap-4 px-6 lg:gap-6 lg:px-12">
          {images.map((src, index) => (
            <button
              key={src}
              type="button"
              onClick={() => onOpen(index)}
              className="group relative h-[60vh] flex-shrink-0 lg:h-[70vh]"
            >
              {/* eslint-disable-next-line @next/next/no-img-element -- uniform
                  height with natural (unknown ahead of time) width per
                  image; next/image needs fixed dimensions that would either
                  distort or require hardcoding intrinsic sizes per photo */}
              <img
                src={src}
                alt={`${alt} ${index + 1}`}
                className="h-full w-auto object-contain transition-opacity duration-300 group-hover:opacity-80"
              />
            </button>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

function MobileGallery({
  images,
  alt,
  onOpen,
}: {
  images: string[];
  alt: string;
  onOpen: (index: number) => void;
}) {
  return (
    <div className="flex flex-col gap-4 px-6">
      {images.map((src, index) => (
        <button
          key={src}
          type="button"
          onClick={() => onOpen(index)}
          className="relative w-full"
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- natural
              aspect ratio per image in a simple vertical stack */}
          <img src={src} alt={`${alt} ${index + 1}`} className="w-full" />
        </button>
      ))}
    </div>
  );
}

export default function PortfolioGallery({
  images,
  alt,
}: {
  images: string[];
  alt: string;
}) {
  const isTouchDevice = useIsTouchDevice();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <>
      {isTouchDevice ? (
        <MobileGallery images={images} alt={alt} onOpen={setLightboxIndex} />
      ) : (
        <DesktopGallery images={images} alt={alt} onOpen={setLightboxIndex} />
      )}

      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            images={images}
            alt={alt}
            index={lightboxIndex}
            onIndexChange={setLightboxIndex}
            onClose={() => setLightboxIndex(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
