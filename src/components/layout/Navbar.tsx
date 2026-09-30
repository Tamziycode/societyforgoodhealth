import Image from "next/image";
import Link from "next/link";

import { urlFor } from "@/sanity/lib/image";
import { getSiteSettings } from "@/sanity/lib/queries";

import { MobileMenu } from "./MobileMenu";
import { NAV_LINKS } from "./nav-links";

export async function Navbar() {
  const settings = await getSiteSettings();
  const siteTitle = settings?.title ?? "Society for Good Health";

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
      <div className="relative mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-3">
          {settings?.logo ? (
            <Image
              src={urlFor(settings.logo).width(40).height(40).fit("crop").url()}
              alt={siteTitle}
              width={40}
              height={40}
              className="rounded-md"
            />
          ) : null}
          <span className="text-lg font-semibold text-charcoal">
            {siteTitle}
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm font-medium text-foreground transition-colors hover:text-secondary"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <MobileMenu />
      </div>
    </header>
  );
}
