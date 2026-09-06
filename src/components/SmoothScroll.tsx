"use client";

import { ReactLenis } from "lenis/react";
import { useSyncExternalStore } from "react";

function subscribe(callback: () => void) {
  const mediaQuery = window.matchMedia("(pointer: coarse)");
  mediaQuery.addEventListener("change", callback);
  return () => mediaQuery.removeEventListener("change", callback);
}

function getSnapshot() {
  return window.matchMedia("(pointer: coarse)").matches;
}

// Defaults to touch (no Lenis) during SSR so server and hydrated client
// markup match — corrected to the real value immediately after hydration.
function getServerSnapshot() {
  return true;
}

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const isTouchDevice = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

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
