"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Github, ExternalLink } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Project } from "@/data/projects";
import { cn } from "@/lib/utils";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

const stagger = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" as const } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.3, ease: "easeOut" as const } },
};

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "gallery" | "tech">(
    "overview",
  );
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (project) {
      setActiveTab("overview");
      setCurrentImageIndex(0);
    }
  }, [project]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-2 md:p-4 bg-black/80 backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="relative rounded-2xl overflow-hidden max-w-6xl w-full h-[85vh] md:h-[80vh] flex flex-col border border-white/10 shadow-2xl shadow-black/50"
          style={{
            background:
              "linear-gradient(180deg, rgba(10,10,12,0.97) 0%, rgba(15,15,20,0.98) 50%, rgba(10,10,15,0.99) 100%)",
          }}
          initial={{ scale: 0.9, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Subtle gradient glow at top */}
          <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-[#cf005d]/8 to-transparent pointer-events-none" />
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-blue-500/5 to-transparent pointer-events-none" />

          {/* Header */}
          <motion.div
            className="relative flex items-center p-4 md:p-6 border-b border-white/[0.06] gap-4"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.3 }}
          >
            <div className="flex-shrink-0">
              <h2 className="text-xl md:text-2xl font-bold text-white font-heading">
                {project.name}
              </h2>
              <p className="text-xs md:text-sm text-neutral-500 mt-1 font-code">
                {project.date}
              </p>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-2 mx-auto">
              {project.github && (
                <motion.a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-white/[0.06] hover:bg-white/10 border border-white/10 hover:border-white/20 px-4 py-2 rounded-xl transition-all duration-200"
                  whileHover={{ y: -2, scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Github className="w-4 h-4 text-neutral-300" />
                  <span className="text-sm font-medium text-neutral-300 font-ui hidden sm:inline">
                    View Code
                  </span>
                </motion.a>
              )}
              {project.link && (
                <motion.a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-gradient-to-r from-[#cf005d]/20 to-blue-500/20 hover:from-[#cf005d]/30 hover:to-blue-500/30 border border-white/10 hover:border-white/20 px-4 py-2 rounded-xl transition-all duration-200"
                  whileHover={{ y: -2, scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <ExternalLink className="w-4 h-4 text-white" />
                  <span className="text-sm font-medium text-white font-ui hidden sm:inline">
                    Live Demo
                  </span>
                </motion.a>
              )}
            </div>

            <motion.button
              onClick={onClose}
              className="flex-shrink-0 p-2 hover:bg-white/10 rounded-full transition-all duration-200 border border-transparent hover:border-white/10 hover:rotate-90"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X className="w-5 h-5 md:w-6 md:h-6 text-neutral-400 hover:text-white transition-colors" />
            </motion.button>
          </motion.div>

          {/* Tabs */}
          <motion.div
            className="relative flex gap-1 px-4 md:px-6 pt-3 pb-0 border-b border-white/[0.06] overflow-x-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.3 }}
          >
            {(["overview", "gallery", "tech"] as const).map((tab) => (
              <motion.button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "font-ui relative pb-3 px-4 text-xs md:text-sm font-medium capitalize whitespace-nowrap transition-colors duration-200",
                  activeTab === tab
                    ? "text-white"
                    : "text-neutral-500 hover:text-neutral-300",
                )}
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.95 }}
              >
                {tab}
                {activeTab === tab && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#cf005d] to-blue-500 rounded-full"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}
          </motion.div>

          {/* Content */}
          <div className="relative flex-1 overflow-y-auto p-4 md:p-6">
            <AnimatePresence mode="wait">
              {activeTab === "overview" && (
                <motion.div
                  key="overview"
                  className="space-y-6"
                  variants={stagger}
                  initial="hidden"
                  animate="show"
                  exit={{ opacity: 0, transition: { duration: 0.15 } }}
                >
                  {/* Description */}
                  <motion.div
                    variants={fadeUp}
                    className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-5 hover:bg-white/[0.05] hover:border-white/10 transition-all duration-300"
                  >
                    <h3 className="text-sm font-semibold text-neutral-500 uppercase tracking-wider mb-3 font-ui">
                      Description
                    </h3>
                    <p className="text-neutral-300 leading-relaxed">
                      {project.longDescription}
                    </p>
                  </motion.div>

                  {/* Key Features */}
                  <motion.div
                    variants={fadeUp}
                    className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-5 hover:bg-white/[0.05] hover:border-white/10 transition-all duration-300"
                  >
                    <h3 className="text-sm font-semibold text-neutral-500 uppercase tracking-wider mb-4 font-ui">
                      Key Features
                    </h3>
                    <ul className="space-y-3">
                      {project.points.map((point, idx) => (
                        <motion.li
                          key={idx}
                          className="flex items-start gap-3 group/item"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 + idx * 0.06 }}
                        >
                          <span className="mt-2 h-1.5 w-1.5 rounded-full bg-gradient-to-br from-[#cf005d] to-blue-500 flex-shrink-0 group-hover/item:scale-150 transition-transform duration-200" />
                          <span className="text-neutral-400 text-sm leading-relaxed group-hover/item:text-neutral-200 transition-colors duration-200">
                            {point}
                          </span>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>

                  {/* Stats */}
                  <motion.div variants={fadeUp} className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {[
                      { label: "Dev Time", value: project.stats.developmentTime },
                      { label: "Team Size", value: project.stats.teamSize },
                      { label: "Lines of Code", value: project.stats.codeLines },
                      { label: "Deployments", value: project.stats.deployments },
                    ].map((stat, idx) => (
                      <motion.div
                        key={stat.label}
                        className="relative overflow-hidden rounded-xl bg-white/[0.03] border border-white/[0.06] p-4 hover:bg-white/[0.06] hover:border-white/10 transition-all duration-300 group cursor-default"
                        variants={scaleIn}
                        whileHover={{ y: -2, scale: 1.02 }}
                      >
                        <div
                          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          style={{
                            background:
                              idx % 2 === 0
                                ? "linear-gradient(135deg, rgba(207,0,93,0.08) 0%, transparent 60%)"
                                : "linear-gradient(135deg, rgba(59,130,246,0.08) 0%, transparent 60%)",
                          }}
                        />
                        <p className="relative text-[10px] text-neutral-500 uppercase tracking-widest font-medium group-hover:text-neutral-400 transition-colors font-ui">
                          {stat.label}
                        </p>
                        <p className="relative text-white font-bold text-lg mt-1 font-code">
                          {stat.value}
                        </p>
                      </motion.div>
                    ))}
                  </motion.div>

                </motion.div>
              )}

              {activeTab === "gallery" && (
                <motion.div
                  key="gallery"
                  className="flex flex-col md:flex-row gap-4 h-full"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, transition: { duration: 0.15 } }}
                  transition={{ duration: 0.35 }}
                >
                  {/* Main preview */}
                  <motion.div
                    className="relative flex-1 min-h-[300px] md:min-h-0 bg-neutral-900/50 rounded-xl overflow-hidden border border-white/[0.06] hover:border-white/10 transition-colors duration-300"
                    layoutId={`gallery-image-${currentImageIndex}`}
                  >
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentImageIndex}
                        className="absolute inset-0"
                        initial={{ opacity: 0, scale: 1.03 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                      >
                        <Image
                          src={
                            project.images[currentImageIndex] || "/placeholder.svg"
                          }
                          alt={`${project.name} screenshot ${currentImageIndex + 1}`}
                          fill
                          className="object-contain p-2"
                        />
                      </motion.div>
                    </AnimatePresence>
                    <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm text-xs text-neutral-500 px-2.5 py-1 rounded-md border border-white/10">
                      {currentImageIndex + 1} / {project.images.length}
                    </div>
                  </motion.div>

                  {/* Thumbnail strip */}
                  <div className="flex md:flex-col gap-2 md:w-28 overflow-x-auto md:overflow-y-auto md:overflow-x-hidden shrink-0 pb-1 md:pb-0 md:pr-1">
                    {project.images.map((img, idx) => (
                      <motion.button
                        key={idx}
                        onClick={() => setCurrentImageIndex(idx)}
                        className={`relative flex-shrink-0 w-20 h-14 md:w-full md:h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                          idx === currentImageIndex
                            ? "border-[#cf005d] shadow-[0_0_10px_rgba(207,0,93,0.3)]"
                            : "border-white/10 opacity-50 hover:opacity-100 hover:border-white/30"
                        }`}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 + idx * 0.05 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Image
                          src={img || "/placeholder.svg"}
                          alt={`${project.name} thumbnail ${idx + 1}`}
                          fill
                          className="object-cover"
                        />
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === "tech" && (
                <motion.div
                  key="tech"
                  className="space-y-5"
                  variants={stagger}
                  initial="hidden"
                  animate="show"
                  exit={{ opacity: 0, transition: { duration: 0.15 } }}
                >
                  <motion.h3
                    variants={fadeUp}
                    className="text-sm font-semibold text-neutral-500 uppercase tracking-wider font-ui"
                  >
                    Technology Stack
                  </motion.h3>
                  <motion.div variants={fadeUp} className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {project.tech.map((tech, idx) => (
                      <motion.div
                        key={idx}
                        className="relative overflow-hidden rounded-xl bg-white/[0.03] border border-white/[0.06] py-3.5 px-4 text-center hover:border-white/15 transition-all duration-200 group cursor-default"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 + idx * 0.04, duration: 0.25 }}
                        whileHover={{ y: -3, scale: 1.03 }}
                      >
                        <div
                          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          style={{
                            background:
                              idx % 3 === 0
                                ? "linear-gradient(135deg, rgba(207,0,93,0.08) 0%, transparent 70%)"
                                : idx % 3 === 1
                                  ? "linear-gradient(135deg, rgba(59,130,246,0.08) 0%, transparent 70%)"
                                  : "linear-gradient(135deg, rgba(207,0,93,0.05) 0%, rgba(59,130,246,0.05) 50%, transparent 70%)",
                          }}
                        />
                      <p className="relative text-neutral-300 font-medium text-sm group-hover:text-white transition-colors font-code">
                        {tech}
                      </p>
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
