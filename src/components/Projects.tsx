"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { allProjects, Project } from "@/data/projects";

const smoothEase = [0.22, 1, 0.36, 1] as const;

const sectionVariants = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
      ease: smoothEase,
      staggerChildren: 0.08,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 26, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: smoothEase },
  },
};

interface SectionProps {
  title: string;
  description: string;
  projects: Project[];
}

const projects = allProjects.filter(p => p.category === 'project');
const hackathonPrototypes = allProjects.filter(p => p.category === 'prototype');

const Section = ({ title, description, projects }: SectionProps) => (
  <motion.div
    variants={sectionVariants}
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, amount: 0.18 }}
    className="mb-12 sm:mb-14 md:mb-16"
  >
    <motion.h2
      variants={cardVariants}
      className="mb-3 text-center text-3xl font-extrabold text-transparent bg-gradient-to-r from-blue-500 via-sky-500 to-blue-500 bg-clip-text sm:mb-4 sm:text-4xl md:text-5xl"
    >
      {title}
    </motion.h2>
    <motion.div
      variants={cardVariants}
      className="w-24 h-1 bg-gradient-to-r from-blue-500 to-sky-500 mx-auto mb-6 rounded-full"
    />
    <motion.p
      variants={cardVariants}
      className="mx-auto mb-8 max-w-2xl text-center text-base text-slate-600 dark:text-slate-400 sm:mb-10 sm:text-lg md:mb-12"
    >
      {description}
    </motion.p>

    <div className="grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
      {projects.map((project, index) => (
        <motion.div
          key={index}
          variants={cardVariants}
          whileHover={{ y: -8, scale: 1.02 }}
          className="glass-card group cursor-pointer overflow-hidden rounded-[1.5rem] transition-all duration-300 sm:rounded-3xl"
        >
          {project.link && project.link !== '#' ? (
            <a href={project.link} target="_blank" rel="noopener noreferrer" className="block">
              <div className="aspect-video bg-gradient-to-br from-blue-200/50 to-sky-200/50 dark:from-blue-900/30 dark:to-sky-900/30 relative overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover"
                  loading="lazy"
                  placeholder="blur"
                  blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-4 left-4 right-4 transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <span className="text-white font-semibold">Visit Live Site →</span>
                </div>
              </div>
            </a>
          ) : (
            <Link href={`/projects/${project.id}`}>
              <div className="aspect-video bg-gradient-to-br from-blue-200/50 to-sky-200/50 dark:from-blue-900/30 dark:to-sky-900/30 relative overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover"
                  loading="lazy"
                  placeholder="blur"
                  blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-4 left-4 right-4 transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <span className="text-white font-semibold">View Details →</span>
                </div>
              </div>
            </Link>
          )}

          <div className="p-5 sm:p-6">
            <h3 className="mb-2.5 text-xl font-bold text-slate-800 transition-colors group-hover:text-blue-600 dark:text-slate-100 dark:group-hover:text-blue-400 sm:mb-3 sm:text-2xl">
              {project.title}
            </h3>
            <p className="mb-4 text-sm leading-7 text-slate-600 dark:text-slate-400 sm:text-base">{project.description}</p>
            <div className="mb-4 flex flex-wrap gap-2">
              {project.tags.map((tag, tagIndex) => (
                <span
                  key={tagIndex}
                  className="px-3 py-1.5 text-xs font-semibold rounded-full glass-card text-blue-600 dark:text-blue-400 border border-blue-500/30"
                >
                  {tag}
                </span>
              ))}
            </div>
            {project.link && project.link !== '#' ? (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
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
            ) : (
              <Link
                href={`/projects/${project.id}`}
                className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-sky-500 dark:hover:text-sky-400 transition-colors group/link"
              >
                View Details
                <motion.span
                  className="inline-block"
                  initial={{ x: 0 }}
                  whileHover={{ x: 4 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  →
                </motion.span>
              </Link>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  </motion.div>
);

const Projects = () => {
  return (
    <section id="projects" className="relative px-4 py-18 sm:py-20 md:py-24">
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
