"use client";

import { useRef } from "react";
import { gsap } from "@/lib/gsap";
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

  // Gentle parallax as the hero scrolls away. Off under reduced motion
  // (gsap.matchMedia reverts everything when the query stops matching).
  useIsomorphicLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const scrub = { trigger: root, start: "top top", end: "bottom top", scrub: true };
      gsap.to(".hero-name", { yPercent: 18, ease: "none", scrollTrigger: scrub });
      gsap.to(".hero-meta", { yPercent: -40, autoAlpha: 0.2, ease: "none", scrollTrigger: scrub });
      gsap.to(".hero-band", { y: -60, ease: "none", scrollTrigger: scrub });
    }, root);
    return () => mm.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      id="home"
      aria-label="Introduction"
      className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden pt-28 md:pt-32"
    >
      <div className="px-5 md:px-10">
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

      <div className="hero-band mt-6 border-y border-line bg-ink-2 py-4 md:mt-10 md:py-5">
        <Marquee speed={60} velocityFactor={0.25} itemClassName="gap-0">
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
