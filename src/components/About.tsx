"use client";

import { motion } from "framer-motion";

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
  {
    name: "React / Next.js",
    note: "For fast product sites, dashboards, and modern app flows with good structure.",
  },
  {
    name: "TypeScript",
    note: "For safer codebases, clearer contracts, and easier long-term maintenance.",
  },
  {
    name: "Node.js",
    note: "For backend logic, integrations, and APIs that support real product workflows.",
  },
  {
    name: "PostgreSQL / MongoDB",
    note: "For structured and document-driven data models depending on the project needs.",
  },
];

const About = () => {
  return (
    <section id="about" className="relative px-4 py-24">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-blue-600 dark:text-blue-300">
              About
            </p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight text-slate-900 dark:text-slate-50 md:text-5xl">
              I like building products that are clear, reliable, and pleasant to use.
            </h2>
            <p className="mt-6 text-lg leading-8 text-slate-600 dark:text-slate-300">
              My work sits between product thinking, interface design, and engineering. I enjoy
              turning ideas into experiences that look intentional, feel smooth, and hold up in
              real use.
            </p>
          </div>

          <div className="mt-16 grid gap-8 lg:grid-cols-[1fr_1.1fr]">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              viewport={{ once: true }}
              className="rounded-[2rem] border border-slate-200/80 bg-white/75 p-8 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-950/50"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">
                Working approach
              </p>
              <div className="mt-8 space-y-8">
                {capabilities.map((item) => (
                  <div key={item.title} className="border-b border-slate-200 pb-6 last:border-b-0 last:pb-0 dark:border-slate-800">
                    <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-base leading-7 text-slate-600 dark:text-slate-300">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              viewport={{ once: true }}
              className="rounded-[2rem] border border-slate-200/80 bg-slate-950 p-8 text-slate-50 shadow-[0_24px_60px_-28px_rgba(15,23,42,0.5)] dark:border-slate-800"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-blue-300">
                Core stack
              </p>
              <div className="mt-8 space-y-5">
                {techStack.map((item) => (
                  <div
                    key={item.name}
                    className="rounded-2xl border border-white/10 bg-white/5 p-5"
                  >
                    <h3 className="text-xl font-semibold text-white">{item.name}</h3>
                    <p className="mt-2 text-sm leading-7 text-slate-300">{item.note}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 rounded-2xl border border-blue-400/20 bg-blue-400/10 p-5">
                <p className="text-sm font-medium uppercase tracking-[0.18em] text-blue-200">
                  What I aim to deliver
                </p>
                <p className="mt-3 text-sm leading-7 text-slate-200">
                  A product that not only looks good in screenshots, but also feels dependable for
                  the people who use it every day.
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
