"use client";

import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/lib/hooks";
import { RevealOnScroll } from "@/components/motion";
import { allProjects } from "@/data/projects";

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

// Counted from the project data, so they stay true as projects are added.
const stats = [
  { label: "Projects", value: allProjects.filter((p) => p.category === "project").length },
  { label: "Hackathon prototypes", value: allProjects.filter((p) => p.category === "prototype").length },
  { label: "Tools & tech", value: new Set(allProjects.flatMap((p) => p.technologies ?? [])).size },
];

interface AboutProps {
  /** h1 on /about (the page's only top-level heading), h2 inside the home page. */
  titleAs?: "h1" | "h2";
}

const About = ({ titleAs: Title = "h2" }: AboutProps) => {
  const pinRef = useRef<HTMLDivElement>(null);
  const detailRef = useRef<HTMLDivElement>(null);

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

  // Stats count up once when they enter; the capability cards stack (md+):
  // each one is sticky (CSS, `stack:` variant) and the card underneath sinks
  // back and dims as the next one slides over it. Static under reduced motion.
  useIsomorphicLayoutEffect(() => {
    const el = detailRef.current;
    if (!el) return;
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.utils.toArray<HTMLElement>("[data-count]", el).forEach((n) => {
        const to = Number(n.dataset.count);
        const box = { v: 0 };
        n.textContent = "00";
        gsap.to(box, {
          v: to,
          duration: 1.6,
          ease: "power3.out",
          scrollTrigger: { trigger: n, start: "top 88%", once: true },
          onUpdate: () => {
            n.textContent = String(Math.round(box.v)).padStart(2, "0");
          },
        });
      });
      return () => {
        gsap.utils.toArray<HTMLElement>("[data-count]", el).forEach((n) => {
          n.textContent = String(n.dataset.count).padStart(2, "0");
        });
      };
    }, el);
    mm.add("(min-width: 48rem) and (prefers-reduced-motion: no-preference)", () => {
      const cards = gsap.utils.toArray<HTMLElement>("[data-stack-card]", el);
      cards.slice(0, -1).forEach((card, i) => {
        const next = cards[i + 1];
        const scrollTrigger = { trigger: next, start: "top 85%", end: "top 30%", scrub: true };
        gsap.to(card.querySelector("[data-stack-inner]"), { scale: 0.92, yPercent: -4, transformOrigin: "50% 0%", ease: "none", scrollTrigger });
        gsap.to(card.querySelector("[data-stack-shade]"), { opacity: 0.5, ease: "none", scrollTrigger: { ...scrollTrigger } });
      });
    }, el);
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

      <div ref={detailRef} className="border-t border-line px-5 py-20 md:px-10 md:py-28">
        <dl className="grid grid-cols-3 gap-4 border-b border-line pb-10 md:pb-14">
          {stats.map((st) => (
            // dt first in the source (valid <dl>), shown under the number.
            <div key={st.label} className="flex flex-col-reverse justify-end">
              <dt className="mt-3 text-[11px] font-medium uppercase tracking-[0.12em] text-mute sm:tracking-[0.2em] md:text-xs">{st.label}</dt>
              <dd className="font-display text-display-lg tabular-nums leading-none text-accent">
                <span aria-hidden="true" data-count={st.value}>
                  {String(st.value).padStart(2, "0")}
                </span>
                <span className="sr-only">{st.value}</span>
              </dd>
            </div>
          ))}
        </dl>

        <RevealOnScroll as="dl" stagger={0.08} y={24} className="mt-10 grid gap-6 border-b border-line pb-12 sm:grid-cols-3 md:mt-14 md:pb-16">
          {facts.map((f) => (
            <div key={f.label}>
              <dt className="text-xs font-medium uppercase tracking-[0.2em] text-mute">{f.label}</dt>
              <dd className="mt-2 text-lg leading-7 text-paper md:text-xl">{f.value}</dd>
            </div>
          ))}
        </RevealOnScroll>

        <div className="mt-12 md:mt-16">
          <h3 className="text-xs font-medium uppercase tracking-[0.22em] text-accent md:text-sm">Working approach</h3>
          <ol className="mt-6 flex flex-col gap-4 stack:gap-[18vh] stack:pb-[6vh]">
            {capabilities.map((c, i) => (
              <li
                key={c.title}
                data-stack-card
                className="stack:sticky"
                style={{ top: `calc(6.5rem + ${i} * 1.5rem)` }}
              >
                <div
                  data-stack-inner
                  className="relative grid grid-cols-[3rem_1fr] gap-x-2 overflow-hidden border border-line bg-ink-2 p-6 md:grid-cols-[6rem_1fr] md:p-10"
                >
                  <span className="font-display text-display-sm tabular-nums text-accent">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <p className="font-display text-display-md uppercase text-paper">{c.title}</p>
                    <p className="mt-4 max-w-xl text-sm leading-7 text-mute md:text-base">{c.description}</p>
                  </div>
                  <span aria-hidden="true" data-stack-shade className="pointer-events-none absolute inset-0 bg-ink opacity-0" />
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-16 grid gap-14 md:mt-24 lg:grid-cols-2 lg:gap-20">
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
          </div>
          <div className="lg:self-end">
            <div className="bg-accent-soft p-6 md:p-8">
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
