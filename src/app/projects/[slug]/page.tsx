"use client";

import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { getProjectBySlug } from "@/data/projects";
import Navigation from "@/components/Navigation";
import Link from "next/link";

export default function ProjectDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const project = getProjectBySlug(slug);

  if (!project) {
    return (
      <main>
        <Navigation />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4 text-slate-800 dark:text-slate-100">Project Not Found</h1>
            <p className="text-slate-600 dark:text-slate-400 mb-8">The project you`re looking for doesn`t exist.</p>
            <Link
              href="/#projects"
              className="glass-card px-6 py-3 rounded-xl font-semibold text-blue-600 dark:text-blue-400 hover:bg-blue-500/10 transition-all"
            >
              Back to Projects
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const isDeployed = project.link && project.link !== '#';

  return (
    <main>
      <Navigation />
      <section className="py-24 px-4 relative min-h-screen">
        <div className="container mx-auto max-w-5xl">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <button
              onClick={() => router.back()}
              className="glass-card px-4 py-2 rounded-xl font-medium text-blue-600 dark:text-blue-400 hover:bg-blue-500/10 transition-all flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back
            </button>
          </motion.div>

          {/* Project Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <div className="glass-card rounded-3xl p-8 md:p-12">
              <div className="mb-6">
                <span className="inline-block px-4 py-2 glass-card rounded-full text-sm font-semibold text-blue-600 dark:text-blue-400 mb-4">
                  {project.category === 'project' ? '📁 Project' : '🚀 Prototype'}
                </span>
              </div>

              <h1 className="text-5xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-blue-500 via-sky-500 to-blue-500 bg-clip-text text-transparent">
                {project.title}
              </h1>

              <p className="text-xl text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
                {project.longDescription || project.description}
              </p>

              {/* Project Image */}
              <div className="aspect-video bg-gradient-to-br from-blue-200/50 to-sky-200/50 dark:from-blue-900/30 dark:to-sky-900/30 rounded-2xl mb-8 flex items-center justify-center overflow-hidden">
                <span className="text-6xl opacity-50">🚀</span>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-3 mb-8">
                {project.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 glass-card rounded-full text-sm font-semibold text-blue-600 dark:text-blue-400 border border-blue-500/30"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4">
                {isDeployed ? (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass-card px-8 py-4 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-500 to-sky-500 hover:from-blue-600 hover:to-sky-600 transition-all duration-300 shadow-lg hover:shadow-xl glow-blue flex items-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    Visit Live Site
                  </a>
                ) : (
                  <div className="glass-card px-6 py-3 rounded-xl font-medium text-slate-600 dark:text-slate-400 border border-slate-500/30">
                    Not yet deployed
                  </div>
                )}
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass-card px-8 py-4 rounded-xl font-semibold text-blue-600 dark:text-blue-400 border-2 border-blue-500/50 dark:border-blue-400/50 hover:bg-blue-500/10 transition-all duration-300 flex items-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    View on GitHub
                  </a>
                )}
              </div>
            </div>
          </motion.div>

          {/* Project Details */}
          {(project.features || project.technologies) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid md:grid-cols-2 gap-8"
            >
              {project.features && (
                <div className="glass-card rounded-3xl p-8">
                  <h2 className="text-3xl font-bold mb-6 text-slate-800 dark:text-slate-100">Key Features</h2>
                  <ul className="space-y-4">
                    {project.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-sky-500 mt-2 flex-shrink-0" />
                        <span className="text-slate-600 dark:text-slate-400">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {project.technologies && (
                <div className="glass-card rounded-3xl p-8">
                  <h2 className="text-3xl font-bold mb-6 text-slate-800 dark:text-slate-100">Technologies Used</h2>
                  <div className="flex flex-wrap gap-3">
                    {project.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 glass-card rounded-xl text-sm font-semibold text-blue-600 dark:text-blue-400 border border-blue-500/30"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </div>
      </section>
    </main>
  );
}
