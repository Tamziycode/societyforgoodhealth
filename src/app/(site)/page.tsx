import Link from "next/link";

import { PostCard } from "@/components/ui/PostCard";
import { ProjectCard } from "@/components/ui/ProjectCard";
import {
  getAllPosts,
  getAllProjects,
  getSiteSettings,
} from "@/sanity/lib/queries";

export default async function Home() {
  const [settings, posts, projects] = await Promise.all([
    getSiteSettings(),
    getAllPosts(),
    getAllProjects(),
  ]);

  const latestPosts = posts.slice(0, 3);
  const latestProjects = projects.slice(0, 3);

  return (
    <>
      <section className="bg-charcoal text-charcoal-foreground">
        <div className="mx-auto max-w-6xl px-6 py-24 text-center">
          <h1 className="mx-auto max-w-2xl text-4xl font-bold sm:text-5xl">
            {settings?.title ?? "Society for Good Health"}
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-charcoal-foreground/70">
            {settings?.description ??
              "Working alongside communities to build lasting, healthier futures."}
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href="/projects"
              className="rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              See Our Work
            </Link>
            <Link
              href="/blog"
              className="rounded-lg border border-secondary/40 px-6 py-3 font-semibold text-charcoal-foreground transition-colors hover:border-secondary"
            >
              Read Our Blog
            </Link>
          </div>
        </div>
      </section>

      {latestProjects.length > 0 ? (
        <section className="mx-auto max-w-6xl px-6 py-16">
          <span className="text-sm font-semibold uppercase tracking-wide text-secondary">
            Our Impact
          </span>
          <div className="mt-1 flex items-end justify-between">
            <h2 className="text-2xl font-bold text-charcoal">
              Featured Projects
            </h2>
            <Link
              href="/projects"
              className="text-sm font-medium text-secondary hover:text-primary"
            >
              View all →
            </Link>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {latestProjects.map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))}
          </div>
        </section>
      ) : null}

      {latestPosts.length > 0 ? (
        <section className="mx-auto max-w-6xl px-6 py-16">
          <span className="text-sm font-semibold uppercase tracking-wide text-primary">
            From the Blog
          </span>
          <div className="mt-1 flex items-end justify-between">
            <h2 className="text-2xl font-bold text-charcoal">
              Latest from the Blog
            </h2>
            <Link
              href="/blog"
              className="text-sm font-medium text-secondary hover:text-primary"
            >
              View all →
            </Link>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {latestPosts.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
        </section>
      ) : null}
    </>
  );
}
