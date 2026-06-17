"use client";

import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import AchievementsSection from "@/components/AchievementsSection";
import ProjectsSection from "@/components/ProjectsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import MouseGlow from "@/components/MouseGlow";
import ScrollToTop from "@/components/ScrollToTop";

export default function Home() {
  return (
    <>
      <MouseGlow />
      <Navbar />
      <main className="min-h-screen">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <AchievementsSection />
        <ProjectsSection />
        <ContactSection />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
}
