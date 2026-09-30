import Image from "next/image";

import { urlFor } from "@/sanity/lib/image";
import type { Testimonial as TestimonialType } from "@/sanity/lib/queries";

export function Testimonial({ testimonial }: { testimonial: TestimonialType }) {
  return (
    <section className="border-y border-border bg-card">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 md:grid-cols-[0.8fr_1.2fr] md:items-center">
        <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-muted">
          {testimonial.photo ? (
            <Image
              src={urlFor(testimonial.photo)
                .width(700)
                .height(875)
                .fit("crop")
                .url()}
              alt={testimonial.photo.alt || testimonial.authorName}
              fill
              sizes="(min-width: 768px) 420px, 100vw"
              className="object-cover"
            />
          ) : null}
        </div>
        <div>
          <blockquote className="border-l-4 border-secondary pl-6 font-serif text-2xl italic leading-relaxed text-charcoal">
            {testimonial.quote}
          </blockquote>
          <p className="mt-6 text-sm font-semibold text-charcoal">
            {testimonial.authorName}
          </p>
          {testimonial.authorRole ? (
            <p className="text-sm text-muted-foreground">
              {testimonial.authorRole}
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
