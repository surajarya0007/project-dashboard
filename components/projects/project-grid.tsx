"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { projects } from "@/data/projects";
import { ProjectCard } from "./project-card";
import { ProjectModal } from "./project-modal";
import { Project } from "@/data/projects";
import { cn } from "@/lib/utils";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { x: -50, opacity: 0 },
  show: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
};

export function ProjectGrid() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [filter, setFilter] = useState<
    "all" | "featured" | "ai" | "dbms" | "personal"
  >("all");

  const filteredProjects =
    filter === "all"
      ? projects
      : filter === "featured"
        ? projects.filter((p) => p.featured)
        : projects.filter((p) => p.category === filter);

  return (
    <>
      <motion.div
        className="sticky top-0 z-10 py-2 md:py-3 mb-6"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex justify-center px-4">
          <div className="flex gap-3 flex-wrap justify-center backdrop-blur-sm saturate-200 p-3 rounded-2xl md:rounded-full shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2),inset_0_0_0_1px_rgba(255,255,255,0.1)] shadow-lg">
            {(["all", "featured", "ai", "dbms", "personal"] as const).map(
              (f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={cn(
                    "font-ui px-4 md:px-6 py-2 rounded-full transition-all duration-300 text-xs md:text-sm capitalize font-medium",
                    filter === f
                      ? "bg-gradient-to-r from-[#cf005d]/20 to-blue-500/20 text-white shadow-lg shadow-[#cf005d]/25 border border-white/10 backdrop-blur-sm"
                      : "bg-neutral-800 text-neutral-300 hover:bg-neutral-700 hover:text-white border border-neutral-700",
                  )}
                >
                  {f === "all"
                    ? "All Projects"
                    : f === "ai"
                      ? "AI Integrated"
                      : f === "dbms"
                        ? "Dbms Dashboard"
                        : f === "personal"
                          ? "Personal Project"
                          : f}
                </button>
              ),
            )}
          </div>
        </div>
      </motion.div>

      <motion.div
        key={filter}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {filteredProjects.map((project, index) => (
          <motion.div key={project.name} variants={item}>
            <ProjectCard
              project={project}
              index={index}
              onClick={() => setSelectedProject(project)}
            />
          </motion.div>
        ))}
      </motion.div>

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </>
  );
}
