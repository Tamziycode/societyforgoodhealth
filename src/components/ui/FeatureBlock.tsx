import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { urlFor } from "@/sanity/lib/image";
import type { SanityImage } from "@/sanity/lib/queries";

const CARD_BG = ["bg-charcoal", "bg-primary", "bg-secondary"] as const;
const CARD_TINT = [
  "bg-charcoal/55",
  "bg-primary/55",
  "bg-secondary/55",
] as const;

interface FeatureBlockProps {
  href: string;
  eyebrow: string;
  title: string;
  description?: string;
  image?: SanityImage;
  colorIndex: 0 | 1 | 2;
  large?: boolean;
}

export function FeatureBlock({
  href,
  eyebrow,
  title,
  description,
  image,
  colorIndex,
  large,
}: FeatureBlockProps) {
  return (
    <Link
      href={href}
      className={`group relative flex items-end overflow-hidden shape-feature p-7 transition-transform hover:-translate-y-0.5 ${
        image ? "bg-muted" : CARD_BG[colorIndex]
      } ${large ? "min-h-[420px] lg:row-span-2" : "min-h-[200px]"}`}
    >
      {image ? (
        <Image
          src={urlFor(image).width(900).height(700).fit("crop").url()}
          alt=""
          fill
          sizes="(min-width: 1024px) 500px, 100vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      ) : null}

      {/* Brand-colour wash so the block keeps its identity colour even with a real photo */}
      {image ? (
        <span
          className={`pointer-events-none absolute inset-0 ${CARD_TINT[colorIndex]}`}
        />
      ) : null}

      {/* Charcoal gradient for text legibility — brand guide's photo-overlay rule */}
      <span className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-charcoal/80 via-charcoal/30 to-transparent" />

      <span className="absolute right-5 top-5 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/15 transition-colors group-hover:bg-white/25">
        <ArrowUpRight size={16} className="text-white" />
      </span>

      <div className="relative z-10">
        <span className="block text-xs font-semibold uppercase tracking-wide text-white/80">
          {eyebrow}
        </span>
        <h3 className="mt-2 text-xl font-bold text-white sm:text-2xl">
          {title}
        </h3>
        {description ? (
          <p className="mt-2 max-w-sm text-sm text-white/85">{description}</p>
        ) : null}
      </div>
    </Link>
  );
}
