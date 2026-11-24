import Image from "next/image";
import Link from "next/link";

import { Testimonial } from "@/components/ui/Testimonial";
import { FeatureBlock } from "@/components/ui/FeatureBlock";
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
      <section className="relative overflow-hidden bg-primary">
        <Image
          src="/brand/oyo.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-primary/75" />

        <div className="relative z-10 mx-auto max-w-6xl px-6 py-24 text-center">
          <h1 className="mx-auto max-w-2xl text-4xl font-bold text-white sm:text-5xl">
            {settings?.title ?? "Society for Good Health"}
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-xl font-serif font-bold text-white">
            {settings?.description ??
              "Working alongside communities to build lasting, healthier futures."}
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href="/projects"
              className="rounded-lg bg-charcoal px-7 py-3 text-xl font-bold text-charcoal-foreground transition hover:brightness-110"
            >
              See Our Work
            </Link>
            <Link
              href="/blog"
              className="rounded-lg border-2 border-white/75 px-7 py-3 text-xl font-bold text-white transition-colors hover:border-white hover:bg-white/10"
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
              className="text-sm font-medium text-secondary hover:underline"
            >
              View all →
            </Link>
          </div>{" "}
          <div className="mt-8 grid gap-5 lg:grid-cols-2">
            {latestProjects.map((project, i) => (
              <FeatureBlock
                key={project._id}
                href={`/projects/${project.slug}`}
                eyebrow={project.categories?.[0]?.title ?? "Project"}
                title={project.title}
                description={project.summary}
                image={project.mainImage}
                colorIndex={i as 0 | 1 | 2}
                large={i === 0}
              />
            ))}
          </div>
        </section>
      ) : null}

      {settings?.testimonial ? (
        <Testimonial testimonial={settings.testimonial} />
      ) : null}

      {latestPosts.length > 0 ? (
        <section className="mx-auto max-w-6xl px-6 py-16">
          <span className="text-sm font-semibold uppercase tracking-wide text-secondary">
            From the Blog
          </span>
          <div className="mt-1 flex items-end justify-between">
            <h2 className="text-2xl font-bold text-charcoal">
              Latest from the Blog
            </h2>
            <Link
              href="/blog"
              className="text-sm font-medium text-secondary hover:underline"
            >
              View all →
            </Link>
          </div>
          <div className="mt-8 grid gap-5 lg:grid-cols-2">
            {latestPosts.map((post, i) => (
              <FeatureBlock
                key={post._id}
                href={`/blog/${post.slug}`}
                eyebrow={post.categories?.[0]?.title ?? "Article"}
                title={post.title}
                description={post.excerpt}
                image={post.mainImage}
                colorIndex={i as 0 | 1 | 2}
                large={i === 0}
              />
            ))}
          </div>
        </section>
      ) : null}
    </>
  );
}
