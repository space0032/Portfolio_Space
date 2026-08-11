import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import MotionProvider from "@/components/MotionProvider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
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
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans antialiased" suppressHydrationWarning>
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
