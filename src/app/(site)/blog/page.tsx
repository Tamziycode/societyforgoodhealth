import type { Metadata } from "next";

import { PostCard } from "@/components/ui/PostCard";
import { getAllPosts } from "@/sanity/lib/queries";

export const metadata: Metadata = {
  title: "Blog",
  description: "News, stories, and updates from Society for Good Health.",
};

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="text-3xl font-bold text-charcoal">Blog</h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">
        News, stories, and updates from our work in the community.
      </p>

      {posts.length > 0 ? (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      ) : (
        <p className="mt-10 text-muted-foreground">
          No posts published yet — check back soon.
        </p>
      )}
    </div>
  );
}
