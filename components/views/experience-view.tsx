"use client";

import { ExperienceCard } from "@/components/experience/experience-card";
import { EXPERIENCES } from "@/data/experience";
import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { x: -50, opacity: 0 },
  show: { 
    x: 0, 
    opacity: 1,
    transition: {
      duration: 0.5
    }
  }
};

export function ExperienceView() {
  return (
    <motion.div 
      className="space-y-6"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <motion.div className="text-center md:text-left mb-8" variants={item}>
        <h1 className="text-3xl font-bold text-white">Experience</h1>
        <p className="mt-2 text-neutral-400">Professional Journey & Career Highlights</p>
      </motion.div>

      <div className="grid gap-6">
        {EXPERIENCES.map((exp) => (
          <motion.div key={exp.id} variants={item}>
            <ExperienceCard experience={exp} />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
