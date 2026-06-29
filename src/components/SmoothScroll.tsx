"use client";

import { ReactLenis } from "@studio-freight/react-lenis";

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReactLenis root>
      {/* @ts-expect-error react-lenis ships React 18 types incompatible with React 19 */}
      {children}
    </ReactLenis>
  );
}
