import Image from "next/image";
import Link from "next/link";

import { urlFor } from "@/sanity/lib/image";
import type { ProjectListItem } from "@/sanity/lib/queries";

import { CategoryBadges } from "./CategoryBadges";

const STATUS_LABEL: Record<string, string> = {
  ongoing: "Ongoing",
  completed: "Completed",
  planned: "Planned",
};

export function ProjectCard({ project }: { project: ProjectListItem }) {
  return (
    <article className="group overflow-hidden rounded-xl border border-border bg-card transition-colors hover:border-secondary">
      <Link href={`/projects/${project.slug}`}>
        <div className="relative aspect-[4/3] overflow-hidden bg-muted">
          {project.mainImage ? (
            <Image
              src={urlFor(project.mainImage)
                .width(600)
                .height(450)
                .fit("crop")
                .url()}
              alt={project.mainImage.alt || project.title}
              fill
              sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : null}
          {project.status ? (
            <span className="absolute left-3 top-3 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
              {STATUS_LABEL[project.status] ?? project.status}
            </span>
          ) : null}
        </div>
      </Link>
      <div className="p-5">
        {project.categories?.length ? (
          <CategoryBadges categories={project.categories} />
        ) : null}
        <Link href={`/projects/${project.slug}`}>
          <h3 className="mt-3 text-lg font-semibold text-charcoal transition-colors group-hover:text-primary">
            {project.title}
          </h3>
        </Link>
        {project.summary ? (
          <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
            {project.summary}
          </p>
        ) : null}
        {project.location ? (
          <p className="mt-3 text-xs font-medium text-muted-foreground">
            📍 {project.location}
          </p>
        ) : null}
      </div>
    </article>
  );
}
