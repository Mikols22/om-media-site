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

  return <ReactLenis root>{children}</ReactLenis>;
}
