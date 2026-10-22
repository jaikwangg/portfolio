"use client";

import { useRef, type CSSProperties } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/lib/hooks";
import { Marquee, SplitReveal } from "@/components/motion";

const skills = [
  "Full-stack developer",
  "Next.js",
  "React",
  "TypeScript",
  "Node.js",
  "PostgreSQL",
  "MongoDB",
  "Frontend systems",
  "Product websites",
  "Clean UI, solid UX",
];

const Hero = () => {
  const rootRef = useRef<HTMLElement>(null);

  // Scroll-out: the name sinks and shrinks while its letters lift off at
  // different depths and dissolve from the centre outwards (md+); the backdrop
  // fields drift at their own speeds. Phones keep the simple parallax.
  // Off under reduced motion (gsap.matchMedia reverts when the query flips).
  useIsomorphicLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const mm = gsap.matchMedia();
    mm.add(
      {
        motion: "(prefers-reduced-motion: no-preference)",
        wide: "(min-width: 48rem) and (prefers-reduced-motion: no-preference)",
      },
      (ctx) => {
        if (!ctx.conditions?.motion) return;
        const scrub = { trigger: root, start: "top top", end: "bottom top", scrub: true };
        const mesh = root.querySelector(".hero-mesh");
        ScrollTrigger.create({
          trigger: root,
          start: "top bottom",
          end: "bottom top",
          toggleClass: mesh ? { targets: mesh, className: "is-live" } : undefined,
        });
        gsap.to(".hero-meta", { yPercent: -40, autoAlpha: 0.2, ease: "none", scrollTrigger: scrub });
        gsap.to(".hero-band", { y: -60, ease: "none", scrollTrigger: scrub });
        gsap.to(".hero-depth-1", { yPercent: 35, ease: "none", scrollTrigger: scrub });
        gsap.to(".hero-depth-2", { yPercent: -25, ease: "none", scrollTrigger: scrub });
        gsap.to(".hero-depth-3", { yPercent: 50, ease: "none", scrollTrigger: scrub });

        if (!ctx.conditions?.wide) {
          gsap.to(".hero-name", { yPercent: 18, ease: "none", scrollTrigger: scrub });
          return;
        }
        gsap.to(".hero-name", { yPercent: 22, scale: 0.9, transformOrigin: "50% 100%", ease: "none", scrollTrigger: scrub });
        const masks = gsap.utils.toArray<HTMLElement>(".hero-name .split-mask");
        // Depth per letter: a fixed, irregular pattern (not random, so every load matches).
        const depth = [0.55, 0.2, 0.85, 0.4, 1, 0.3, 0.7, 0.15];
        gsap.to(masks, {
          yPercent: (i: number) => -30 - depth[i % depth.length] * 70,
          autoAlpha: 0,
          ease: "power1.in",
          stagger: { each: 0.06, from: "center" },
          scrollTrigger: { trigger: root, start: "top top", end: "bottom 15%", scrub: 0.4 },
        });
      },
      root,
    );
    return () => mm.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      id="home"
      aria-label="Introduction"
      className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden pt-28 md:pt-32"
    >
      {/* Backdrop: three slow colour fields at different scroll depths + grain. */}
      <div aria-hidden="true" className="hero-mesh">
        <div className="hero-depth hero-depth-1 -right-[18%] -top-[30%] aspect-square w-[85vw] md:w-[62vw]">
          <div
            className="hero-blob"
            style={{ background: "radial-gradient(circle, color-mix(in srgb, var(--color-accent) 17%, transparent) 0%, transparent 66%)", "--dx": "-7%", "--dy": "6%" } as CSSProperties}
          />
        </div>
        <div className="hero-depth hero-depth-2 -left-[30%] top-[10%] aspect-square w-[90vw] md:-left-[18%] md:w-[55vw]">
          <div
            className="hero-blob"
            style={{ background: "radial-gradient(circle, color-mix(in srgb, var(--color-accent-2) 20%, transparent) 0%, transparent 64%)", "--dx": "8%", "--dy": "-5%", "--drift": "28s" } as CSSProperties}
          />
        </div>
        <div className="hero-depth hero-depth-3 -bottom-[45%] left-[20%] aspect-square w-[100vw] md:w-[70vw]">
          <div
            className="hero-blob"
            style={{ background: "radial-gradient(circle, color-mix(in srgb, var(--color-accent) 9%, transparent) 0%, transparent 62%)", "--dx": "5%", "--dy": "-8%", "--drift": "34s" } as CSSProperties}
          />
        </div>
        <div className="hero-grain" />
      </div>

      <div className="relative px-5 md:px-10">
        <div className="hero-meta flex flex-col gap-6 pb-6 md:flex-row md:items-end md:justify-between md:pb-10">
          <p className="max-w-md text-[15px] leading-7 text-mute md:text-lg md:leading-8">
            I&apos;m Jaikwang, a full-stack developer focused on shipping clean interfaces,
            dependable product flows, and user experiences that feel intentional from the first
            click.
          </p>
          <div className="flex items-end justify-between gap-10 md:flex-col md:items-end md:gap-6">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-paper md:text-right md:text-sm">
              Full-stack developer
              <br />
              <span className="text-mute">based in Bangkok</span>
            </p>
            <a
              href="#projects"
              className="group flex items-center gap-3 text-xs font-medium uppercase tracking-[0.22em] text-paper transition-colors hover:text-accent"
            >
              <span>Scroll</span>
              <span aria-hidden="true" className="relative block h-10 w-px overflow-hidden bg-line">
                <span className="scroll-cue-line absolute inset-0 bg-accent" />
              </span>
            </a>
          </div>
        </div>

        <SplitReveal
          as="h1"
          text="Jaikwang"
          split="chars"
          trigger="load"
          stagger={0.05}
          duration={1.1}
          className="hero-name -ml-[0.04em] block whitespace-nowrap font-display text-[clamp(3rem,23.5vw,30rem)] uppercase leading-[0.82] text-paper"
        />
      </div>

      <div className="hero-band relative mt-6 border-y border-line bg-ink-2 py-4 md:mt-10 md:py-5">
        <Marquee speed={60} velocityFactor={0.25} skew={7} itemClassName="gap-0">
          {skills.map((s) => (
            <span key={s} className="flex items-center">
              <span className="px-5 font-display text-2xl uppercase md:px-8 md:text-4xl">{s}</span>
              <span aria-hidden="true" className="text-accent">
                &#10022;
              </span>
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
};

export default Hero;
