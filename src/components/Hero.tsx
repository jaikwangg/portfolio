"use client";

import { motion } from "framer-motion";

const proofPoints = [
  { label: "Based in", value: "Bangkok, Thailand" },
  { label: "Focus", value: "Product websites and full-stack apps" },
  { label: "Working style", value: "Clean UI, solid UX, reliable delivery" },
];

const socials = [
  {
    name: "GitHub",
    href: "https://github.com/jaikwangg",
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0C5.373 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.49 11.49 0 0 1 12 5.8c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.565 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12Z" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "https://instagram.com/worajai_",
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92C2.175 15.584 2.163 15.205 2.163 12c0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069Zm0-2.163c-3.259 0-3.667.014-4.947.072C2.858.272.436 2.69.236 7.052.177 8.333.163 8.741.163 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.839.014 15.43 0 12.172 0Zm0 5.838A6.162 6.162 0 1 0 18.325 12a6.162 6.162 0 0 0-6.162-6.162Zm0 10.162a4 4 0 1 1 4-4 4 4 0 0 1-4 4Zm6.406-11.845a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88Z" />
      </svg>
    ),
  },
];

const Hero = () => {
  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden px-4 pb-8 pt-20 md:pb-10 md:pt-28">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.12),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(14,165,233,0.1),_transparent_28%)]" />

      <div className="container relative z-10 mx-auto max-w-7xl">
        <div className="grid items-center gap-6 sm:gap-8 lg:gap-10 xl:gap-14 lg:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.95fr)]">
          <div className="max-w-3xl text-center lg:text-left">
            <p className="mb-4 inline-flex rounded-full border border-slate-200/80 bg-white/75 px-3.5 py-2 text-[11px] font-medium tracking-[0.18em] text-slate-600 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-950/50 dark:text-slate-300 sm:px-4 sm:text-sm">
              Full-stack developer based in Bangkok
            </p>

            <h1 className="mx-auto max-w-[10ch] text-[clamp(2.65rem,11vw,5.3rem)] font-semibold leading-[0.94] tracking-tight text-slate-900 dark:text-slate-50 lg:mx-0">
              Building modern web products with clarity, speed, and strong UX.
            </h1>

            <p className="mx-auto mt-5 max-w-xl text-[15px] leading-7 text-slate-600 dark:text-slate-300 sm:text-base md:text-lg md:leading-8 lg:mx-0 lg:max-w-2xl">
              I&apos;m Jaikwang, a full-stack developer focused on shipping clean interfaces,
              dependable product flows, and user experiences that feel intentional from the first click.
            </p>

            <motion.div
              initial={false}
              className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start"
            >
              <motion.a
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                href="#projects"
                className="inline-flex items-center justify-center rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/10 transition hover:bg-slate-800 dark:bg-blue-500 dark:hover:bg-blue-400"
              >
                View selected work
              </motion.a>
              <motion.a
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                href="#contact"
                className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white/80 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-white dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-200 dark:hover:border-slate-600"
              >
                Let&apos;s work together
              </motion.a>
            </motion.div>

            <motion.div
              initial={false}
              className="mt-7 grid gap-3 text-left sm:grid-cols-3"
            >
              {proofPoints.map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-slate-200/80 bg-white/70 p-4 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-950/45"
                >
                  <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">{item.label}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-800 dark:text-slate-100">
                    {item.value}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative mx-auto mt-2 w-full max-w-md lg:mt-0 lg:max-w-lg"
          >
            <div className="absolute inset-x-8 top-8 h-44 rounded-full bg-blue-400/15 blur-3xl dark:bg-blue-500/20 sm:h-52" />
            <div className="relative overflow-hidden rounded-[1.75rem] border border-slate-200/80 bg-white/80 p-4 shadow-[0_24px_60px_-24px_rgba(15,23,42,0.25)] backdrop-blur dark:border-slate-800 dark:bg-slate-950/60 sm:rounded-[2rem] sm:p-6">
              <div className="rounded-[1.35rem] border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-900 sm:rounded-[1.5rem] sm:p-7">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400 sm:text-sm">
                      Profile
                    </p>
                    <h2 className="mt-3 text-xl font-semibold text-slate-900 dark:text-slate-50 sm:text-3xl">
                      Jaikwang
                    </h2>
                    <p className="mt-1.5 text-sm text-slate-600 dark:text-slate-300 sm:mt-2 sm:text-base">
                      Full-stack Developer
                    </p>
                  </div>
                  <div className="shrink-0 rounded-full border border-blue-200 bg-blue-50 px-2.5 py-1 text-[11px] font-semibold text-blue-700 dark:border-blue-500/30 dark:bg-blue-500/10 dark:text-blue-300 sm:px-3 sm:text-xs">
                    Available
                  </div>
                </div>

                <div className="mt-6 space-y-3 sm:mt-8 sm:space-y-4">
                  <div className="border-b border-slate-200 pb-4 dark:border-slate-800">
                    <p className="text-xs uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400 sm:text-sm sm:normal-case sm:tracking-normal">What I care about</p>
                    <p className="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-200">
                      Product clarity, maintainable code, and interfaces that users can understand
                      immediately.
                    </p>
                  </div>
                  <div className="border-b border-slate-200 pb-4 dark:border-slate-800">
                    <p className="text-xs uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400 sm:text-sm sm:normal-case sm:tracking-normal">Primary tools</p>
                    <p className="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-200">
                      Next.js, React, TypeScript, Node.js, PostgreSQL, and modern UI systems.
                    </p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400 sm:text-sm sm:normal-case sm:tracking-normal">Links</p>
                    <div className="mt-3 flex items-center gap-2.5 sm:gap-3">
                      {socials.map((social) => (
                        <motion.a
                          key={social.name}
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ y: -2 }}
                          whileTap={{ scale: 0.98 }}
                          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 transition hover:border-blue-300 hover:text-blue-600 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200 dark:hover:border-blue-500/40 dark:hover:text-blue-300 sm:h-11 sm:w-11"
                          aria-label={social.name}
                        >
                          {social.icon}
                        </motion.a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
