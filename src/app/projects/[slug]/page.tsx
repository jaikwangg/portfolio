import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProjectBySlug, allProjects } from "@/data/projects";
import ProjectDetailClient from "./ProjectDetailClient";

// Static export: only the slugs below exist; anything else is the 404 page.
export const dynamicParams = false;

export function generateStaticParams() {
  return allProjects.map((project) => ({
    slug: project.id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Project not found | Jaikwang" };
  return {
    title: `${project.title} | Jaikwang`,
    description: project.description,
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const index = allProjects.findIndex((p) => p.id === project.id);
  const next = allProjects[(index + 1) % allProjects.length];

  return (
    <ProjectDetailClient
      project={project}
      next={next}
      index={index}
      total={allProjects.length}
    />
  );
}
