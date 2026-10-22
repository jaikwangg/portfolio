"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useIsomorphicLayoutEffect, useReducedMotion } from "@/lib/hooks";

const TINTS = ["work", "about", "contact"] as const;
type Tint = (typeof TINTS)[number];

export interface ScrollTintProps {
  /** Section id -> tint layer. Sections not listed show the plain ink. */
  sections: Partial<Record<string, Tint>>;
}

/**
 * A fixed layer behind the page whose colour glow shifts as sections scroll
 * into view (cool palette only: --color-tint-*). Each tint is its own layer,
 * cross-faded by opacity, so nothing repaints while scrolling. Renders nothing
 * under reduced motion (plain ink background). Needs a transparent <body>
 * (globals.css) so the z-index -1 layer shows.
 */
export default function ScrollTint({ sections }: ScrollTintProps) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const key = JSON.stringify(sections);

  useIsomorphicLayoutEffect(() => {
    const root = ref.current;
    if (reduced || !root) return;
    // Rebuilt when the rail layout switches, so a pinned section is measured
    // through its pin spacer (the full pinned scroll distance).
    const mm = gsap.matchMedia();
    mm.add({ gallery: "(min-width: 64rem)", stacked: "(max-width: 63.99rem)" }, () => {
      const layer = (t: Tint) => root.querySelector<HTMLElement>(`.tint-${t}`);
      const active = new Set<string>();
      const show = () => {
        // The last section entered wins when two overlap.
        const id = [...active].pop();
        const want = id ? sections[id] : undefined;
        for (const t of TINTS) {
          const el = layer(t);
          if (el) gsap.to(el, { opacity: t === want ? 1 : 0, duration: 1.1, ease: "power2.inOut", overwrite: true });
        }
      };
      for (const id of Object.keys(sections)) {
        const el = document.getElementById(id);
        if (!el) continue;
        const spacer = el.parentElement?.classList.contains("pin-spacer") ? el.parentElement : null;
        ScrollTrigger.create({
          trigger: spacer ?? el,
          start: "top 55%",
          end: "bottom 45%",
          onToggle: (self) => {
            active.delete(id);
            if (self.isActive) active.add(id);
            show();
          },
        });
      }
      return () => {
        for (const t of TINTS) {
          const el = layer(t);
          if (el) gsap.set(el, { opacity: 0 });
        }
      };
    }, root);
    return () => mm.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced, key]);

  if (reduced) return null;
  return (
    <div ref={ref} aria-hidden="true" className="scroll-tint">
      {TINTS.map((t) => (
        <div key={t} className={`tint-${t}`} />
      ))}
    </div>
  );
}
