"use client";

import { useMotionValueEvent, useScroll } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const FRAME_COUNT = 96;

// Swap this prefix to match your sequence filenames in public/images/sequence/
// Path format: `/images/sequence/YOUR_FILENAME_HERE${String(i).padStart(2, '0')}.jpg`
const SEQUENCE_FILENAME_PREFIX = "Homepage-Scroll01---wipe";

const getImagePath = (index: number) =>
  `/images/sequence/${SEQUENCE_FILENAME_PREFIX}${String(index).padStart(2, "0")}.jpg`;

export default function CanvasScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const frameRef = useRef(0);
  const drawFrameRef = useRef<(index: number) => void>(() => {});
  const [isReady, setIsReady] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const images: HTMLImageElement[] = [];
    let loadedCount = 0;

    const drawFrame = (index: number) => {
      const image = imagesRef.current[index];
      if (!image?.complete || image.naturalWidth === 0) return;

      const { innerWidth, innerHeight } = window;
      const scale = Math.max(
        innerWidth / image.naturalWidth,
        innerHeight / image.naturalHeight,
      );
      const width = image.naturalWidth * scale;
      const height = image.naturalHeight * scale;
      const x = (innerWidth - width) / 2;
      const y = (innerHeight - height) / 2;

      context.clearRect(0, 0, innerWidth, innerHeight);
      context.drawImage(image, x, y, width, height);
    };

    drawFrameRef.current = drawFrame;

    const resizeCanvas = () => {
      const { innerWidth, innerHeight } = window;
      const dpr = window.devicePixelRatio || 1;

      canvas.width = innerWidth * dpr;
      canvas.height = innerHeight * dpr;
      canvas.style.width = `${innerWidth}px`;
      canvas.style.height = `${innerHeight}px`;

      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      drawFrame(frameRef.current);
    };

    for (let i = 0; i < FRAME_COUNT; i++) {
      const image = new Image();
      image.src = getImagePath(i);
      image.onload = () => {
        loadedCount += 1;
        if (loadedCount === 1) {
          setIsReady(true);
          drawFrame(0);
        }
      };
      image.onerror = () => {
        console.warn(`Failed to load frame: ${getImagePath(i)}`);
      };
      images[i] = image;
    }

    imagesRef.current = images;

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    const frameIndex = Math.min(
      FRAME_COUNT - 1,
      Math.max(0, Math.floor(progress * FRAME_COUNT)),
    );

    if (frameRef.current !== frameIndex) {
      frameRef.current = frameIndex;
      drawFrameRef.current(frameIndex);
    }
  });

  return (
    <div ref={containerRef} className="relative h-[300vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-black">
        <canvas
          ref={canvasRef}
          className={`h-full w-full object-cover ${isReady ? "opacity-100" : "opacity-0"} transition-opacity duration-300`}
        />
      </div>
    </div>
  );
}
