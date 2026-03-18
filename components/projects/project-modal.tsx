"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Github, ExternalLink } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Project } from "@/data/projects";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "gallery" | "tech">("overview");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!project) return null;

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev === project.images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? project.images.length - 1 : prev - 1));
  };

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
          className="backdrop-blur-xl saturate-200 bg-gradient-to-b from-black/60 to-[#cf005d]/40 rounded-xl overflow-hidden max-w-6xl w-full h-[85vh] md:h-[80vh] flex flex-col shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2),inset_0_0_0_1px_rgba(255,255,255,0.1)]"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          { }
          <div className="flex justify-between items-center p-4 md:p-6 border-b border-neutral-800">
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-white">{project.name}</h2>
              <p className="text-xs md:text-sm text-gray-400 mt-1">{project.date}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-neutral-800 rounded-full transition-colors"
            >
              <X className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </button>
          </div>

          { }
          <div className="flex gap-2 md:gap-4 px-4 md:px-6 pt-4 border-b border-neutral-800 overflow-x-auto">
            {(["overview", "gallery", "tech"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-3 px-2 text-xs md:text-sm font-medium capitalize transition-colors whitespace-nowrap ${
                  activeTab === tab
                    ? "text-[#cf005d] border-b-2 border-[#cf005d]"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          { }
          <div className="flex-1 overflow-y-auto p-4 md:p-6">
            {activeTab === "overview" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Description</h3>
                  <p className="text-gray-300">{project.longDescription}</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Key Features</h3>
                  <ul className="space-y-2 text-gray-300">
                    {project.points.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-[#cf005d] mt-1.5">•</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-white/5 border border-white/10 p-4 rounded-lg backdrop-blur-sm">
                    <p className="text-xs text-gray-400 uppercase">Dev Time</p>
                    <p className="text-white font-semibold mt-1">{project.stats.developmentTime}</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-4 rounded-lg backdrop-blur-sm">
                    <p className="text-xs text-gray-400 uppercase">Team Size</p>
                    <p className="text-white font-semibold mt-1">{project.stats.teamSize}</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-4 rounded-lg backdrop-blur-sm">
                    <p className="text-xs text-gray-400 uppercase">Lines of Code</p>
                    <p className="text-white font-semibold mt-1">{project.stats.codeLines}</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-4 rounded-lg backdrop-blur-sm">
                    <p className="text-xs text-gray-400 uppercase">Deployments</p>
                    <p className="text-white font-semibold mt-1">{project.stats.deployments}</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 bg-neutral-800 hover:bg-neutral-700 px-4 py-2 rounded-lg transition-colors"
                    >
                      <Github className="w-5 h-5 text-white" />
                      <span className="text-white">View Code</span>
                    </a>
                  )}
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 bg-gradient-to-r from-black to-[#cf005d] hover:from-black/80 hover:to-[#cf005d]/80 px-4 py-2 rounded-lg transition-colors"
                    >
                      <ExternalLink className="w-5 h-5 text-white" />
                      <span className="text-white">Live Demo</span>
                    </a>
                  )}
                </div>
              </div>
            )}

            {activeTab === "gallery" && (
              <div className="space-y-4">
                <div className="relative aspect-video bg-neutral-800 rounded-lg overflow-hidden">
                  <Image
                    src={project.images[currentImageIndex] || "/placeholder.svg"}
                    alt={`${project.name} screenshot ${currentImageIndex + 1}`}
                    fill
                    className="object-contain"
                  />
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 hover:bg-black/70 rounded-full transition-colors"
                  >
                    <ChevronLeft className="w-6 h-6 text-white" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 hover:bg-black/70 rounded-full transition-colors"
                  >
                    <ChevronRight className="w-6 h-6 text-white" />
                  </button>
                </div>
                <div className="flex gap-2 justify-center">
                  {project.images.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImageIndex(idx)}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        idx === currentImageIndex ? "bg-[#cf005d]" : "bg-gray-600"
                      }`}
                    />
                  ))}
                </div>
              </div>
            )}

            {activeTab === "tech" && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">Technology Stack</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {project.tech.map((tech, idx) => (
                    <div
                      key={idx}
                      className="bg-white/5 border border-white/10 backdrop-blur-sm py-3 px-4 rounded-lg text-center hover:bg-white/10 transition-colors"
                    >
                      <p className="text-white font-medium">{tech}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
