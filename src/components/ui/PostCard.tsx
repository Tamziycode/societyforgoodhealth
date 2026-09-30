import Image from "next/image";
import Link from "next/link";

import { urlFor } from "@/sanity/lib/image";
import type { PostListItem } from "@/sanity/lib/queries";

import { CategoryBadges } from "./CategoryBadges";

export function PostCard({ post }: { post: PostListItem }) {
  return (
    <article className="group overflow-hidden shape-card border border-border bg-card transition-colors hover:border-secondary">
      <Link href={`/blog/${post.slug}`}>
        <div className="relative aspect-[4/3] overflow-hidden bg-muted">
          {post.mainImage ? (
            <Image
              src={urlFor(post.mainImage)
                .width(600)
                .height(450)
                .fit("crop")
                .url()}
              alt={post.mainImage.alt || post.title}
              fill
              sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : null}
        </div>
      </Link>
      <div className="p-5">
        {post.categories?.length ? (
          <CategoryBadges categories={post.categories} />
        ) : null}
        <Link href={`/blog/${post.slug}`}>
          <h3 className="mt-3 text-lg font-semibold text-charcoal transition-colors group-hover:text-secondary">
            {post.title}
          </h3>
        </Link>
        {post.excerpt ? (
          <p className="mt-2 line-clamp-2 text-sm font-serif text-muted-foreground">
            {post.excerpt}
          </p>
        ) : null}
        <time
          dateTime={post.publishedAt}
          className="mt-4 block text-xs text-muted-foreground"
        >
          {new Date(post.publishedAt).toLocaleDateString(undefined, {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>
      </div>
    </article>
  );
}
