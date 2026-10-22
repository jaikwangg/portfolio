"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "@/lib/gsap";
import { useLenis } from "./SmoothScroll";

export interface MarqueeProps {
  children: ReactNode;
  /** Base speed in px per second. Default 80. */
  speed?: number;
  /** 1 = moves left, -1 = moves right. Default 1. */
  direction?: 1 | -1;
  /** How strongly scroll velocity boosts speed. 0 disables. Default 0.15. */
  velocityFactor?: number;
  /** Flip direction while the user scrolls up. Default true. */
  reverseOnScrollUp?: boolean;
  /** Copies of the content in the track; raise it if one copy is narrow. Default 4. */
  repeat?: number;
  className?: string;
  /** Class for each copy (e.g. gap / padding between repeats). */
  itemClassName?: string;
}

/**
 * Infinite horizontal marquee. Speeds up with Lenis scroll velocity and can
 * reverse on scroll-up. Only the first copy is exposed to assistive tech.
 * Static under reduced motion (CSS hides overflow; nothing moves), paused
 * while offscreen.
 */
export default function Marquee({
  children,
  speed = 80,
  direction = 1,
  velocityFactor = 0.15,
  reverseOnScrollUp = true,
  repeat = 4,
  className,
  itemClassName,
}: MarqueeProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const lenis = useLenis();
  const lenisRef = useRef(lenis);
  useEffect(() => {
    lenisRef.current = lenis;
  }, [lenis]);

  useEffect(() => {
    const root = rootRef.current;
    const track = trackRef.current;
    if (!root || !track) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let x = 0;
    let dir: number = direction;
    let width = (track.firstElementChild as HTMLElement | null)?.offsetWidth ?? 0;
    let visible = true;

    const ro = new ResizeObserver(() => {
      width = (track.firstElementChild as HTMLElement | null)?.offsetWidth ?? 0;
    });
    ro.observe(track);
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    io.observe(root);

    const tick = (_t: number, deltaMs: number) => {
      if (!visible || width === 0) return;
      const v = lenisRef.current?.velocity ?? 0;
      if (reverseOnScrollUp && Math.abs(v) > 0.5) dir = v < 0 ? -direction : direction;
      const boost = 1 + Math.abs(v) * velocityFactor;
      x -= speed * boost * dir * (deltaMs / 1000);
      x = ((x % width) - width) % width; // keep in (-width, 0]
      track.style.transform = `translate3d(${x}px,0,0)`;
    };
    gsap.ticker.add(tick);
    return () => {
      gsap.ticker.remove(tick);
      ro.disconnect();
      io.disconnect();
      track.style.transform = "";
    };
  }, [speed, direction, velocityFactor, reverseOnScrollUp]);

  return (
    <div ref={rootRef} className={["marquee", className].filter(Boolean).join(" ")}>
      <div ref={trackRef} className="marquee-track">
        {Array.from({ length: repeat }, (_, i) => (
          <div key={i} className={["marquee-item", itemClassName].filter(Boolean).join(" ")} aria-hidden={i > 0 || undefined} inert={i > 0 || undefined}>
            {children}
          </div>
        ))}
      </div>
    </div>
  );
}
