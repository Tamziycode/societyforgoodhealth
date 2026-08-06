"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { urlFor } from "@/sanity/lib/image";
import type { SanityImage } from "@/sanity/lib/queries";

interface ProjectCarouselProps {
  images: SanityImage[];
  altFallback: string;
}

export function ProjectCarousel({ images, altFallback }: ProjectCarouselProps) {
  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true },
    prefersReducedMotion
      ? []
      : [
          Autoplay({
            delay: 4500,
            stopOnInteraction: false,
            stopOnMouseEnter: true,
          }),
        ],
  );

  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollTo = useCallback(
    (index: number) => emblaApi?.scrollTo(index),
    [emblaApi],
  );
  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  if (!images || images.length === 0) return null;

  return (
    <div className="relative group">
      {/* 1. Diffused Shadow & Crisp Border on Container */}
      <div
        className="overflow-hidden rounded-2xl border border-charcoal/5 bg-charcoal/5 shadow-2xl shadow-charcoal/10 transition-shadow duration-500 hover:shadow-charcoal/15"
        ref={emblaRef}
      >
        <div className="flex">
          {images.map((image, index) => (
            <div key={index} className="relative aspect-video flex-[0_0_100%]">
              <Image
                src={urlFor(image).width(1200).height(675).fit("crop").url()}
                alt={image.alt || altFallback}
                fill
                sizes="(min-width: 1024px) 800px, 100vw"
                className="object-cover"
                priority={index === 0}
              />
              {/* Subtle inner shadow overlay to give the image a richer edge */}
              <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-charcoal/10" />
            </div>
          ))}
        </div>
      </div>

      {images.length > 1 ? (
        <>
          {/* 2. Glassmorphism Navigation Controls */}
          <button
            type="button"
            onClick={scrollPrev}
            aria-label="Previous image"
            className="absolute left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-white/30 text-charcoal shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-white/80 opacity-0 group-hover:opacity-100 sm:opacity-100"
          >
            <ChevronLeft size={20} strokeWidth={2.5} />
          </button>
          <button
            type="button"
            onClick={scrollNext}
            aria-label="Next image"
            className="absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-white/30 text-charcoal shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-white/80 opacity-0 group-hover:opacity-100 sm:opacity-100"
          >
            <ChevronRight size={20} strokeWidth={2.5} />
          </button>

          {/* 3. Modern Expanding Pill Indicators */}
          <div className="mt-6 flex justify-center gap-2.5">
            {images.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => scrollTo(index)}
                aria-label={`Go to image ${index + 1}`}
                className={`h-2.5 rounded-full transition-all duration-300 ease-out ${
                  index === selectedIndex
                    ? "w-8 bg-primary shadow-sm shadow-primary/30"
                    : "w-2.5 bg-charcoal/15 hover:bg-charcoal/30"
                }`}
              />
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
}
