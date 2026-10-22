"use client";

import Lenis from "lenis";
import { createContext, useContext, useEffect, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const LenisContext = createContext<Lenis | null>(null);

/** The active Lenis instance, or null (SSR, reduced motion, before mount). */
export function useLenis(): Lenis | null {
  return useContext(LenisContext);
}

/**
 * Inertial scrolling (Lenis) driven by GSAP's ticker so ScrollTrigger and
 * Lenis stay in the same frame. Off under prefers-reduced-motion (native
 * scrolling), and switches live if the OS setting changes.
 */
export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    let instance: Lenis | null = null;
    const tick = (time: number) => instance?.raf(time * 1000);

    const start = () => {
      if (instance) return;
      instance = new Lenis({
        autoRaf: false,
        lerp: 0.1,
        anchors: true, // same-page <a href="#id"> clicks scroll smoothly
        stopInertiaOnNavigate: true,
      });
      instance.on("scroll", ScrollTrigger.update);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
      setLenis(instance);
    };

    const stop = () => {
      if (!instance) return;
      gsap.ticker.remove(tick);
      gsap.ticker.lagSmoothing(500, 33);
      instance.destroy();
      instance = null;
      setLenis(null);
    };

    if (!mq.matches) start();
    const onChange = () => {
      if (mq.matches) stop();
      else start();
      ScrollTrigger.refresh();
    };
    mq.addEventListener("change", onChange);
    return () => {
      mq.removeEventListener("change", onChange);
      stop();
    };
  }, []);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}
