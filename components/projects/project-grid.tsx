"use client";

import { useState } from "react";
import { projects } from "@/data/projects";
import { ProjectCard } from "./project-card";
import { ProjectModal } from "./project-modal";
import { Project } from "@/data/projects";
import { cn } from "@/lib/utils";

export function ProjectGrid() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [filter, setFilter] = useState<"all" | "featured">("all");

  const filteredProjects = filter === "all" ? projects : projects.filter((p) => p.featured);

  return (
    <>
      { }
      <div className="sticky top-0 z-10 py-2 md:py-3 mb-6">
        <div className="flex justify-center px-4">
          <div className="flex gap-3 flex-wrap backdrop-blur-sm saturate-200  p-3 rounded-full shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2),inset_0_0_0_1px_rgba(255,255,255,0.1)] shadow-lg">
            <button
              onClick={() => setFilter("all")}
              className={cn(
                "px-4 md:px-6 py-2 rounded-full transition-all duration-300 text-sm",
                filter === "all"
                  ? "bg-white text-black font-medium shadow-lg"
                  : "bg-neutral-800 text-white hover:bg-neutral-700"
              )}
            >
              All Projects
            </button>
            <button
              onClick={() => setFilter("featured")}
              className={cn(
                "px-4 md:px-6 py-2 rounded-full transition-all duration-300 text-sm",
                filter === "featured"
                  ? "bg-white text-black font-medium shadow-lg"
                  : "bg-neutral-800 text-white hover:bg-neutral-700"
              )}
            >
              Featured
            </button>
          </div>
        </div>
      </div>

      { }
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {filteredProjects.map((project, index) => (
          <ProjectCard
            key={project.name}
            project={project}
            index={index}
            onClick={() => setSelectedProject(project)}
          />
        ))}
      </div>

      { }
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </>
  );
}
