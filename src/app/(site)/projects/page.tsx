import type { Metadata } from "next";

import { ProjectCard } from "@/components/ui/ProjectCard";
import { getAllProjects } from "@/sanity/lib/queries";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Explore the community health projects run by Society for Good Health.",
};

export default async function ProjectsPage() {
  const projects = await getAllProjects();

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="text-3xl font-bold text-charcoal">Our Projects</h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">
        A look at the work we&apos;re doing on the ground, community by
        community.
      </p>

      {projects.length > 0 ? (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project._id} project={project} />
          ))}
        </div>
      ) : (
        <p className="mt-10 text-muted-foreground">
          No projects published yet — check back soon.
        </p>
      )}
    </div>
  );
}
