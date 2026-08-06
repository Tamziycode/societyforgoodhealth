import Link from "next/link";

import type { CategoryRef } from "@/sanity/lib/queries";

export function CategoryBadges({ categories }: { categories: CategoryRef[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => (
        <Link
          key={category._id}
          href={`/category/${category.slug}`}
          className="rounded-full bg-secondary/10 px-3 py-1 text-xs font-medium text-secondary transition-colors hover:bg-secondary hover:text-secondary-foreground"
        >
          {category.title}
        </Link>
      ))}
    </div>
  );
}
