"use client";

import { useSyncExternalStore } from "react";

function subscribe(callback: () => void) {
  const mediaQuery = window.matchMedia("(pointer: coarse)");
  mediaQuery.addEventListener("change", callback);
  return () => mediaQuery.removeEventListener("change", callback);
}

function getSnapshot() {
  return window.matchMedia("(pointer: coarse)").matches;
}

// Defaults to touch during SSR so server and hydrated client markup match —
// corrected to the real value immediately after hydration.
function getServerSnapshot() {
  return true;
}

export function useIsTouchDevice() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
