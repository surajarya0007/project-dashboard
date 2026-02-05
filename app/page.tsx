"use client";

import { AppShell } from "@/components/layout/app-shell";
import { OverviewView } from "@/components/views/overview-view";
import { ProjectsView } from "@/components/views/projects-view";
import { ExperienceView } from "@/components/views/experience-view";
import { ProfileView } from "@/components/views/profile-view";
import { Particles } from "@/components/background/particle-background";
import { useState } from "react";

export default function Home() {
  const [currentView, setCurrentView] = useState("overview");

  const renderView = () => {
    switch (currentView) {
      case "overview":
        return <OverviewView />;
      case "projects":
        return <ProjectsView />;
      case "experience":
        return <ExperienceView />;
      case "profile":
        return <ProfileView />;
      default:
        return <OverviewView />;
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
        {renderView()}
      </AppShell>
    </>
  );
}
