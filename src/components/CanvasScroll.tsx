"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";

export default function CanvasScroll() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [isReady, setIsReady] = useState(false);

  const FRAME_COUNT = 96;

  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    
    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      // Updated to match the web-safe dash
      img.src = `/images/sequence/05homescroll-wipe${String(i).padStart(2, "0")}.jpg`;
      
      img.onload = () => {
        // Trigger the initial draw the split-second the first frame is ready
        if (i === 0) setIsReady(true);
      };
      
      img.onerror = () => {
        console.error("Failed to load frame:", img.src);
      };
      
      loadedImages.push(img);
    }
    
    imagesRef.current = loadedImages;
  }, []);

  // 2. Track the scroll progress of the container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // 3. The drawing engine
  const drawImage = (index: number) => {
    if (!canvasRef.current || imagesRef.current.length === 0) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = imagesRef.current[index];
    if (!img) return;

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
      centerShift_x, centerShift_y, img.width * ratio, img.height * ratio
    );
  };

  // Draw the very first frame as soon as images are done loading
  useEffect(() => {
    if (isReady) drawImage(0);
  }, [isReady]);

  // Update the canvas every time the user scrolls
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (!isReady) return;
    // Map scroll progress (0-1) to frame index (0-95)
    const frameIndex = Math.min(
      FRAME_COUNT - 1,
      Math.floor(latest * FRAME_COUNT)
    );
    drawImage(frameIndex);
  });

  return (
    <div ref={containerRef} className="relative h-[300vh] bg-black">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <canvas ref={canvasRef} className="w-full h-full" />
      </div>
    </div>
  );
}
