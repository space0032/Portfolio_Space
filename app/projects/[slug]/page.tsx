import { projects } from "@/lib/projects";
import ProjectDetailClient from "./ProjectDetailClient";
import type { Metadata } from "next";

// Generate static params for all projects
export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

// Generate metadata for each project page
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return {
      title: "Project Not Found | Antariksh Mankar",
    };
  }

  return {
    title: `${project.title} | Antariksh Mankar`,
    description: project.description,
    openGraph: {
      title: `${project.title} — ${project.tagline}`,
      description: project.description,
      type: "article",
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <ProjectDetailClient slug={slug} />;
}
