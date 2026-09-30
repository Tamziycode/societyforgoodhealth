import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center px-6 text-center">
      <span className="text-sm font-semibold uppercase tracking-wide text-secondary">
        404
      </span>
      <h1 className="mt-2 text-3xl font-bold text-charcoal">Page not found</h1>
      <p className="mt-4 text-muted-foreground">
        The page you&apos;re looking for doesn&apos;t exist or may have been
        moved.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-lg bg-primary px-7 py-3 text-xl font-bold text-primary-foreground transition hover:brightness-95"
      >
        Back to Home
      </Link>
    </div>
  );
}
