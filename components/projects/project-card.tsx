"use client";

import { motion } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";
import Image from "next/image";
import { Project } from "@/data/projects";

interface ProjectCardProps {
  project: Project;
  index: number;
  onClick: () => void;
}

export function ProjectCard({ project, index, onClick }: ProjectCardProps) {
  return (
    <motion.div
      className="project-card relative rounded-xl overflow-hidden backdrop-blur-md saturate-200 bg-gradient-to-br from-white/5 to-white/5 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2),inset_0_0_0_1px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(207,0,93,0.4)] transition-all duration-500 flex flex-col h-[450px] group cursor-pointer"
      whileHover={{
        y: -10,
        transition: { duration: 0.3 },
      }}
      onClick={onClick}
    >
      { }
      <div className="relative h-48 overflow-hidden transition-all duration-500 group-hover:h-24">
        <Image
          src={project.images[0] || "/placeholder.svg"}
          alt={project.name}
          width={500}
          height={300}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>

        <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
          <h3 className="text-xl font-bold text-white">{project.name}</h3>
          <div className="flex space-x-2">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors duration-300"
                aria-label={`GitHub repository for ${project.name}`}
                onClick={(e) => e.stopPropagation()}
              >
                <Github className="w-4 h-4 text-white" />
              </a>
            )}
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors duration-300"
                aria-label={`Live demo for ${project.name}`}
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink className="w-4 h-4 text-white" />
              </a>
            )}
          </div>
        </div>
      </div>

      { }
      <div className="p-6 flex-grow flex flex-col relative overflow-hidden">
        <div className="mb-2 text-sm text-gray-400">{project.date}</div>
        <p className="text-gray-300 mb-4 line-clamp-2 group-hover:line-clamp-none transition-all duration-300">
          {project.description}
        </p>

        { }
        <div className="absolute inset-0 p-6 pt-10 bg-black/90 translate-y-full group-hover:translate-y-0 transition-transform duration-500 overflow-y-auto max-h-full">
          <p className="text-gray-300 text-sm mb-4">{project.longDescription}</p>
          <ul className="space-y-2 text-gray-400 text-sm list-disc list-inside mb-4">
            {project.points.slice(0, 3).map((point, idx) => (
              <li key={idx}>{point}</li>
            ))}
          </ul>
          <p className="text-[#cf005d] text-sm font-medium">Click to view full details</p>
        </div>

        <div className="mt-auto">
          <div className="flex flex-wrap gap-2">
            {project.tech.slice(0, 4).map((tech, idx) => (
              <span key={idx} className="text-xs bg-white/10 backdrop-blur-sm border border-white/10 text-pink-200 py-1 px-3 rounded-full">
                {tech}
              </span>
            ))}
            {project.tech.length > 4 && (
              <span className="text-xs bg-white/10 backdrop-blur-sm border border-white/10 text-white py-1 px-3 rounded-full">
                +{project.tech.length - 4} more
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
