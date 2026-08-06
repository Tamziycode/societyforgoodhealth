import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Studio | Society for Good Health",
  description: "Content management studio.",
  robots: { index: false, follow: false },
};

export default function StudioLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
