"use client";

import { motion } from "framer-motion";

const projects = [
  {
    title: "Project One",
    description: "A full-stack web application built with Next.js and TypeScript.",
    image: "/project1.jpg",
    tags: ["Next.js", "TypeScript", "Tailwind CSS"],
    link: "#"
  },
  {
    title: "Project Two",
    description: "An e-commerce platform with real-time inventory management.",
    image: "/project2.jpg",
    tags: ["React", "Node.js", "MongoDB"],
    link: "#"
  },
  {
    title: "Project Three",
    description: "A mobile-first responsive dashboard for data visualization.",
    image: "/project3.jpg",
    tags: ["React", "D3.js", "Firebase"],
    link: "#"
  }
];

const Projects = () => {
  return (
    <section id="projects" className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 text-black dark:text-white">My Projects</h2>
          <div className="w-20 h-1 bg-black dark:bg-white mx-auto mb-6"></div>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Here are some of my recent works. Each project is a unique piece of development.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative"
            >
              <div className="aspect-video border-2 border-black dark:border-white bg-gray-50 dark:bg-gray-800 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-gray-400 dark:text-gray-500">Project Image</span>
                </div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 dark:group-hover:bg-white/10 transition-all duration-300" />
              </div>
              
              <div className="mt-4">
                <h3 className="text-xl font-bold mb-2 text-black dark:text-white">{project.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-3 py-1 text-sm border border-black dark:border-white text-black dark:text-white"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href={project.link}
                  className="inline-block border-2 border-black dark:border-white text-black dark:text-white px-6 py-2 hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-all duration-300"
                >
                  View Project
                </motion.a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects; 