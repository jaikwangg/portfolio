"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type FocusEvent } from "react";
import { allProjects, type Project } from "@/data/projects";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useFinePointer, useIsomorphicLayoutEffect, useReducedMotion } from "@/lib/hooks";
import { RevealOnScroll, SplitReveal, useLenis } from "@/components/motion";

// Detail pages are generated from project.id (see app/projects/[slug]).
const projectHref = (p: Project) => `/projects/${p.id}`;
const pad = (n: number) => String(n + 1).padStart(2, "0");
const IMG_W = 1200;
const IMG_H = 684;

const categoryLabel: Record<Project["category"], string> = {
  project: "Project",
  prototype: "Hackathon prototype",
};

/* ------------------------------------------------------------------ */
/* Home: pinned horizontal rail on desktop, stacked cards elsewhere.   */
/* The layout switch is the CSS `gallery:` variant (globals.css); JS   */
/* only adds the pin when the same media query matches.                */
/* ------------------------------------------------------------------ */

const GalleryCard = ({ project, index }: { project: Project; index: number }) => (
  <li data-card className="gallery:h-full gallery:w-[min(34vw,560px)] gallery:shrink-0">
    <Link
      href={projectHref(project)}
      data-cursor-label="View"
      className="group relative flex h-full flex-col overflow-hidden border border-line bg-ink-2 transition-colors duration-500 hover:border-accent focus-visible:border-accent gallery:justify-between"
    >
      {/* Image: always shown (owner, 22 Oct); on the rail it fills the card under a two-ended
          scrim (.rail-scrim, globals.css) that keeps the index, category and copy readable,
          and zooms slightly on hover / keyboard focus. */}
      <div
        data-media
        className="relative aspect-[16/10] overflow-hidden gallery:absolute gallery:inset-0 gallery:aspect-auto"
      >
        {/* data-parallax: GSAP owns this wrapper's transform (scroll parallax); the
            image keeps its own CSS hover zoom. */}
        <div data-parallax className="h-full w-full">
        <Image
          src={project.image}
          alt=""
          width={IMG_W}
          height={IMG_H}
          loading="lazy"
          sizes="(min-width: 1024px) 34vw, 100vw"
          className="h-full w-full object-cover transition-transform duration-1000 ease-out-expo gallery:scale-100 gallery:group-hover:scale-105 gallery:group-focus-visible:scale-105"
        />
        </div>
        <div aria-hidden="true" className="rail-scrim absolute inset-0 hidden gallery:block" />
      </div>

      <div className="relative flex items-start justify-between gap-4 p-5 md:p-7">
        <span className="font-display text-display-sm text-accent">{pad(index)}</span>
        <span className="pt-1 text-right text-[11px] font-medium uppercase tracking-[0.2em] text-mute transition-colors group-hover:text-paper gallery:text-paper">
          {categoryLabel[project.category]}
        </span>
      </div>

      <div className="relative p-5 pt-0 md:p-7 md:pt-0">
        <h3 className="font-display text-display-sm uppercase text-paper gallery:text-[clamp(2rem,3.1vw,3.5rem)] gallery:leading-[0.95]">{project.title}</h3>
        <p className="mt-3 max-w-md text-sm leading-6 text-mute transition-colors group-hover:text-paper">
          {project.description}
        </p>
        <ul className="mt-5 flex flex-wrap gap-2" aria-label="Tags">
          {project.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full border border-line px-3 py-1 text-[11px] font-medium uppercase tracking-[0.14em] text-paper"
            >
              {tag}
            </li>
          ))}
        </ul>
      </div>
    </Link>
  </li>
);

const ProjectsGallery = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLUListElement>(null);
  const stRef = useRef<ScrollTrigger | null>(null);
  const lenis = useLenis();

  useIsomorphicLayoutEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const mm = gsap.matchMedia();
    mm.add("(min-width: 64rem) and (prefers-reduced-motion: no-preference)", () => {
      const distance = () => Math.max(0, track.scrollWidth - window.innerWidth);
      const cards = gsap.utils.toArray<HTMLElement>("li[data-card]", track);
      const count = section.querySelector<HTMLElement>(".gallery-count");
      const total = cards.length - 1; // the last item is the "All projects" link
      let shown = 1;

      // Velocity lean: cards skew with the scroll speed and spring back at rest.
      const lean = { v: 0 };
      const setSkew = gsap.quickSetter(cards, "skewX", "deg");
      const clampSkew = gsap.utils.clamp(-5, 5);

      const tween = gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const skew = clampSkew(self.getVelocity() / -400);
            if (Math.abs(skew) > Math.abs(lean.v)) {
              lean.v = skew;
              gsap.to(lean, {
                v: 0,
                duration: 0.9,
                ease: "power3.out",
                overwrite: true,
                onUpdate: () => setSkew(lean.v),
              });
            }
            const n = Math.min(total, Math.round(self.progress * (total - 1)) + 1);
            if (count && n !== shown) {
              shown = n;
              count.textContent = String(n).padStart(2, "0");
            }
          },
        },
      });
      gsap.fromTo(
        ".gallery-progress",
        { scaleX: 0 },
        { scaleX: 1, ease: "none", scrollTrigger: { trigger: section, start: "top top", end: () => `+=${distance()}`, scrub: true } },
      );

      // Per card, measured against the horizontal tween: the image wipes open
      // left to right as the card slides in, and drifts inside its frame
      // (inner parallax) the whole time it is on screen.
      cards.slice(0, total).forEach((card) => {
        const media = card.querySelector<HTMLElement>("[data-media]");
        const inner = card.querySelector<HTMLElement>("[data-parallax]");
        if (!media || !inner) return;
        gsap.fromTo(
          media,
          { clipPath: "inset(0% 100% 0% 0%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            ease: "power2.out",
            scrollTrigger: { trigger: card, containerAnimation: tween, start: "left 98%", end: "left 62%", scrub: true },
          },
        );
        gsap.fromTo(
          inner,
          { xPercent: 7, scale: 1.16 },
          {
            xPercent: -7,
            scale: 1.16,
            ease: "none",
            scrollTrigger: { trigger: card, containerAnimation: tween, start: "left right", end: "right left", scrub: true },
          },
        );
      });

      stRef.current = tween.scrollTrigger ?? null;
      return () => {
        stRef.current = null;
        if (count) count.textContent = "01";
      };
    }, section);

    // Stacked cards (tablet / phone, motion allowed): each image opens from an
    // inset frame and settles from a slight zoom as it scrolls into view.
    mm.add("(max-width: 63.99rem) and (prefers-reduced-motion: no-preference)", () => {
      gsap.utils.toArray<HTMLElement>("li[data-card]", track).forEach((card) => {
        const media = card.querySelector<HTMLElement>("[data-media]");
        const inner = card.querySelector<HTMLElement>("[data-parallax]");
        if (!media || !inner) return;
        const scrollTrigger = { trigger: media, start: "top 98%", end: "top 55%", scrub: 0.5 };
        gsap.fromTo(media, { clipPath: "inset(10% 8% 10% 8%)" }, { clipPath: "inset(0% 0% 0% 0%)", ease: "none", scrollTrigger });
        gsap.fromTo(inner, { scale: 1.2 }, { scale: 1, ease: "none", scrollTrigger: { ...scrollTrigger } });
      });
    }, section);

    // Web fonts change card heights/widths; re-measure once they are in.
    let alive = true;
    document.fonts?.ready.then(() => alive && ScrollTrigger.refresh());

    return () => {
      alive = false;
      mm.revert();
    };
  }, []);

  // Keyboard users: tabbing to a card that is off to the side scrolls the
  // page to the point where the rail shows it.
  const onFocus = (e: FocusEvent<HTMLUListElement>) => {
    const st = stRef.current;
    const track = trackRef.current;
    const item = (e.target as HTMLElement).closest("li[data-card]") as HTMLElement | null;
    if (!st || !track || !item) return;
    const distance = st.end - st.start;
    if (distance <= 0) return;
    const goal = Math.min(Math.max(item.offsetLeft - window.innerWidth * 0.3, 0), distance);
    const y = st.start + goal;
    if (lenis) lenis.scrollTo(y, { immediate: true });
    else window.scrollTo(0, y);
  };

  return (
    <section
      ref={sectionRef}
      id="projects"
      aria-labelledby="projects-title"
      className="relative overflow-clip py-20 md:py-28 gallery:flex gallery:h-[100svh] gallery:flex-col gallery:py-0 gallery:pt-24"
    >
      <div className="flex flex-col gap-4 px-5 md:flex-row md:items-end md:justify-between md:px-10">
        <h2 id="projects-title" className="font-display text-display-lg uppercase text-paper">
          <SplitReveal text="Selected work" split="chars" scrub start="top 95%" scrubEnd="top 40%" />
        </h2>
        <p className="max-w-sm text-sm leading-6 text-mute md:pb-3 md:text-right">
          Here are some of my recent works. Each project is a unique piece of development.
          <span className="mt-1 block text-paper">({String(allProjects.length).padStart(2, "0")})</span>
        </p>
      </div>

      <div className="mt-10 md:mt-14 gallery:mt-8 gallery:min-h-0 gallery:flex-1 gallery:pb-14">
        <ul
          ref={trackRef}
          onFocus={onFocus}
          className="grid gap-5 px-5 md:grid-cols-2 md:gap-6 md:px-10 gallery:flex gallery:h-full gallery:w-max gallery:gap-6 gallery:will-change-transform"
        >
          {allProjects.map((project, i) => (
            <GalleryCard key={project.id} project={project} index={i} />
          ))}
          <li data-card className="gallery:flex gallery:h-full gallery:w-[min(28vw,440px)] gallery:shrink-0 gallery:items-center md:col-span-2">
            <Link
              href="/projects"
              className="group flex w-full items-center justify-between gap-6 border-y border-line py-8 font-display text-display-sm uppercase text-paper transition-colors hover:text-accent gallery:flex-col gallery:items-start gallery:border-y-0 gallery:border-l gallery:py-0 gallery:pl-10 gallery:text-display-md"
            >
              <span>
                All projects
                <span className="sr-only"> (full list)</span>
              </span>
              <span
                aria-hidden="true"
                className="flex h-14 w-14 items-center justify-center rounded-full border border-current text-2xl transition-transform duration-500 ease-out-expo group-hover:rotate-[-45deg] gallery:h-20 gallery:w-20 gallery:text-3xl"
              >
                &rarr;
              </span>
            </Link>
          </li>
        </ul>
      </div>

      <div aria-hidden="true" className="absolute inset-x-5 bottom-6 hidden items-center gap-5 md:inset-x-10 gallery:flex">
        <span className="text-xs font-medium tabular-nums tracking-[0.2em] text-paper">
          <span className="gallery-count">01</span>
          <span className="text-mute"> / {String(allProjects.length).padStart(2, "0")}</span>
        </span>
        <span className="relative h-px flex-1 bg-line">
          <span className="gallery-progress absolute inset-0 origin-left scale-x-0 bg-accent" />
        </span>
      </div>
    </section>
  );
};

/* ------------------------------------------------------------------ */
/* /projects: full index grouped by category, hover image preview that */
/* follows the pointer (fine pointer + motion); inline thumbnails else. */
/* ------------------------------------------------------------------ */

const groups = [
  {
    key: "project" as const,
    title: "Projects",
    description: "Here are some of my recent works. Each project is a unique piece of development.",
  },
  {
    key: "prototype" as const,
    title: "Hackathon prototypes",
    description:
      "Innovative prototypes created during hackathons to solve real-world challenges with emerging tech.",
  },
];

const ProjectsIndex = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<Project | null>(null);
  const fine = useFinePointer();
  const reduced = useReducedMotion();
  const previewOn = fine && !reduced;
  const moveRef = useRef<{ x: (v: number) => void; y: (v: number) => void } | null>(null);
  // Hover previews: fetch them once the page has loaded (idle), so the first
  // hover never shows an empty frame and they do not compete with the LCP.
  const [warm, setWarm] = useState(false);

  useEffect(() => {
    if (!previewOn) return;
    let idle: number | undefined;
    const go = () => {
      idle = window.requestIdleCallback
        ? window.requestIdleCallback(() => setWarm(true), { timeout: 1500 })
        : window.setTimeout(() => setWarm(true), 300);
    };
    if (document.readyState === "complete") go();
    else window.addEventListener("load", go, { once: true });
    return () => {
      window.removeEventListener("load", go);
      if (idle !== undefined) (window.cancelIdleCallback ?? window.clearTimeout)(idle);
    };
  }, [previewOn]);

  useIsomorphicLayoutEffect(() => {
    const preview = previewRef.current;
    if (!previewOn || !preview) return;
    gsap.set(preview, { xPercent: -50, yPercent: -50 });
    moveRef.current = {
      x: gsap.quickTo(preview, "x", { duration: 0.6, ease: "power3.out" }),
      y: gsap.quickTo(preview, "y", { duration: 0.6, ease: "power3.out" }),
    };
    return () => {
      moveRef.current = null;
      gsap.killTweensOf(preview);
    };
  }, [previewOn]);

  const onMove = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    moveRef.current?.x(e.clientX);
    moveRef.current?.y(e.clientY);
  };

  let n = 0;
  return (
    <section
      ref={sectionRef}
      id="projects"
      aria-labelledby="projects-index-title"
      onPointerMove={previewOn ? onMove : undefined}
      className="relative px-5 pb-24 pt-32 md:px-10 md:pb-32 md:pt-40"
    >
      <h1 id="projects-index-title" className="font-display text-display-xl uppercase text-paper">
        <SplitReveal text="Work" split="chars" trigger="load" stagger={0.06} />
      </h1>
      <p className="mt-6 max-w-xl text-[15px] leading-7 text-mute md:text-lg md:leading-8">
        Full-stack products, frontend work and hackathon prototypes. Select one for the details.
      </p>

      {groups.map((group) => {
        const items = allProjects.filter((p) => p.category === group.key);
        return (
          <div key={group.key} className="mt-20 md:mt-28">
            <div className="flex flex-col gap-3 border-b border-line pb-6 md:flex-row md:items-end md:justify-between">
              <h2 className="font-display text-display-md uppercase text-paper">
                {group.title}
                <sup className="ml-2 align-super font-sans text-sm text-accent">{String(items.length).padStart(2, "0")}</sup>
              </h2>
              <p className="max-w-md text-sm leading-6 text-mute md:text-right">{group.description}</p>
            </div>
            <RevealOnScroll as="ul" stagger={0.06} y={32}>
              {items.map((project) => {
                const i = n++;
                return (
                  <li key={project.id} className="border-b border-line">
                    <Link
                      href={projectHref(project)}
                      data-cursor-label="View"
                      onPointerEnter={previewOn ? () => setActive(project) : undefined}
                      onPointerLeave={previewOn ? () => setActive(null) : undefined}
                      className="group grid grid-cols-[auto_1fr] items-center gap-x-4 gap-y-3 py-6 transition-colors md:grid-cols-[4rem_1fr_auto_auto] md:gap-x-8 md:py-8"
                    >
                      <span className="text-xs tabular-nums text-mute md:text-sm">{pad(i)}</span>
                      <span className="font-display text-display-sm uppercase text-paper transition-[color,transform] duration-500 ease-out-expo group-hover:translate-x-2 group-hover:text-accent group-focus-visible:text-accent md:text-display-md">
                        {project.title}
                      </span>
                      <span className="col-span-2 flex flex-wrap gap-2 md:col-span-1 md:justify-end">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full border border-line px-3 py-1 text-[11px] font-medium uppercase tracking-[0.14em] text-mute"
                          >
                            {tag}
                          </span>
                        ))}
                      </span>
                      <span
                        aria-hidden="true"
                        className="hidden h-12 w-12 items-center justify-center rounded-full border border-line text-xl text-paper transition-all duration-500 ease-out-expo group-hover:rotate-[-45deg] group-hover:border-accent group-hover:bg-accent group-hover:text-on-accent md:flex"
                      >
                        &rarr;
                      </span>
                      {/* Inline thumbnail wherever the floating preview is off. */}
                      <span className="col-span-2 block overflow-hidden md:col-start-2 md:col-end-3 md:max-w-md hover-motion:hidden">
                        <Image
                          src={project.image}
                          alt=""
                          width={IMG_W}
                          height={IMG_H}
                          // The first rows are in the first screen on phones: load them now (LCP).
                          priority={i < 2}
                          loading={i < 2 ? undefined : "lazy"}
                          sizes="(min-width: 768px) 28rem, 100vw"
                          className="aspect-[16/9] h-auto w-full object-cover"
                        />
                      </span>
                    </Link>
                  </li>
                );
              })}
            </RevealOnScroll>
          </div>
        );
      })}

      {previewOn && (
        <div
          ref={previewRef}
          aria-hidden="true"
          className="pointer-events-none fixed left-0 top-0 z-40 aspect-[16/10] w-[min(28vw,420px)] overflow-hidden"
        >
          {allProjects.map((p) => (
            <div
              key={p.id}
              className={`absolute inset-0 transition-[clip-path] duration-700 ease-out-expo ${
                active?.id === p.id ? "[clip-path:inset(0_0_0_0)]" : "[clip-path:inset(100%_0_0_0)]"
              }`}
            >
              <Image
                src={p.image}
                alt=""
                width={IMG_W}
                height={IMG_H}
                loading={warm ? "eager" : "lazy"}
                sizes="28vw"
                className={`h-full w-full object-cover transition-transform duration-1000 ease-out-expo ${
                  active?.id === p.id ? "scale-100" : "scale-125"
                }`}
              />
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

/* ------------------------------------------------------------------ */

interface ProjectsProps {
  /** "gallery" (home rail, default) or "index" (/projects full list). */
  variant?: "gallery" | "index";
}

const Projects = ({ variant = "gallery" }: ProjectsProps) =>
  variant === "index" ? <ProjectsIndex /> : <ProjectsGallery />;

export default Projects;
