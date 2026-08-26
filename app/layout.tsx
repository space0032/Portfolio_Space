import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://antariksh-mankar-portfolio.antariksh-mankar43.chatgpt.site"),
  title: "Antariksh Mankar - Backend Engineer",
  description: "Backend engineer building scalable Java and Spring Boot systems, AI-integrated platforms, and reliable delivery pipelines.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Antariksh Mankar - Backend Engineer",
    description: "Java, Spring Boot, AI integrations, and production-minded backend systems.",
    type: "website",
    url: "/",
    siteName: "Antariksh Mankar",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Antariksh Mankar - Backend Engineer" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Antariksh Mankar - Backend Engineer",
    description: "Java, Spring Boot, AI integrations, and production-minded backend systems.",
    images: ["/og.png"],
  },
  robots: { index: true, follow: true },
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
  other: { "codex-preview": "development" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
