import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import { CategoryBadges } from "@/components/ui/CategoryBadges";
import { CustomPortableText } from "@/components/blocks/PortableText";
import { urlFor } from "@/sanity/lib/image";
import { getAllPosts, getPostBySlug } from "@/sanity/lib/queries";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) return { title: "Post Not Found" };

  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) notFound();

  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
      {post.categories?.length ? (
        <div className="mb-4">
          <CategoryBadges categories={post.categories} />
        </div>
      ) : null}

      <h1 className="text-4xl font-bold text-charcoal">{post.title}</h1>

      <div className="mt-4 flex items-center gap-3 text-sm text-muted-foreground">
        {post.author ? <span>{post.author}</span> : null}
        {post.author ? <span aria-hidden="true">·</span> : null}
        <time dateTime={post.publishedAt}>
          {new Date(post.publishedAt).toLocaleDateString(undefined, {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>
      </div>

      {post.mainImage ? (
        <div className="relative mt-8 aspect-video overflow-hidden rounded-xl">
          <Image
            src={urlFor(post.mainImage)
              .width(1400)
              .height(788)
              .fit("crop")
              .url()}
            alt={post.mainImage.alt || post.title}
            fill
            sizes="(min-width: 768px) 700px, 100vw"
            className="object-cover"
            priority
          />
        </div>
      ) : null}

      <div className="mt-10">
        <CustomPortableText value={post.body} />
      </div>
    </article>
  );
}
