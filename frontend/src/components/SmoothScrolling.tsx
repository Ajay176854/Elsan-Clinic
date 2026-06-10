"use client";

import { ReactLenis } from 'lenis/react';

export default function SmoothScrolling({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis root options={{ lerp: 0.15, duration: 1.2, smoothWheel: true, wheelMultiplier: 1.5, touchMultiplier: 2 }}>
      {children}
    </ReactLenis>
  );
}
