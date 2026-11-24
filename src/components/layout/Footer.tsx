import Image from "next/image";
import Link from "next/link";

import { getSiteSettings } from "@/sanity/lib/queries";

import { NAV_LINKS } from "./nav-links";

function XIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M17.53 3H21l-7.19 8.21L22 21h-6.28l-4.92-6.4L4.9 21H1.4l7.7-8.79L2 3h6.44l4.45 5.86L17.53 3Zm-1.1 16.17h1.74L7.66 4.73H5.8l10.63 14.44Z" />
    </svg>
  );
}

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
      {...props}
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

export async function Footer() {
  const settings = await getSiteSettings();
  const year = new Date().getFullYear();
  const siteTitle = settings?.title ?? "Society for Good Health";

  const socials = [
    { href: settings?.socialLinks?.x, label: "X (Twitter)", Icon: XIcon },
    {
      href: settings?.socialLinks?.instagram,
      label: "Instagram",
      Icon: InstagramIcon,
    },
  ].filter((s): s is typeof s & { href: string } => Boolean(s.href));

  return (
    <footer className="mt-24 border-t-4 border-t-charcoal bg-secondary text-secondary-foreground">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-12 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <div className="flex items-center gap-3">
            <Image
              src="/brand/sgh-mark-mono-white.png"
              alt=""
              width={40}
              height={40}
            />
            <h2 className="text-lg font-semibold">{siteTitle}</h2>
          </div>
          {settings?.description ? (
            <p className="mt-3 max-w-sm text-sm text-secondary-foreground/80">
              {settings.description}
            </p>
          ) : null}
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-secondary-foreground/70">
            Quick Links
          </h3>
          <ul className="mt-4 space-y-2">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm transition-colors hover:underline"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-secondary-foreground/70">
            Connect
          </h3>
          {settings?.contactEmail ? (
            <a
              href={`mailto:${settings.contactEmail}`}
              className="mt-4 block text-sm transition-colors hover:underline"
            >
              {settings.contactEmail}
            </a>
          ) : null}

          {socials.length > 0 ? (
            <div className="mt-4 flex gap-4">
              {socials.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="text-secondary-foreground/80 transition-opacity hover:opacity-100"
                >
                  <Icon width={20} height={20} />
                </a>
              ))}
            </div>
          ) : null}
        </div>
      </div>

      <div className="border-t border-secondary-foreground/15">
        <p className="mx-auto max-w-6xl px-6 py-6 text-xs text-secondary-foreground/70">
          © {year} {siteTitle}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
