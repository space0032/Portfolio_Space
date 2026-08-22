import type { Metadata } from "next";
import { Cinzel, EB_Garamond, JetBrains_Mono } from "next/font/google";
import MotionProvider from "@/components/MotionProvider";
import Overlays from "@/components/effects/Overlays";
import CustomCursor from "@/components/effects/CustomCursor";
import ScrollProgress from "@/components/effects/ScrollProgress";
import "./globals.css";

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
  weight: ["500", "600", "700"],
  display: "swap",
});

const ebGaramond = EB_Garamond({
  subsets: ["latin"],
  variable: "--font-garamond",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Antariksh Mankar | Software Development Engineer",
  description:
    "Portfolio of Antariksh Mankar — Microsoft Certified DevOps Engineer Expert, Backend Developer, and Full Stack Engineer specializing in Java, React, and Cloud technologies.",
  keywords: [
    "Antariksh Mankar",
    "Software Developer",
    "DevOps Engineer",
    "Java Developer",
    "Full Stack",
    "React",
    "Portfolio",
  ],
  authors: [{ name: "Antariksh Mankar" }],
  openGraph: {
    title: "Antariksh Mankar | Software Development Engineer",
    description:
      "Microsoft Certified DevOps Engineer Expert crafting scalable systems with Java, React & Cloud technologies.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cinzel.variable} ${ebGaramond.variable} ${jetbrainsMono.variable}`}
    >
      <body className="font-sans antialiased" suppressHydrationWarning>
        <ScrollProgress />
        <CustomCursor />
        <Overlays />
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
