import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PostCard } from "@/components/ui/PostCard";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { getAllCategories, getCategoryWithContent } from "@/sanity/lib/queries";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const categories = await getAllCategories();
  return categories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const { category } = await getCategoryWithContent(slug);

  if (!category) return { title: "Category Not Found" };

  return {
    title: category.title,
    description: category.description,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const { category, posts, projects } = await getCategoryWithContent(slug);

  if (!category) notFound();

  const hasContent = posts.length > 0 || projects.length > 0;

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <span className="rounded-full bg-secondary/10 px-3 py-1 text-xs font-medium text-secondary">
        Category
      </span>
      <h1 className="mt-4 text-3xl font-bold text-charcoal">
        {category.title}
      </h1>
      {category.description ? (
        <p className="mt-3 max-w-2xl text-muted-foreground">
          {category.description}
        </p>
      ) : null}

      {projects.length > 0 ? (
        <section className="mt-12">
          <h2 className="text-xl font-semibold text-charcoal">Projects</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))}
          </div>
        </section>
      ) : null}

      {posts.length > 0 ? (
        <section className="mt-12">
          <h2 className="text-xl font-semibold text-charcoal">Blog Posts</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
        </section>
      ) : null}

      {!hasContent ? (
        <p className="mt-10 text-muted-foreground">
          Nothing tagged with this category yet.
        </p>
      ) : null}
    </div>
  );
}
