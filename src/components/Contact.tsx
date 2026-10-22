"use client";
import { motion } from "framer-motion";

const smoothEase = [0.22, 1, 0.36, 1] as const;

const sectionVariants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
      ease: smoothEase,
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: smoothEase },
  },
};

const Contact = () => {
  return (
    <section id="contact" className="relative px-4 py-18 sm:py-20 md:py-24">
      <div className="container mx-auto max-w-6xl px-4">
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div variants={itemVariants} className="mb-12 text-center sm:mb-14 md:mb-16">
            <h2 className="mb-3 bg-gradient-to-r from-blue-500 via-sky-500 to-blue-500 bg-clip-text text-3xl font-extrabold text-transparent sm:mb-4 sm:text-4xl md:text-5xl">
              Get In Touch
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-sky-500 mx-auto mb-6 rounded-full" />
            <p className="mx-auto max-w-2xl text-base text-slate-600 dark:text-slate-400 sm:text-lg">
              Have a project in mind or want to collaborate? Feel free to reach out!
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2 md:gap-12">
            <motion.div
              variants={itemVariants}
            >
              <h3 className="mb-6 text-2xl font-bold text-slate-800 dark:text-slate-100 sm:mb-8 sm:text-3xl">Contact Information</h3>
              <div className="space-y-4 sm:space-y-6">
                <motion.div
                  variants={itemVariants}
                  whileHover={{ x: 5 }}
                  className="flex items-center space-x-3 rounded-2xl glass-card p-4 sm:space-x-4"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl glass-card bg-gradient-to-br from-blue-500/20 to-sky-500/20 sm:h-14 sm:w-14">
                    <svg
                      className="w-7 h-7 text-blue-500 dark:text-blue-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-800 dark:text-slate-100 mb-1">Email</h4>
                    <a href="mailto:Worakij.W@gmail.com" className="text-slate-600 underline-offset-4 hover:text-accent hover:underline dark:text-slate-400">
                      Worakij.W@gmail.com
                    </a>
                  </div>
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  whileHover={{ x: 5 }}
                  className="flex items-center space-x-3 rounded-2xl glass-card p-4 sm:space-x-4"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl glass-card bg-gradient-to-br from-sky-500/20 to-blue-500/20 sm:h-14 sm:w-14">
                    <svg
                      className="w-7 h-7 text-sky-500 dark:text-sky-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-800 dark:text-slate-100 mb-1">Location</h4>
                    <p className="text-slate-600 dark:text-slate-400">Ladkrabang, Bangkok, Thailand</p>
                  </div>
                </motion.div>

                {/* Social Media Links */}
                <motion.div variants={itemVariants} className="pt-4 sm:pt-6">
                  <h4 className="mb-4 text-base font-semibold text-slate-800 dark:text-slate-100 sm:text-lg">Follow Me</h4>
                  <div className="flex space-x-4">
                    {/* GitHub */}
                    <motion.a
                      href="https://github.com/jaikwangg"
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex h-11 w-11 items-center justify-center rounded-xl glass-card text-slate-700 transition-all duration-300 hover:text-blue-500 dark:text-slate-300 dark:hover:text-blue-400 sm:h-12 sm:w-12"
                      aria-label="GitHub"
                    >
                      <svg
                        className="w-6 h-6"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                    </motion.a>

                    {/* Instagram */}
                    <motion.a
                      href="https://instagram.com/Worajai_"
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex h-11 w-11 items-center justify-center rounded-xl glass-card text-slate-700 transition-all duration-300 hover:text-sky-500 dark:text-slate-300 dark:hover:text-sky-400 sm:h-12 sm:w-12"
                      aria-label="Instagram"
                    >
                      <svg
                        className="w-6 h-6"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    </motion.a>
                  </div>
                </motion.div>

              </div>
            </motion.div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Contact;
