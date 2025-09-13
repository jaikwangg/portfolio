"use client";

import { motion } from "framer-motion";
import Image from 'next/image';

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

const hackathonPrototypes = [
  {
    title: "ZK-VoteChain",
    description: "A zero-knowledge voting prototype for transparent yet private elections.",
    image: "/hackathon1.jpg",
    tags: ["ZK-SNARK", "Ethereum", "Next.js"],
    link: "#"
  },
  {
    title: "AidChain",
    description: "A disaster relief fund tracker ensuring accountability with blockchain.",
    image: "/hackathon2.jpg",
    tags: ["Solidity", "IPFS", "Tailwind"],
    link: "#"
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
    <h2 className="text-4xl font-extrabold mb-4 text-black dark:text-white text-center">{title}</h2>
    <div className="w-20 h-1 bg-black dark:bg-white mx-auto mb-6" />
    <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-center mb-10">{description}</p>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
      {projects.map((project, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          viewport={{ once: true }}
          className="bg-white dark:bg-gray-800 shadow-lg rounded-xl overflow-hidden transition hover:scale-[1.01]"
        >
          <div className="aspect-video bg-gray-100 dark:bg-gray-700 relative">
          <Image
  src={project.image}
  alt={project.title}
  layout="fill"
  objectFit="cover"
/>

            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 dark:group-hover:bg-white/10 transition-all duration-300" />
          </div>

          <div className="p-6">
            <h3 className="text-2xl font-semibold mb-2 text-black dark:text-white">{project.title}</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">{project.description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tags.map((tag, tagIndex) => (
                <span
                  key={tagIndex}
                  className="px-3 py-1 text-xs font-medium rounded-full bg-gray-200 dark:bg-gray-700 text-black dark:text-white"
                >
                  {tag}
                </span>
              ))}
            </div>
            <a
              href={project.link}
              className="inline-block mt-2 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline"
            >
              View Project →
            </a>
          </div>
        </motion.div>
      ))}
    </div>
  </motion.div>
);

const Projects = () => {
  return (
    <section id="projects" className="py-24 px-4 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto max-w-7xl">
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
