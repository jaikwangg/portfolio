"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { gsap } from "@/lib/gsap";
import { prefersReducedMotion, useIsomorphicLayoutEffect } from "@/lib/hooks";

export interface RevealOnScrollProps {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /** Start offset in px (positive = from below). Default 48. */
  y?: number;
  /** Fade in as well as move. Default true. */
  fade?: boolean;
  /** If set, animates the direct children one after another (seconds apart). */
  stagger?: number;
  delay?: number;
  duration?: number;
  /** ScrollTrigger start. Default "top 85%". */
  start?: string;
  once?: boolean;
}

/** Fades/slides its content (or its children, staggered) in on scroll. */
export default function RevealOnScroll({
  children,
  as: Tag = "div",
  className,
  y = 48,
  fade = true,
  stagger,
  delay = 0,
  duration = 1,
  start = "top 85%",
  once = true,
}: RevealOnScrollProps) {
  const ref = useRef<HTMLElement>(null);

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      const targets = stagger !== undefined ? Array.from(el.children) : el;
      gsap.from(targets, {
        y,
        autoAlpha: fade ? 0 : 1,
        duration,
        delay,
        stagger: stagger ?? 0,
        ease: "expo.out",
        scrollTrigger: {
          trigger: el,
          start,
          toggleActions: once ? "play none none none" : "play none none reverse",
        },
      });
    }, el);
    return () => ctx.revert();
  }, [y, fade, stagger, delay, duration, start, once]);

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
