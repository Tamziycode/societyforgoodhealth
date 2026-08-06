import type { Metadata } from "next";

import { CustomPortableText } from "@/components/blocks/PortableText";
import { getSiteSettings } from "@/sanity/lib/queries";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about Society for Good Health's mission and work.",
};

export default async function AboutPage() {
  const settings = await getSiteSettings();

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <span className="text-sm font-semibold uppercase tracking-wide text-secondary">
        Who We Are
      </span>
      <h1 className="mt-2 text-3xl font-bold text-charcoal">About Us</h1>

      <div className="mt-8">
        {settings?.aboutContent ? (
          <CustomPortableText value={settings.aboutContent} />
        ) : (
          <p className="text-muted-foreground">
            About page content hasn&apos;t been added yet — head to the Studio
            to add it.
          </p>
        )}
      </div>
    </div>
  );
}
