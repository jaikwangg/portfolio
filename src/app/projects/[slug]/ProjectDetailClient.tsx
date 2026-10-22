"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { preload } from "react-dom";
import Navigation from "@/components/Navigation";
import { MagneticButton, Marquee, RevealOnScroll, SplitReveal } from "@/components/motion";
import { gsap } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/lib/hooks";
import type { Project } from "@/data/projects";

interface Props {
  project: Project;
  next: Project;
  index: number;
  total: number;
}

// The global :focus-visible rule sets a 2px radius; keep pills round when focused.
const PILL = { borderRadius: 9999 } as const;
const pad = (n: number) => String(n).padStart(2, "0");
/** The data uses "#" as a "not deployed yet" placeholder. */
const realUrl = (url?: string) => (url && url !== "#" ? url : null);
/** project-x.webp -> "project-x.webp 1200w, project-x@2x.webp 2400w" (made by scripts/optimize-images.js). */
const heroSrcSetFor = (src: string) =>
  src.endsWith(".webp") ? `${src} 1200w, ${src.replace(/\.webp$/, "@2x.webp")} 2400w` : undefined;
const categoryLabel = (c: Project["category"]) => (c === "project" ? "Project" : "Hackathon prototype");

const Arrow = ({ className }: { className?: string }) => (
  <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className={className}>
    <path strokeLinecap="square" d="M7 17 17 7M8 7h9v9" />
  </svg>
);

export default function ProjectDetailClient({ project, next, index, total }: Props) {
  const figureRef = useRef<HTMLDivElement>(null);
  const heroImgRef = useRef<HTMLImageElement>(null);
  const nextLinkRef = useRef<HTMLAnchorElement>(null);
  const floatRef = useRef<HTMLDivElement>(null);

  // Full-bleed hero: 1200w for phones / 1x, 2400w for 1440px screens at 2x.
  const heroSrcSet = heroSrcSetFor(project.image);
  preload(project.image, { as: "image", imageSrcSet: heroSrcSet, imageSizes: "100vw", fetchPriority: "high" });

  const live = realUrl(project.link);
  const github = realUrl(project.github);
  const longTitle = project.title.length > 16;

  // Hero image: clip + scale scrubbed by scroll. Nothing under reduced motion
  // (matchMedia also reverts live if the OS setting flips).
  useIsomorphicLayoutEffect(() => {
    const figure = figureRef.current;
    const img = heroImgRef.current;
    if (!figure || !img) return;
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const scrollTrigger = { trigger: figure, start: "top bottom", end: "top 12%", scrub: true };
      gsap.fromTo(
        figure,
        { clipPath: "inset(14% 10% 14% 10% round 32px)" },
        { clipPath: "inset(0% 0% 0% 0% round 0px)", ease: "none", scrollTrigger },
      );
      gsap.fromTo(img, { scale: 1.3 }, { scale: 1, ease: "none", scrollTrigger: { ...scrollTrigger } });
    });
    return () => mm.revert();
  }, [project.id]);

  // Next-project image follows the pointer (fine pointer + motion allowed only;
  // otherwise it stays at its CSS position and still reveals on hover/focus).
  useEffect(() => {
    const link = nextLinkRef.current;
    const float = floatRef.current;
    if (!link || !float) return;
    const ok = window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
    if (!ok.matches) return;

    // Tailwind's -translate-y-1/2 uses the CSS `translate` property; GSAP owns
    // the transform from here, so drop it to avoid a double offset.
    float.style.translate = "none";
    gsap.set(float, { left: 0, top: 0, right: "auto", xPercent: -50, yPercent: -50 });
    const xTo = gsap.quickTo(float, "x", { duration: 0.7, ease: "power3.out" });
    const yTo = gsap.quickTo(float, "y", { duration: 0.7, ease: "power3.out" });
    let placed = false;
    const onMove = (e: PointerEvent) => {
      const r = link.getBoundingClientRect();
      const x = e.clientX - r.left;
      // Keep the image inside the footer (the link clips its overflow).
      const half = float.offsetHeight / 2;
      const y = Math.min(Math.max(e.clientY - r.top, half), Math.max(half, r.height - half));
      if (!placed) {
        placed = true;
        gsap.set(float, { x, y });
      }
      xTo(x);
      yTo(y);
    };
    const onLeave = () => {
      placed = false;
    };
    link.addEventListener("pointermove", onMove);
    link.addEventListener("pointerleave", onLeave);
    return () => {
      link.removeEventListener("pointermove", onMove);
      link.removeEventListener("pointerleave", onLeave);
      gsap.killTweensOf(float);
      gsap.set(float, { clearProps: "all" });
    };
  }, [next.id]);

  return (
    <>
      <Navigation />
      <main id="main-content" tabIndex={-1} className="bg-ink text-paper">

        {/* ------------------------------------------------------------ header */}
        <header className="px-4 pt-28 sm:px-8 md:pt-36">
          <div className="flex items-center justify-between border-b border-line pb-4 text-xs font-medium uppercase tracking-[0.2em] text-mute">
            <Link
              href="/projects"
              className="group inline-flex items-center gap-2 transition-colors hover:text-paper focus-visible:text-paper"
            >
              <span aria-hidden="true" className="transition-transform duration-500 ease-out-expo group-hover:-translate-x-1">
                &larr;
              </span>
              All projects
            </Link>
            <span>
              <span className="text-accent">{pad(index + 1)}</span> / {pad(total)}
            </span>
          </div>

          <SplitReveal
            as="h1"
            text={project.title}
            trigger="load"
            split="words"
            stagger={0.08}
            className={`mt-8 break-words font-display uppercase ${longTitle ? "text-display-lg" : "text-display-xl"}`}
          />

          <div className="mt-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <ul className="flex flex-wrap gap-2" aria-label="Category and tags">
              <li className="rounded-full bg-accent px-4 py-1.5 text-sm font-semibold text-on-accent">
                {categoryLabel(project.category)}
              </li>
              {project.tags.map((tag) => (
                <li key={tag} className="rounded-full border border-line px-4 py-1.5 text-sm text-paper/90">
                  {tag}
                </li>
              ))}
            </ul>
            <p className="max-w-md text-base leading-relaxed text-mute md:text-right">{project.description}</p>
          </div>
        </header>

        {/* -------------------------------------------------------- hero image */}
        <div className="mt-12 md:mt-16">
          <div ref={figureRef} className="relative aspect-[4/3] w-full overflow-hidden bg-ink-2 md:aspect-[16/9]">
            {/* Plain <img>: the export is unoptimized, so next/image would not emit a srcset. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              ref={heroImgRef}
              src={project.image}
              srcSet={heroSrcSet}
              sizes="100vw"
              alt={project.imageAlt ?? `${project.title} screenshot`}
              width={1200}
              height={684}
              fetchPriority="high"
              decoding="async"
              className="h-full w-full object-cover will-change-transform"
            />
          </div>
        </div>

        {/* ---------------------------------------------------------- overview */}
        <section aria-labelledby="overview-heading" className="grid gap-10 px-4 py-24 sm:px-8 md:grid-cols-12 md:py-36">
          <div className="md:col-span-4">
            <h2 id="overview-heading" className="text-xs font-medium uppercase tracking-[0.2em] text-mute">
              (Overview)
            </h2>
            {(live || github) && (
              <div className="mt-8 flex flex-wrap gap-3">
                {live && (
                  <MagneticButton>
                    <a
                      href={live}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cursor-label="Visit"
                      className="group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 font-semibold text-on-accent transition-colors hover:bg-paper"
                      style={PILL}
                    >
                      Live site
                      <Arrow className="h-4 w-4 transition-transform duration-500 ease-out-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      <span className="sr-only">(opens in a new tab)</span>
                    </a>
                  </MagneticButton>
                )}
                {github && (
                  <MagneticButton>
                    <a
                      href={github}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cursor-label="Code"
                      className="group inline-flex items-center gap-2 rounded-full border border-line px-6 py-3 font-semibold text-paper transition-colors hover:border-paper hover:bg-paper hover:text-ink"
                      style={PILL}
                    >
                      GitHub
                      <Arrow className="h-4 w-4 transition-transform duration-500 ease-out-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      <span className="sr-only">(opens in a new tab)</span>
                    </a>
                  </MagneticButton>
                )}
              </div>
            )}
          </div>
          <RevealOnScroll className="md:col-span-8">
            <p className="max-w-[38ch] text-2xl leading-snug text-paper md:text-[2.1rem] md:leading-[1.25]">
              {project.longDescription || project.description}
            </p>
          </RevealOnScroll>
        </section>

        {/* ---------------------------------------------------------- features */}
        {project.features && project.features.length > 0 && (
          <section aria-labelledby="features-heading" className="px-4 pb-24 sm:px-8 md:pb-36">
            <h2 id="features-heading" className="font-display text-display-md uppercase">
              <SplitReveal text="Key features" />
            </h2>
            <RevealOnScroll as="ol" stagger={0.1} y={40} className="mt-10 border-b border-line md:mt-14">
              {project.features.map((feature, i) => (
                <li
                  key={feature}
                  className="grid grid-cols-[3.5rem_1fr] items-baseline gap-4 border-t border-line py-6 md:grid-cols-[8rem_1fr] md:py-8"
                >
                  <span aria-hidden="true" className="font-display text-2xl text-accent md:text-4xl">
                    {pad(i + 1)}
                  </span>
                  <span className="text-xl leading-snug md:text-3xl">{feature}</span>
                </li>
              ))}
            </RevealOnScroll>
          </section>
        )}

        {/* ------------------------------------------------------ technologies */}
        {project.technologies && project.technologies.length > 0 && (
          <section aria-labelledby="stack-heading" className="pb-24 md:pb-36">
            <h2 id="stack-heading" className="px-4 text-xs font-medium uppercase tracking-[0.2em] text-mute sm:px-8">
              (Built with)
            </h2>
            {/* Decorative; the list below carries the content (and stays readable under reduced motion). */}
            <div aria-hidden="true" className="mt-6 border-y border-line py-4 md:py-6">
              <Marquee speed={60} itemClassName="gap-8 pr-8 md:gap-12 md:pr-12">
                {project.technologies.map((tech) => (
                  <span key={tech} className="flex items-center gap-8 md:gap-12">
                    <span className="whitespace-nowrap font-display text-display-lg uppercase">{tech}</span>
                    <span className="text-display-sm text-accent">&#10033;</span>
                  </span>
                ))}
              </Marquee>
            </div>
            <ul className="mt-6 flex flex-wrap gap-2 px-4 sm:px-8">
              {project.technologies.map((tech) => (
                <li key={tech} className="rounded-full border border-line bg-ink-2 px-4 py-1.5 text-sm text-paper/90">
                  {tech}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* ------------------------------------------------------ next project */}
        <footer className="border-t border-line">
          <Link
            ref={nextLinkRef}
            href={`/projects/${next.id}`}
            data-cursor-label="Next"
            className="group relative block overflow-hidden px-4 py-20 outline-offset-[-6px] sm:px-8 md:py-32"
          >
            <span className="flex items-center justify-between text-xs font-medium uppercase tracking-[0.2em] text-mute">
              <span>Next project</span>
              <span>
                {pad(((index + 1) % total) + 1)} / {pad(total)}
              </span>
            </span>
            <span className="relative z-10 mt-6 flex items-end justify-between gap-6">
              <span className="break-words font-display text-display-lg uppercase transition-colors duration-500 group-hover:text-accent group-focus-visible:text-accent">
                {next.title}
              </span>
              <Arrow className="mb-[0.6em] h-10 w-10 shrink-0 text-accent transition-transform duration-700 ease-out-expo group-hover:-translate-y-2 group-hover:translate-x-2 md:h-16 md:w-16" />
            </span>

            {/* Hover/focus image reveal (pointer devices only). */}
            <div
              ref={floatRef}
              aria-hidden="true"
              className="pointer-events-none absolute right-[8%] top-1/2 z-0 hidden w-[min(28vw,420px)] -translate-y-1/2 [@media(hover:hover)_and_(pointer:fine)]:block"
            >
              <div className="aspect-[4/3] overflow-hidden [clip-path:inset(50%_0_50%_0)] transition-[clip-path] duration-700 ease-out-expo group-hover:[clip-path:inset(0_0_0_0)] group-focus-visible:[clip-path:inset(0_0_0_0)]">
                <Image
                  src={next.image}
                  alt=""
                  width={840}
                  height={630}
                  loading="lazy"
                  sizes="(min-width: 1500px) 420px, 28vw"
                  className="h-full w-full scale-125 object-cover opacity-90 transition-transform duration-700 ease-out-expo group-hover:scale-100 group-focus-visible:scale-100"
                />
              </div>
            </div>
          </Link>
        </footer>
      </main>
    </>
  );
}
