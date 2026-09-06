"use client";

import { ReactLenis } from "lenis/react";
import { useIsTouchDevice } from "@/lib/useIsTouchDevice";

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const isTouchDevice = useIsTouchDevice();

  if (isTouchDevice) {
    return <>{children}</>;
  }

  // `content` defaults to `document.documentElement`, but the root <html>
  // element has a fixed `height: 100%` (see layout.tsx's `h-full` class),
  // so its box never grows with overflowing content and Lenis's
  // ResizeObserver never fires when the page grows after mount (e.g. an
  // accordion expanding). `document.body` only has `min-height: 100%`, so
  // it actually resizes with its content and Lenis picks up the change.
  return (
    <ReactLenis root options={{ content: document.body }}>
      {children}
    </ReactLenis>
  );
}
