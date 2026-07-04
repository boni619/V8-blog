import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import TopNav from "@/components/TopNav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "V8 Blog — Insights into the V8 JavaScript Engine",
    template: "%s — V8 Blog",
  },
  description:
    "Stay up to date with the latest V8 engine updates, performance optimizations, and technical deep dives from the V8 team.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>▣</text></svg>"
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <ThemeProvider>
          <TopNav />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
