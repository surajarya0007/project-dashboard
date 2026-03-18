"use client";

import { ExperienceCard } from "@/components/experience/experience-card";
import { EXPERIENCES, ExperienceItem } from "@/data/experience";
import { motion } from "framer-motion";
import { Briefcase, TrendingUp } from "lucide-react";

function calculateTotalExperience(experiences: ExperienceItem[]): string {
  const monthMap: Record<string, number> = {
    Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
    Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11,
  };

  let totalMonths = 0;

  for (const exp of experiences) {
    const parts = exp.period.split("–").map((s) => s.trim());
    const [startMonth, startYear] = parts[0].split(" ");
    const endPart = parts[1];

    let endDate: Date;
    if (endPart.toLowerCase() === "present") {
      endDate = new Date();
    } else {
      const [endMonth, endYear] = endPart.split(" ");
      endDate = new Date(parseInt(endYear), monthMap[endMonth]);
    }

    const startDate = new Date(parseInt(startYear), monthMap[startMonth]);
    const months =
      (endDate.getFullYear() - startDate.getFullYear()) * 12 +
      (endDate.getMonth() - startDate.getMonth()) +
      1;
    totalMonths += Math.max(0, months);
  }

  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;

  if (years > 0 && months > 0)
    return `${years} Year${years > 1 ? "s" : ""} ${months} Month${months > 1 ? "s" : ""}`;
  if (years > 0) return `${years}+ Year${years > 1 ? "s" : ""}`;
  return `${months} Month${months > 1 ? "s" : ""}`;
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const item = {
  hidden: { x: -30, opacity: 0 },
  show: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
};

export function ExperienceView() {
  const totalExp = calculateTotalExperience(EXPERIENCES);

  return (
    <motion.div variants={container} initial="hidden" animate="show">
      {/* Header */}
      <motion.div className="text-center md:text-left mb-10" variants={item}>
        <h1 className="text-3xl font-bold text-white">Experience</h1>
        <p className="mt-2 text-neutral-400 font-ui">
          Professional Journey & Career Highlights
        </p>

        {/* Total Experience Badge */}
        <motion.div
          className="mt-5 inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#cf005d]/20 to-blue-500/20 border border-white/10 backdrop-blur-sm"
          whileHover={{ scale: 1.03 }}
        >
          <TrendingUp className="h-5 w-5 text-[#cf005d]" />
          <div className="flex items-center gap-2">
            <span className="text-sm text-neutral-400 font-ui">Total Experience:</span>
            <span className="text-lg font-bold bg-gradient-to-r from-[#cf005d] to-blue-400 bg-clip-text text-transparent font-code">
              {totalExp}
            </span>
          </div>
        </motion.div>
      </motion.div>

      {/* Timeline */}
      <div className="relative pl-14">
        {/* Vertical timeline line */}
        <motion.div
          className="absolute left-[19px] top-[44px] bottom-0 w-[2px] origin-top"
          style={{
            background:
              "linear-gradient(to bottom, #cf005d, #3b82f6 50%, transparent)",
          }}
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
        />

        <div className="space-y-6">
          {EXPERIENCES.map((exp, index) => (
            <motion.div key={exp.id} className="relative" variants={item}>
              {/* Timeline node */}
              <div className="absolute -left-14 top-6">
                <motion.div
                  className={`relative h-10 w-10 rounded-full flex items-center justify-center ${
                    index === 0
                      ? "bg-[#cf005d]/20 border-2 border-[#cf005d] shadow-[0_0_15px_rgba(207,0,93,0.3)]"
                      : "bg-white/5 border-2 border-white/20"
                  }`}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    delay: 0.4 + index * 0.15,
                    type: "spring",
                    stiffness: 200,
                  }}
                >
                  <div
                    className={`h-3 w-3 rounded-full ${
                      index === 0 ? "bg-[#cf005d]" : "bg-blue-400"
                    }`}
                  />
                  {index === 0 && (
                    <motion.div
                      className="absolute inset-0 rounded-full border-2 border-[#cf005d]"
                      animate={{ scale: [1, 1.5], opacity: [0.6, 0] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeOut",
                      }}
                    />
                  )}
                </motion.div>
              </div>

              {/* Horizontal connector */}
              <motion.div
                className="absolute -left-4 top-[43px] w-4 h-[2px]"
                style={{
                  background:
                    index === 0 ? "#cf005d" : "rgba(255,255,255,0.15)",
                }}
                initial={{ scaleX: 0, originX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.5 + index * 0.15, duration: 0.3 }}
              />

              <ExperienceCard experience={exp} />
            </motion.div>
          ))}

          {/* Career start marker */}
          <motion.div className="relative" variants={item}>
            <div className="absolute -left-14 top-0">
              <motion.div
                className="h-10 w-10 rounded-full bg-neutral-800/50 border-2 border-dashed border-neutral-600 flex items-center justify-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  delay: 0.4 + EXPERIENCES.length * 0.15,
                  type: "spring",
                  stiffness: 200,
                }}
              >
                <Briefcase className="h-4 w-4 text-neutral-500" />
              </motion.div>
            </div>
            <motion.div
              className="absolute -left-4 top-[19px] w-4 h-[2px] bg-white/10"
              initial={{ scaleX: 0, originX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{
                delay: 0.5 + EXPERIENCES.length * 0.15,
                duration: 0.3,
              }}
            />
            <p className="text-sm text-neutral-500 font-medium pt-2.5 italic font-ui">
              Career Start
            </p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
