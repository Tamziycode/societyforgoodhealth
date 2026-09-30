import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";

import { getSiteSettings } from "@/sanity/lib/queries";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Society for Good Health.",
};

function iconFor(label: string) {
  const normalized = label.toLowerCase();
  if (normalized.includes("email")) return Mail;
  if (normalized.includes("address")) return MapPin;
  return Phone; // Covers Phone and Fax
}

export default async function ContactPage() {
  const settings = await getSiteSettings();
  const details = settings?.contactDetails ?? [];

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <span className="text-sm font-semibold uppercase tracking-wide text-secondary">
        Get In Touch
      </span>
      <h1 className="mt-2 text-3xl font-bold text-charcoal">Contact</h1>

      {details.length > 0 ? (
        <dl className="mt-10 space-y-6">
          {details.map((detail, index) => {
            const Icon = iconFor(detail.label);
            const isEmail = detail.label.toLowerCase().includes("email");
            return (
              <div key={index} className="flex items-start gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary/10 text-secondary">
                  <Icon size={18} />
                </span>
                <div>
                  <dt className="text-sm font-semibold text-muted-foreground">
                    {detail.label}
                  </dt>
                  <dd className="mt-1 text-charcoal">
                    {detail.isLink ? (
                      <a
                        href={
                          isEmail
                            ? `mailto:${detail.value}`
                            : `tel:${detail.value.replace(/[^+\d]/g, "")}`
                        }
                        className="transition-colors hover:text-secondary"
                      >
                        {detail.value}
                      </a>
                    ) : (
                      detail.value
                    )}
                  </dd>
                </div>
              </div>
            );
          })}
        </dl>
      ) : (
        <p className="mt-10 text-muted-foreground">
          {settings?.contactEmail ? (
            <>
              Reach us at{" "}
              <a
                href={`mailto:${settings.contactEmail}`}
                className="text-secondary hover:text-secondary"
              >
                {settings.contactEmail}
              </a>
              .
            </>
          ) : (
            "Contact details haven't been added yet — head to the Studio to add them."
          )}
        </p>
      )}
    </div>
  );
}
