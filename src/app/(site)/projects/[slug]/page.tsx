import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CategoryBadges } from "@/components/ui/CategoryBadges";
import { CustomPortableText } from "@/components/blocks/PortableText";
import { ProjectCarousel } from "@/components/layout/ProjectCarousel";
import { getAllProjects, getProjectBySlug } from "@/sanity/lib/queries";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

const STATUS_LABEL: Record<string, string> = {
  ongoing: "Ongoing",
  completed: "Completed",
  planned: "Planned",
};

export async function generateStaticParams() {
  const projects = await getAllProjects();
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) return { title: "Project Not Found" };

  return {
    title: project.title,
    description: project.summary,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) notFound();

  const galleryImages =
    project.gallery && project.gallery.length > 0
      ? project.gallery
      : project.mainImage
        ? [project.mainImage]
        : [];

  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
      <div className="flex flex-wrap items-center gap-3">
        {project.status ? (
          <span className="rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">
            {STATUS_LABEL[project.status] ?? project.status}
          </span>
        ) : null}
        {project.categories?.length ? (
          <CategoryBadges categories={project.categories} />
        ) : null}
      </div>

      <h1 className="mt-4 text-4xl font-bold text-charcoal">{project.title}</h1>

      {project.location ? (
        <p className="mt-3 text-sm font-medium text-muted-foreground">
          📍 {project.location}
        </p>
      ) : null}

      {project.summary ? (
        <p className="mt-4 text-lg text-foreground/80">{project.summary}</p>
      ) : null}

      {galleryImages.length > 0 ? (
        <div className="mt-8">
          <ProjectCarousel images={galleryImages} altFallback={project.title} />
        </div>
      ) : null}

      {project.body ? (
        <div className="mt-10">
          <CustomPortableText value={project.body} />
        </div>
      ) : null}
    </article>
  );
}
