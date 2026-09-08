"use client";

import { useEffect, useRef, useState } from "react";

export default function PhoneFrame({ videos }: { videos: string[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isNearViewport, setIsNearViewport] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  // Same visibility-gated mount pattern as StickyPortfolio's case-study
  // videos: don't start buffering until the frame is close to the
  // viewport, so a phone frame further down the page doesn't cost
  // bandwidth before anyone scrolls to it.
  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsNearViewport(entry.isIntersecting),
      { root: null, rootMargin: "200px 0px 200px 0px", threshold: 0 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const activeVideo = videos[activeIndex];

  return (
    <div ref={containerRef} className="mx-auto w-56 sm:w-64 lg:w-72">
      {/* Bezel — pure CSS, no image assets */}
      <div className="relative aspect-[9/19.5] rounded-[2.75rem] border-[10px] border-zinc-900 bg-zinc-900 shadow-2xl shadow-black/60 sm:border-[12px]">
        {/* Dynamic island */}
        <div className="absolute left-1/2 top-2 z-10 h-5 w-20 -translate-x-1/2 rounded-full bg-black sm:top-2.5 sm:h-6 sm:w-24" />

        {/* Screen — 9:16 video clipped to the frame's rounded corners */}
        <div className="relative h-full w-full overflow-hidden rounded-[2rem] bg-black">
          {isNearViewport && activeVideo ? (
            <video
              key={activeVideo}
              src={activeVideo}
              autoPlay
              muted
              loop
              playsInline
              preload="none"
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="h-full w-full bg-zinc-950" />
          )}
        </div>
      </div>

      {/* Switcher only appears once there's something to switch between —
          adding a second video to the array is all a future call site
          needs to do to get it. */}
      {videos.length > 1 && (
        <div className="mt-4 flex items-center justify-center gap-2">
          {videos.map((video, index) => (
            <button
              key={video}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`Show video ${index + 1}`}
              className={`h-1.5 w-1.5 rounded-full transition-colors duration-300 ${
                index === activeIndex ? "bg-white" : "bg-white/30"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
