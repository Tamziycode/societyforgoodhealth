import { PortableText, type PortableTextComponents } from "@portabletext/react";
import Image from "next/image";
import Link from "next/link";

import { urlFor } from "@/sanity/lib/image";
import type { SanityImage } from "@/sanity/lib/queries";

const components: PortableTextComponents = {
  types: {
    image: ({ value }: { value: SanityImage }) => {
      if (!value?.asset) return null;
      return (
        <figure className="my-8">
          <div className="relative aspect-video overflow-hidden rounded-lg">
            <Image
              src={urlFor(value).width(1200).fit("max").url()}
              alt={value.alt || ""}
              fill
              sizes="(min-width: 768px) 700px, 100vw"
              className="object-cover"
            />
          </div>
          {value.alt ? (
            <figcaption className="mt-2 text-center text-sm text-muted-foreground">
              {value.alt}
            </figcaption>
          ) : null}
        </figure>
      );
    },
  },
  block: {
    h2: ({ children }) => (
      <h2 className="mb-4 mt-10 text-2xl font-semibold text-charcoal">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mb-3 mt-8 text-xl font-semibold text-charcoal">
        {children}
      </h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-6 border-l-4 border-primary pl-4 italic text-foreground/80">
        {children}
      </blockquote>
    ),
    normal: ({ children }) => (
      <p className="mb-4 leading-relaxed text-foreground/90">{children}</p>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mb-4 ml-6 list-disc space-y-1">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="mb-4 ml-6 list-decimal space-y-1">{children}</ol>
    ),
  },
  marks: {
    link: ({ value, children }) => {
      const href = value?.href || "";
      const isExternal = href.startsWith("http");

      if (isExternal) {
        return (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-secondary underline underline-offset-2 transition-colors hover:text-primary"
          >
            {children}
          </a>
        );
      }

      return (
        <Link
          href={href}
          className="text-secondary underline underline-offset-2 transition-colors hover:text-primary"
        >
          {children}
        </Link>
      );
    },
  },
};

interface CustomPortableTextProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any[];
}

export function CustomPortableText({ value }: CustomPortableTextProps) {
  if (!value) return null;
  return (
    <div className="max-w-none">
      <PortableText value={value} components={components} />
    </div>
  );
}
