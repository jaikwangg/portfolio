"use client";

import { motion } from "framer-motion";

interface Project {
  title: string;
  description: string;
  image: string;
  tags: string[];
  link: string;
}

interface SectionProps {
  title: string;
  description: string;
  projects: Project[];
}


const projects = [
  {
    title: "Fortoon",
    description: "A full-stack web application built with Next.js and TypeScript.",
    image: "/project1.jpg",
    tags: ["Next.js", "TypeScript", "Tailwind CSS"],
    link: "#"
  },
  {
    title: "",
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

const hackathonPrototypes = [
  {
    title: "ZK-VoteChain",
    description: "A zero-knowledge voting prototype for transparent yet private elections.",
    image: "/hackathon1.jpg",
    tags: ["ZK-SNARK", "Ethereum", "Next.js"],
    link: "#"
  },
  {
    title: "baan-un-jai-planner",
    description: "A disaster relief fund tracker ensuring accountability with blockchain.",
    image: "/hackathon2.jpg",
    tags: ["Solidity", "IPFS", "Tailwind"],
    link: "#"
  },
  {
    title: "aun-jai-care-connect",
    description: "A disaster relief fund tracker ensuring accountability with blockchain.",
    image: "/hackathon2.jpg",
    tags: ["Solidity", "IPFS", "Tailwind"],
    link: "#"
  },
  {
    title: "temple-guide",
    description: "A disaster relief fund tracker ensuring accountability with blockchain.",
    image: "/hackathon2.jpg",
    tags: ["Solidity", "IPFS", "Tailwind"],
    link: "https://jaikwangg.github.io/temple-guide/"
  }
];

const Section = ({ title, description, projects }: SectionProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
    viewport={{ once: true }}
    className="mb-16"
  >
    <h2 className="text-5xl font-extrabold mb-4 text-center bg-gradient-to-r from-blue-500 via-sky-500 to-blue-500 bg-clip-text text-transparent">
      {title}
    </h2>
    <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-sky-500 mx-auto mb-6 rounded-full" />
    <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-center mb-12 text-lg">{description}</p>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {projects.map((project, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          viewport={{ once: true }}
          whileHover={{ y: -8, scale: 1.02 }}
          className="glass-card rounded-3xl overflow-hidden group cursor-pointer transition-all duration-300"
        >
          <div className="aspect-video bg-gradient-to-br from-blue-200/50 to-sky-200/50 dark:from-blue-900/30 dark:to-sky-900/30 relative overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-4xl opacity-50">🚀</span>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute bottom-4 left-4 right-4 transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
              <span className="text-white font-semibold">View Details →</span>
            </div>
          </div>

          <div className="p-6">
            <h3 className="text-2xl font-bold mb-3 text-slate-800 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {project.title}
            </h3>
            <p className="text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">{project.description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tags.map((tag, tagIndex) => (
                <span
                  key={tagIndex}
                  className="px-3 py-1.5 text-xs font-semibold rounded-full glass-card text-blue-600 dark:text-blue-400 border border-blue-500/30"
                >
                  {tag}
                </span>
              ))}
            </div>
            <a
              href={project.link}
              className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-sky-500 dark:hover:text-sky-400 transition-colors group/link"
            >
              View Project
              <motion.span
                className="inline-block"
                initial={{ x: 0 }}
                whileHover={{ x: 4 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                →
              </motion.span>
            </a>
          </div>
        </motion.div>
      ))}
    </div>
  </motion.div>
);

const Projects = () => {
  return (
    <section id="projects" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-7xl relative z-10">
        <Section
          title="My Projects"
          description="Here are some of my recent works. Each project is a unique piece of development."
          projects={projects}
        />
        <Section
          title="Prototype Hackathon"
          description="Innovative prototypes created during hackathons to solve real-world challenges with emerging tech."
          projects={hackathonPrototypes}
        />
      </div>
    </section>
  );
};

export default Projects;
