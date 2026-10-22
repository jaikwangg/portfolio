"use client";

import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/lib/hooks";
import { RevealOnScroll } from "@/components/motion";

const statement = "I like building products that are clear, reliable, and pleasant to use.";
const emphasis = new Set(["clear,", "reliable,", "pleasant"]);

const capabilities = [
  {
    title: "Frontend systems",
    description:
      "Building responsive interfaces with strong hierarchy, clear states, and consistent component behavior.",
  },
  {
    title: "Full-stack delivery",
    description:
      "Connecting UI, APIs, and data flows so the product works reliably beyond the mockup stage.",
  },
  {
    title: "Design-minded execution",
    description:
      "Balancing implementation speed with usability, readability, and attention to visual detail.",
  },
];

const techStack = [
  { name: "React / Next.js", note: "For fast product sites, dashboards, and modern app flows with good structure." },
  { name: "TypeScript", note: "For safer codebases, clearer contracts, and easier long-term maintenance." },
  { name: "Node.js", note: "For backend logic, integrations, and APIs that support real product workflows." },
  {
    name: "PostgreSQL / MongoDB",
    note: "For structured and document-driven data models depending on the project needs.",
  },
];

const facts = [
  { label: "Based in", value: "Bangkok, Thailand" },
  { label: "Focus", value: "Product websites and full-stack apps" },
  { label: "Working style", value: "Clean UI, solid UX, reliable delivery" },
];

interface AboutProps {
  /** h1 on /about (the page's only top-level heading), h2 inside the home page. */
  titleAs?: "h1" | "h2";
}

const About = ({ titleAs: Title = "h2" }: AboutProps) => {
  const pinRef = useRef<HTMLDivElement>(null);

  // The statement lights up word by word as you scroll. Pinned on md+,
  // plain scrubbed reveal on small screens, fully static under reduced motion.
  useIsomorphicLayoutEffect(() => {
    const el = pinRef.current;
    if (!el) return;
    const mm = gsap.matchMedia();
    mm.add(
      {
        wide: "(min-width: 48rem) and (prefers-reduced-motion: no-preference)",
        narrow: "(max-width: 47.99rem) and (prefers-reduced-motion: no-preference)",
      },
      (ctx) => {
        const wide = Boolean(ctx.conditions?.wide);
        const words = gsap.utils.toArray<HTMLElement>(".about-word", el);
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: wide
            ? { trigger: el, start: "top top", end: "+=140%", pin: true, scrub: 0.6 }
            : { trigger: el, start: "top 75%", end: "bottom 60%", scrub: 0.6 },
        });
        tl.fromTo(words, { opacity: 0.14 }, { opacity: 1, stagger: 0.5, duration: 1 });
        tl.from(".about-sub", { autoAlpha: 0, y: 24, duration: 2 }, ">-1");
      },
      el,
    );
    return () => mm.revert();
  }, []);

  const words = statement.split(" ");

  return (
    <section id="about" aria-labelledby="about-title" className="relative">
      <div
        ref={pinRef}
        className="flex flex-col justify-center px-5 py-24 md:min-h-[100svh] md:px-10 md:py-28"
      >
        <p className="mb-8 flex items-center gap-4 text-xs font-medium uppercase tracking-[0.22em] text-mute md:mb-12 md:text-sm">
          <span className="h-px w-10 bg-accent" aria-hidden="true" />
          About
        </p>
        <Title id="about-title" className="max-w-[16ch] font-display text-display-lg uppercase text-paper">
          {words.map((w, i) => (
            <span key={i}>
              <span className={`about-word inline-block ${emphasis.has(w) ? "text-accent" : ""}`}>{w}</span>
              {i < words.length - 1 ? " " : null}
            </span>
          ))}
        </Title>
        <p className="about-sub mt-8 max-w-2xl text-base leading-7 text-mute md:mt-12 md:text-lg md:leading-8">
          My work sits between product thinking, interface design, and engineering. I enjoy turning
          ideas into experiences that look intentional, feel smooth, and hold up in real use.
        </p>
      </div>

      <div className="border-t border-line px-5 py-20 md:px-10 md:py-28">
        <RevealOnScroll as="dl" stagger={0.08} y={24} className="grid gap-6 border-b border-line pb-12 sm:grid-cols-3 md:pb-16">
          {facts.map((f) => (
            <div key={f.label}>
              <dt className="text-xs font-medium uppercase tracking-[0.2em] text-mute">{f.label}</dt>
              <dd className="mt-2 text-lg leading-7 text-paper md:text-xl">{f.value}</dd>
            </div>
          ))}
        </RevealOnScroll>

        <div className="mt-12 grid gap-14 md:mt-16 lg:grid-cols-2 lg:gap-20">
          <div>
            <h3 className="text-xs font-medium uppercase tracking-[0.22em] text-accent md:text-sm">Working approach</h3>
            <RevealOnScroll as="ol" stagger={0.1} y={32} className="mt-6">
              {capabilities.map((c, i) => (
                <li key={c.title} className="grid grid-cols-[3rem_1fr] gap-x-2 border-b border-line py-6 first:border-t">
                  <span className="pt-1 text-xs tabular-nums text-mute">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <p className="font-display text-display-sm uppercase text-paper">{c.title}</p>
                    <p className="mt-3 text-sm leading-7 text-mute md:text-base">{c.description}</p>
                  </div>
                </li>
              ))}
            </RevealOnScroll>
          </div>

          <div>
            <h3 className="text-xs font-medium uppercase tracking-[0.22em] text-accent md:text-sm">Core stack</h3>
            <RevealOnScroll as="ul" stagger={0.1} y={32} className="mt-6">
              {techStack.map((t) => (
                <li key={t.name} className="flex flex-col gap-2 border-b border-line py-6 first:border-t sm:flex-row sm:items-baseline sm:justify-between sm:gap-8">
                  <p className="shrink-0 text-lg font-semibold text-paper md:text-xl">{t.name}</p>
                  <p className="max-w-sm text-sm leading-7 text-mute sm:text-right">{t.note}</p>
                </li>
              ))}
            </RevealOnScroll>
            <div className="mt-10 bg-accent-soft p-6 md:p-8">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent">What I aim to deliver</p>
              <p className="mt-3 text-base leading-7 text-paper">
                A product that not only looks good in screenshots, but also feels dependable for the
                people who use it every day.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
