"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";
import { useIsTouchDevice } from "@/lib/useIsTouchDevice";

const FRAME_COUNT = 96;

function frameSrc(index: number) {
  return `/images/sequence/05homescroll-wipe${String(index).padStart(2, "0")}.jpg`;
}

// Start preloading once the section is within one viewport height of
// entering the screen, so frames are ready by the time it pins — but nothing
// is fetched for visitors who never scroll that far.
const PRELOAD_ROOT_MARGIN = "100% 0px";

export default function CanvasScroll() {
  const isTouchDevice = useIsTouchDevice();

  // Touch devices get a single static frame instead of the 96-frame
  // scroll-scrubbed sequence (no Lenis on touch, scrubbing is janky, and it's
  // ~30MB of images). useIsTouchDevice defaults to `true` during SSR, so the
  // static version is also what's server-rendered; desktop swaps to the
  // canvas right after hydration, before any frames have been requested.
  if (isTouchDevice) return <StaticFallback />;
  return <CanvasSequence />;
}

const noopSubscribe = () => () => {};

function StaticFallback() {
  // The server render (and hydration pass) always lands here, since
  // useIsTouchDevice reports touch until hydrated. Hold off on the <img>
  // until after hydration so desktop visitors — who switch to the canvas in
  // that same post-hydration render — never request it.
  const isHydrated = useSyncExternalStore(noopSubscribe, () => true, () => false);

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black">
      {isHydrated && (
        // eslint-disable-next-line @next/next/no-img-element -- full-bleed static stand-in for the canvas sequence; same file the sequence ends on, so it's already a sized/compressed asset
        <img
          src={frameSrc(FRAME_COUNT - 1)}
          alt="Aerial view of a modern waterfront home at twilight"
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover"
        />
      )}
    </div>
  );
}

function CanvasSequence() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [isReady, setIsReady] = useState(false);

  // 1. Wait until the section nears the viewport before requesting anything.
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: PRELOAD_ROOT_MARGIN },
    );
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  // 2. Preload every frame once triggered.
  useEffect(() => {
    if (!shouldLoad) return;

    const loadedImages: HTMLImageElement[] = [];
    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.src = frameSrc(i);
      img.onload = () => {
        // Allow drawing as soon as the first frame is in.
        if (i === 0) setIsReady(true);
      };
      img.onerror = () => {
        console.error("Failed to load frame:", img.src);
      };
      loadedImages.push(img);
    }
    imagesRef.current = loadedImages;

    return () => {
      for (const img of loadedImages) {
        img.onload = null;
        img.onerror = null;
      }
    };
  }, [shouldLoad]);

  // 3. Track the scroll progress of the container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  function frameIndexFor(progress: number) {
    return Math.min(FRAME_COUNT - 1, Math.max(0, Math.floor(progress * FRAME_COUNT)));
  }

  // 4. The drawing engine
  function drawImage(index: number) {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = imagesRef.current[index];
    // Skip frames that haven't finished loading yet (zero dimensions would
    // produce an Infinity scale) — the previous frame simply stays up.
    if (!img || !img.complete || img.naturalWidth === 0) return;

    // Match canvas to screen size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Object-cover logic (fills screen without stretching)
    const hRatio = canvas.width / img.width;
    const vRatio = canvas.height / img.height;
    const ratio = Math.max(hRatio, vRatio);
    const centerShift_x = (canvas.width - img.width * ratio) / 2;
    const centerShift_y = (canvas.height - img.height * ratio) / 2;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(
      img,
      0, 0, img.width, img.height,
      centerShift_x, centerShift_y, img.width * ratio, img.height * ratio,
    );
  }

  // Initial draw once the first frame is in. Uses the current scroll
  // position rather than always frame 0, since loading can now start late,
  // falling back to frame 0 if that frame isn't loaded yet.
  useEffect(() => {
    if (!isReady) return;
    drawImage(0);
    drawImage(frameIndexFor(scrollYProgress.get()));
    // eslint-disable-next-line react-hooks/exhaustive-deps -- run once on ready
  }, [isReady]);

  // Update the canvas every time the user scrolls
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (!isReady) return;
    drawImage(frameIndexFor(latest));
  });

  return (
    <div ref={containerRef} className="relative h-[300vh] bg-black">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <canvas ref={canvasRef} className="w-full h-full" />
      </div>
    </div>
  );
}
