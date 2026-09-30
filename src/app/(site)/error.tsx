"use client";

import { useEffect } from "react";
import Link from "next/link"; // Fixes full page reload issue

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div
      role="alert"
      className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center px-6 text-center"
    >
      <span className="text-sm font-semibold uppercase tracking-wide text-secondary">
        Something went wrong
      </span>
      <h1 className="mt-2 text-3xl font-bold text-charcoal">
        We hit a snag loading this page
      </h1>
      <p className="mt-4 text-muted-foreground">
        Please try again, or head back to the homepage.
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <button
          onClick={() => reset()}
          className="rounded-lg bg-primary px-7 py-3 text-xl font-bold text-primary-foreground transition hover:brightness-95"
        >
          Try Again
        </button>
        {/* Changed from <a> to <Link> */}
        <Link
          href="/"
          className="rounded-lg border border-charcoal/40 px-7 py-3 text-xl font-bold text-charcoal transition-colors hover:border-charcoal"
        >
          Home
        </Link>
      </div>
    </div>
  );
}
