"use client";

import { MagneticButton, Marquee, RevealOnScroll, SplitReveal } from "@/components/motion";

const EMAIL = "Worakij.W@gmail.com";

const links = [
  { label: "Email", value: EMAIL, href: `mailto:${EMAIL}`, external: false },
  { label: "GitHub", value: "@jaikwangg", href: "https://github.com/jaikwangg", external: true },
  { label: "Instagram", value: "@Worajai_", href: "https://instagram.com/Worajai_", external: true },
];

const Contact = () => {
  const year = new Date().getFullYear();

  return (
    <section id="contact" aria-labelledby="contact-title" className="relative overflow-hidden border-t border-line">
      <div className="px-5 pb-16 pt-24 md:px-10 md:pb-24 md:pt-32">
        <p className="mb-8 flex items-center gap-4 text-xs font-medium uppercase tracking-[0.22em] text-mute md:mb-10 md:text-sm">
          <span className="h-px w-10 bg-accent" aria-hidden="true" />
          Get in touch
        </p>

        <h2 id="contact-title" className="font-display text-display-xl uppercase text-paper">
          <SplitReveal text="Let's work" split="chars" stagger={0.03} className="block" />
          <SplitReveal text="together" split="chars" stagger={0.03} delay={0.15} className="block text-accent" />
        </h2>

        <div className="mt-12 flex flex-col gap-12 md:mt-16 lg:flex-row lg:items-center lg:justify-between">
          <p className="max-w-md text-base leading-7 text-mute md:text-lg md:leading-8">
            Have a project in mind or want to collaborate? Feel free to reach out!
          </p>
          <MagneticButton strength={0.3} className="self-start lg:self-auto">
            <a
              href={`mailto:${EMAIL}`}
              data-cursor-label="Mail"
              className="group relative flex h-40 w-40 items-center justify-center overflow-hidden rounded-full bg-accent text-center text-sm font-semibold uppercase tracking-[0.16em] text-on-accent md:h-52 md:w-52 md:text-base"
            >
              <span
                aria-hidden="true"
                className="absolute inset-0 translate-y-full rounded-full bg-paper transition-transform duration-500 ease-out-expo group-hover:translate-y-0 group-focus-visible:translate-y-0"
              />
              <span className="relative">
                Send an
                <br />
                email
              </span>
            </a>
          </MagneticButton>
        </div>

        <RevealOnScroll as="ul" stagger={0.08} y={24} className="mt-16 md:mt-24">
          {links.map((l) => (
            <li key={l.label} className="border-b border-line first:border-t">
              <a
                href={l.href}
                {...(l.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="group flex items-center justify-between gap-4 py-5 md:py-7"
              >
                <span className="text-xs font-medium uppercase tracking-[0.22em] text-mute md:w-40 md:text-sm">{l.label}</span>
                <span className="min-w-0 flex-1 truncate text-right text-lg text-paper transition-colors group-hover:text-accent md:text-left md:text-3xl">
                  {l.value}
                  {l.external && <span className="sr-only"> (opens in a new tab)</span>}
                </span>
                <span
                  aria-hidden="true"
                  className="text-xl text-paper transition-transform duration-500 ease-out-expo group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-accent md:text-2xl"
                >
                  &#8599;
                </span>
              </a>
            </li>
          ))}
          <li className="flex items-center justify-between gap-4 border-b border-line py-5 md:py-7">
            <span className="text-xs font-medium uppercase tracking-[0.22em] text-mute md:w-40 md:text-sm">Location</span>
            <span className="flex-1 text-right text-lg text-paper md:text-left md:text-3xl">Ladkrabang, Bangkok, Thailand</span>
            <span aria-hidden="true" className="w-5 md:w-6" />
          </li>
        </RevealOnScroll>
      </div>

      <footer className="border-t border-line">
        <div className="py-6 md:py-10" aria-hidden="true">
          <Marquee speed={50} direction={-1} velocityFactor={0.2} repeat={3}>
            {["Jaikwang", "Full-stack developer", "Bangkok"].map((t) => (
              <span key={t} className="flex items-center">
                <span className="text-outline px-6 font-display text-display-lg uppercase md:px-10">{t}</span>
                <span className="font-display text-display-sm text-accent">&#10022;</span>
              </span>
            ))}
          </Marquee>
        </div>
        <div className="flex flex-col gap-3 border-t border-line px-5 py-6 text-xs uppercase tracking-[0.18em] text-mute sm:flex-row sm:items-center sm:justify-between md:px-10">
          <p>&copy; {year} Jaikwang. All rights reserved.</p>
          <a href="#main-content" data-no-transition className="text-paper transition-colors hover:text-accent">
            Back to top &uarr;
          </a>
        </div>
      </footer>
    </section>
  );
};

export default Contact;
