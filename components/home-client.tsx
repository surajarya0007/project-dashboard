"use client";

import { motion, AnimatePresence } from "framer-motion";
import { AppShell } from "@/components/layout/app-shell";
import { ProjectsView } from "@/components/views/projects-view";
import { ExperienceView } from "@/components/views/experience-view";
import { ProfileView } from "@/components/views/profile-view";
import { Particles } from "@/components/background/particle-background";
import { useState } from "react";
import { CodingStats } from "@/lib/coding-stats";

interface HomeClientProps {
  initialStats?: {
    leetCode: CodingStats | null;
    codeforces: CodingStats | null;
  };
}

export function HomeClient({ initialStats }: HomeClientProps) {
  const [currentView, setCurrentView] = useState("projects");

  const renderView = () => {
    switch (currentView) {
      case "projects":
        return <ProjectsView key="projects" />;
      case "experience":
        return <ExperienceView key="experience" />;
      case "profile":
        return <ProfileView key="profile" initialStats={initialStats} />;
      default:
        return <ProjectsView key="projects" />;
    }
  };

  return (
    <>
      <Particles 
        particleCount={1500}
        particleSpread={1}
        speed={0.03}
        particleBaseSize={40}
        moveParticlesOnHover={true}
        particleHoverFactor={1}
        alphaParticles={true}
        cameraDistance={6}
        sizeRandomness={3}
      />
      <AppShell currentView={currentView} onNavigate={setCurrentView}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentView}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderView()}
          </motion.div>
        </AnimatePresence>
      </AppShell>
    </>
  );
}
