"use client";

import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import HudStatus from "@/components/hud/HudStatus";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import AchievementsSection from "@/components/AchievementsSection";
import ProjectsSection from "@/components/ProjectsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import MouseGlow from "@/components/MouseGlow";
import ScrollToTop from "@/components/ScrollToTop";

const SpaceScene = dynamic(() => import("@/components/three/SpaceScene"), {
  ssr: false,
  loading: () => <div className="fixed inset-0 z-0 bg-bg-primary" />,
});

export default function Home() {
  return (
    <>
      <MouseGlow />
      <Navbar />
      <HudStatus />
      <SpaceScene>
        <main className="relative">
          <HeroSection />
          <AboutSection />
          <SkillsSection />
          <AchievementsSection />
          <ProjectsSection />
          <ContactSection />
          <Footer />
        </main>
      </SpaceScene>
      <ScrollToTop />
    </>
  );
}
