import type { Metadata } from "next";
import { Microscope } from "lucide-react";

import { getSiteSettings } from "@/sanity/lib/queries";

export const metadata: Metadata = {
  title: "Research",
  description: "Explore the research areas Society for Good Health focuses on.",
};

export default async function ResearchPage() {
  const settings = await getSiteSettings();
  const areas = settings?.researchAreas ?? [];

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <span className="text-sm font-semibold uppercase tracking-wide text-secondary">
        Our Focus
      </span>
      <h1 className="mt-2 text-3xl font-bold text-charcoal">Research</h1>
      <p className="mt-4 max-w-2xl text-muted-foreground">
        Our research explores the relationships between health, poverty,
        housing, the environment, and social factors affecting vulnerable
        populations.
      </p>

      {areas.length > 0 ? (
        <ul className="mt-10 space-y-4">
          {areas.map((area, index) => (
            <li key={index}>
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-secondary/10 text-secondary">
                  <Microscope size={16} />
                </span>
                <span className="text-lg font-medium text-charcoal">
                  {area.label}
                </span>
              </div>
              {area.subItems && area.subItems.length > 0 ? (
                <ul className="ml-11 mt-2 list-disc space-y-1 text-muted-foreground">
                  {area.subItems.map((sub, subIndex) => (
                    <li key={subIndex}>{sub}</li>
                  ))}
                </ul>
              ) : null}
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-10 text-muted-foreground">
          Research areas haven&apos;t been added yet — head to the Studio to add
          them.
        </p>
      )}
    </div>
  );
}
