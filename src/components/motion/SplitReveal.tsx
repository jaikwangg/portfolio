"use client";

import { useRef, type CSSProperties, type ElementType } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { prefersReducedMotion, useIsomorphicLayoutEffect } from "@/lib/hooks";

type SplitMode = "lines" | "words" | "chars";

export interface SplitRevealProps {
  /** Plain text to split (no markup). */
  text: string;
  /** Element to render, e.g. "h1", "h2", "p". Default "span". */
  as?: ElementType;
  /** Granularity of the reveal. Default "words". */
  split?: SplitMode;
  /**
   * "scroll" (default): GSAP ScrollTrigger reveal when the element enters.
   * "load": pure CSS animation on first paint, no JS needed (use for hero /
   * LCP text so it never waits for hydration).
   */
  trigger?: "scroll" | "load";
  /** Seconds between tokens (or lines). */
  stagger?: number;
  delay?: number;
  duration?: number;
  /** ScrollTrigger start. Default "top 85%". */
  start?: string;
  /** Reveal once (default) or reverse when scrolled back above. */
  once?: boolean;
  /**
   * Tie the reveal to scroll position instead of playing it: each token rises
   * (and untilts) in step with the scroll, from `start` until the element's
   * top reaches `scrubEnd` (default "top 45%"). Scrolling back reverses it.
   */
  scrub?: boolean;
  scrubEnd?: string;
  className?: string;
}

/**
 * Text split into masked spans that rise into view. The full string is kept
 * in an sr-only span; the split copy is aria-hidden. Splitting happens in
 * render, so SSR HTML already contains the text (no layout shift, no FOUC).
 */
export default function SplitReveal({
  text,
  as: Tag = "span",
  split = "words",
  trigger = "scroll",
  stagger,
  delay = 0,
  duration = 0.9,
  start = "top 85%",
  once = true,
  scrub = false,
  scrubEnd = "top 45%",
  className,
}: SplitRevealProps) {
  const ref = useRef<HTMLElement>(null);
  const step = stagger ?? (split === "chars" ? 0.025 : split === "lines" ? 0.12 : 0.06);

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el || trigger !== "scroll" || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const tokens = Array.from(el.querySelectorAll<HTMLElement>(".split-token"));
      // Group tokens by rendered line (offsetTop of their mask) for "lines".
      const groups: HTMLElement[][] = [];
      if (split === "lines") {
        let lastTop: number | null = null;
        for (const t of tokens) {
          const top = (t.parentElement as HTMLElement).offsetTop;
          if (lastTop === null || Math.abs(top - lastTop) > 2) groups.push([]);
          groups[groups.length - 1].push(t);
          lastTop = top;
        }
      } else {
        tokens.forEach((t) => groups.push([t]));
      }

      if (scrub) {
        gsap.fromTo(
          tokens,
          { yPercent: 115, rotate: 7, transformOrigin: "0% 100%" },
          {
            yPercent: 0,
            rotate: 0,
            ease: "power2.out",
            stagger: { each: 0.08, from: "start" },
            scrollTrigger: { trigger: el, start, end: scrubEnd, scrub: 0.6 },
          },
        );
        return;
      }

      gsap.set(tokens, { yPercent: 110 });
      const tl = gsap.timeline({
        paused: true,
        delay,
        defaults: { duration, ease: "expo.out" },
      });
      groups.forEach((g, i) => tl.to(g, { yPercent: 0 }, i * step));

      ScrollTrigger.create({
        trigger: el,
        start,
        once,
        onEnter: () => tl.play(),
        onLeaveBack: once ? undefined : () => tl.reverse(),
      });
    }, el);
    return () => ctx.revert();
  }, [text, split, trigger, step, delay, duration, start, once, scrub, scrubEnd]);

  let index = 0;
  const token = (content: string, key: string) => (
    <span key={key} className="split-mask">
      <span className="split-token" style={{ "--i": index++ } as CSSProperties}>
        {content}
      </span>
    </span>
  );

  const words = text.split(/\s+/).filter(Boolean);
  const children = words.map((word, w) => {
    const sep = w < words.length - 1 ? " " : null;
    if (split === "chars") {
      return (
        <span key={w}>
          <span className="split-word">
            {Array.from(word).map((c, ci) => token(c, `${w}-${ci}`))}
          </span>
          {sep}
        </span>
      );
    }
    return (
      <span key={w}>
        {token(word, String(w))}
        {sep}
      </span>
    );
  });

  const style =
    trigger === "load"
      ? ({ "--split-delay": `${delay}s`, "--split-stagger": `${step}s`, "--split-duration": `${duration}s` } as CSSProperties)
      : undefined;

  return (
    <Tag
      ref={ref}
      className={["split-reveal", trigger === "load" ? "split-load" : "", className].filter(Boolean).join(" ")}
      style={style}
    >
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">{children}</span>
    </Tag>
  );
}
