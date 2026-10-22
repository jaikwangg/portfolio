"use client";

import { createContext, useCallback, useContext, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/hooks";
import { useLenis } from "./SmoothScroll";

type Phase = "idle" | "covering" | "covered";
const RevealContext = createContext<() => void>(() => {});

const strip = (p: string) => (p.length > 1 ? p.replace(/\/+$/, "") : p);

/**
 * Curtain wipe between routes, App Router compatible.
 *
 * A capture-phase click listener catches internal link clicks, slides the
 * curtain up to cover the page, then re-fires the click so next/link performs
 * the real navigation (prefetch, basePath all intact). app/template.tsx
 * remounts on every navigation and calls reveal(), which wipes the curtain
 * away. Skipped for: modifier/middle clicks, target/download links, external
 * or hash-only links, same-page links, [data-no-transition], reduced motion.
 * First load never shows the curtain (keeps LCP clean).
 */
export default function PageTransition({ children }: { children: React.ReactNode }) {
  const curtainRef = useRef<HTMLDivElement>(null);
  const phase = useRef<Phase>("idle");
  const bypass = useRef(false);
  const failsafe = useRef<number | undefined>(undefined);
  const lenis = useLenis();
  const pathname = usePathname();

  const reveal = useCallback(() => {
    const curtain = curtainRef.current;
    window.clearTimeout(failsafe.current);
    ScrollTrigger.refresh();
    if (!curtain || phase.current === "idle") return;
    const run = () => {
      phase.current = "idle";
      gsap.to(curtain, {
        yPercent: -100,
        duration: 0.7,
        ease: "expo.inOut",
        onComplete: () => {
          gsap.set(curtain, { yPercent: 100, visibility: "hidden" });
        },
      });
    };
    // If the cover animation is still running, reveal once it finishes.
    if (phase.current === "covering") gsap.delayedCall(0.1, () => (phase.current === "covered" ? run() : reveal()));
    else run();
  }, []);

  useEffect(() => {
    lenis?.resize();
  }, [pathname, lenis]);

  useEffect(() => {
    const curtain = curtainRef.current;
    if (!curtain) return;
    gsap.set(curtain, { yPercent: 100, visibility: "hidden" });

    const onClick = (e: MouseEvent) => {
      if (bypass.current) {
        bypass.current = false;
        return;
      }
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!a || a.target || a.hasAttribute("download") || a.closest("[data-no-transition]")) return;
      if (prefersReducedMotion()) return;
      const url = new URL(a.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      if (strip(url.pathname) === strip(window.location.pathname)) return; // same page / hash
      if (phase.current !== "idle") {
        e.preventDefault();
        return;
      }

      e.preventDefault();
      e.stopPropagation();
      phase.current = "covering";
      gsap.set(curtain, { visibility: "visible", yPercent: 100 });
      gsap.to(curtain, {
        yPercent: 0,
        duration: 0.6,
        ease: "expo.inOut",
        onComplete: () => {
          phase.current = "covered";
          if (a.isConnected) {
            bypass.current = true;
            a.click();
          } else {
            window.location.assign(url.href);
          }
          // Never leave the page covered if the new route fails to mount.
          failsafe.current = window.setTimeout(reveal, 2500);
        },
      });
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [reveal]);

  return (
    <RevealContext.Provider value={reveal}>
      {children}
      <div ref={curtainRef} aria-hidden="true" className="page-curtain">
        <span className="page-curtain-mark">JK</span>
      </div>
    </RevealContext.Provider>
  );
}

/** Call from app/template.tsx (runs on every route mount). */
export function usePageReveal() {
  const reveal = useContext(RevealContext);
  useEffect(() => {
    const id = requestAnimationFrame(() => reveal());
    return () => cancelAnimationFrame(id);
  }, [reveal]);
}
