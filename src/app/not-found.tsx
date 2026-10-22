import type { Metadata } from "next";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import { SplitReveal } from "@/components/motion";

export const metadata: Metadata = {
  title: "Page not found | Jaikwang",
};

// Exported as out/404.html by the static export.
// The global :focus-visible rule sets a 2px radius; keep pills round when focused.
const PILL = { borderRadius: 9999 } as const;

export default function NotFound() {
  return (
    <>
      <Navigation />
      <main
        id="main-content"
        tabIndex={-1}
        className="flex min-h-screen flex-col justify-between bg-ink px-4 pb-10 pt-28 text-paper sm:px-8 md:pt-36"
      >
        <div>
          <p className="border-b border-line pb-4 text-xs font-medium uppercase tracking-[0.2em] text-mute">
            (Error 404)
          </p>
          <h1 className="mt-6 font-display uppercase">
            <SplitReveal
              text="404"
              trigger="load"
              split="chars"
              stagger={0.08}
              className="block text-[clamp(8rem,40vw,24rem)] leading-[0.9] text-accent"
            />
            <SplitReveal
              text="Off the track"
              trigger="load"
              delay={0.25}
              className="mt-2 block text-display-md"
            />
          </h1>
          <p className="mt-8 max-w-md text-lg leading-relaxed text-mute">
            This page doesn&apos;t exist or has moved. Head back to the start, or look through the projects.
          </p>
        </div>

        <nav aria-label="Recovery links" className="mt-12 flex flex-wrap gap-3">
          <Link
            href="/"
            data-cursor-label="Home"
            className="inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 font-semibold text-on-accent transition-colors hover:bg-paper"
            style={PILL}
          >
            <span aria-hidden="true">&larr;</span> Back home
          </Link>
          <Link
            href="/projects"
            className="inline-flex items-center rounded-full border border-line px-7 py-3.5 font-semibold transition-colors hover:border-paper hover:bg-paper hover:text-ink"
            style={PILL}
          >
            All projects
          </Link>
        </nav>
      </main>
    </>
  );
}
