import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/ui/Nav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vedic Icons — Indian-Inspired Icon Library",
  description:
    "A pure CSS, class-based icon library inspired by Indian art, culture, and sacred geometry. Like Font Awesome, but rooted in Vedic aesthetics.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        <link rel="stylesheet" href="/vedic-icons.css" />
      </head>
      <body className="antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded-md focus:bg-brand-primary-600 focus:px-4 focus:py-2 focus:text-white focus:outline-none"
        >
          Skip to main content
        </a>
        <Nav />
        {children}
        <footer className="border-t border-brand-secondary-200 py-8 text-center text-sm text-brand-secondary-500">
          <p>
            Vedic Icons by{" "}
            <a
              href="https://yantrakit.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-primary-600 hover:underline focus:outline-none focus:ring-2 focus:ring-brand-primary-400 focus:ring-offset-2 rounded"
            >
              Yantrakit Inc
              <span className="sr-only"> (opens in new tab)</span>
            </a>
            . MIT License.
          </p>
        </footer>
      </body>
    </html>
  );
}
