"use client";

import { motion } from "framer-motion";

const skills = [
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "Tailwind CSS",
  "MongoDB",
  "PostgreSQL",
  "Git",
  "Docker",
];

const About = () => {
  return (
    <section id="about" className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-black dark:text-white">About Me</h2>
            <div className="w-20 h-1 bg-black dark:bg-white mx-auto mb-6"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="aspect-square border-2 border-black dark:border-white bg-gray-50 dark:bg-gray-800 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-gray-400 dark:text-gray-500">Profile Image</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold mb-4 text-black dark:text-white">Full Stack Developer</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                I`m a passionate developer with a keen eye for design and a love for creating
                seamless user experiences. With expertise in both front-end and back-end
                development, I bring ideas to life through clean, efficient code and
                intuitive interfaces.
              </p>
              <p className="text-gray-600 dark:text-gray-400 mb-8">
                When I`m not coding, you can find me exploring new technologies,
                contributing to open-source projects, or sharing my knowledge through
                technical writing.
              </p>

              <div>
                <h4 className="text-lg font-semibold mb-4 text-black dark:text-white">Skills</h4>
                <div className="flex flex-wrap gap-3">
                  {skills.map((skill, index) => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="px-4 py-2 border border-black dark:border-white text-black dark:text-white hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-all duration-300"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About; 