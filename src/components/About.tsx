"use client";

import { motion } from "framer-motion";

const skills = [
  { name: "JavaScript", icon: "⚡", category: "Frontend" },
  { name: "TypeScript", icon: "📘", category: "Frontend" },
  { name: "React", icon: "⚛️", category: "Frontend" },
  { name: "Next.js", icon: "▲", category: "Full Stack" },
  { name: "Node.js", icon: "🟢", category: "Backend" },
  { name: "Tailwind CSS", icon: "🎨", category: "Frontend" },
  { name: "MongoDB", icon: "🍃", category: "Database" },
  { name: "PostgreSQL", icon: "🐘", category: "Database" },
  { name: "Git", icon: "🔀", category: "Tools" },
  { name: "Docker", icon: "🐳", category: "DevOps" },
];

const techStack = [
  { name: "Frontend", technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS"] },
  { name: "Backend", technologies: ["Node.js", "Express", "REST APIs", "GraphQL"] },
  { name: "Database", technologies: ["MongoDB", "PostgreSQL", "Redis"] },
  { name: "Tools", technologies: ["Git", "Docker", "AWS", "CI/CD"] },
];

const About = () => {
  return (
    <section id="about" className="py-24 px-4 relative">
      <div className="container mx-auto px-4 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-16">
            <h2 className="text-5xl font-extrabold mb-4 bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              About Me
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-pink-500 to-purple-500 mx-auto mb-6 rounded-full" />
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative">
                {/* Glowing background */}
                <div className="absolute inset-0 bg-gradient-to-br from-pink-400/30 to-purple-400/30 rounded-3xl blur-2xl" />
                
                {/* Portrait container */}
                <div className="relative glass-card rounded-3xl p-8 aspect-square flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-40 h-40 mx-auto mb-6 rounded-full bg-gradient-to-br from-pink-400 to-purple-400 flex items-center justify-center text-5xl font-bold text-white shadow-xl glow-pink">
                      JK
                    </div>
                    <p className="text-slate-600 dark:text-slate-400">Professional Portrait</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl font-bold mb-6 text-slate-800 dark:text-slate-100">
                Full Stack Developer
              </h3>
              <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed text-lg">
                I'm a passionate developer with a keen eye for design and a love for creating
                seamless user experiences. With expertise in both front-end and back-end
                development, I bring ideas to life through clean, efficient code and
                intuitive interfaces.
              </p>
              <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed text-lg">
                When I'm not coding, you can find me exploring new technologies,
                contributing to open-source projects, or sharing my knowledge through
                technical writing.
              </p>
            </motion.div>
          </div>

          {/* Tech Stack Timeline Visualization */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h4 className="text-3xl font-bold mb-8 text-center text-slate-800 dark:text-slate-100">
              Tech Stack
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {techStack.map((stack, index) => (
                <motion.div
                  key={stack.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                  className="glass-card rounded-2xl p-6 relative overflow-hidden group"
                >
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pink-500 to-purple-500" />
                  <h5 className="text-xl font-bold mb-4 text-slate-800 dark:text-slate-100">
                    {stack.name}
                  </h5>
                  <div className="space-y-2">
                    {stack.technologies.map((tech, techIndex) => (
                      <motion.div
                        key={tech}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: techIndex * 0.1 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-2 text-slate-600 dark:text-slate-400"
                      >
                        <div className="w-2 h-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-500" />
                        <span className="text-sm">{tech}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Icon-based Skills Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            viewport={{ once: true }}
          >
            <h4 className="text-3xl font-bold mb-8 text-center text-slate-800 dark:text-slate-100">
              Skills & Technologies
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.1, y: -5 }}
                  className="glass-card rounded-2xl p-6 text-center group cursor-pointer"
                >
                  <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                    {skill.icon}
                  </div>
                  <h5 className="font-semibold text-slate-800 dark:text-slate-100 mb-1">
                    {skill.name}
                  </h5>
                  <p className="text-xs text-purple-600 dark:text-purple-400">
                    {skill.category}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About; 