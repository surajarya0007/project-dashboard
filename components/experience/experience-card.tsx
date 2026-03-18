import { GlassCard } from "@/components/ui/glass-card";
import { ExperienceItem } from "@/data/experience";
import { Briefcase, Calendar, Clock, ExternalLink, Linkedin } from "lucide-react";
import Image from "next/image";

import { motion } from "framer-motion";

const MONTH_MAP: Record<string, number> = {
    Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
    Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11,
};

function getDuration(period: string): string {
    const parts = period.split("–").map((s) => s.trim());
    const [startMonth, startYear] = parts[0].split(" ");
    const endPart = parts[1];

    let endDate: Date;
    if (endPart.toLowerCase() === "present") {
        endDate = new Date();
    } else {
        const [endMonth, endYear] = endPart.split(" ");
        endDate = new Date(parseInt(endYear), MONTH_MAP[endMonth]);
    }

    const startDate = new Date(parseInt(startYear), MONTH_MAP[startMonth]);
    const totalMonths =
        (endDate.getFullYear() - startDate.getFullYear()) * 12 +
        (endDate.getMonth() - startDate.getMonth()) +
        1;
    const safe = Math.max(0, totalMonths);
    const years = Math.floor(safe / 12);
    const months = safe % 12;

    if (years > 0 && months > 0)
        return `${years} Year${years > 1 ? "s" : ""} ${months} Month${months > 1 ? "s" : ""}`;
    if (years > 0) return `${years} Year${years > 1 ? "s" : ""}`;
    return `${months} Month${months > 1 ? "s" : ""}`;
}

interface ExperienceCardProps {
    experience: ExperienceItem;
}

export function ExperienceCard({ experience }: ExperienceCardProps) {
    return (
        <motion.div
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            transition={{ duration: 0.2 }}
        >
            <GlassCard className="p-6 transition-all duration-300 hover:bg-white/10 group">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                <div className="flex gap-4">
                    {experience.logo ? (
                        <a
                            href={experience.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="h-16 w-40 relative flex-shrink-0 cursor-pointer hover:opacity-80 transition-opacity"
                        >
                            <Image 
                                src={experience.logo} 
                                alt={experience.company} 
                                fill 
                                className="object-contain object-left"
                            />
                        </a>
                    ) : (
                        <a
                            href={experience.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="h-12 w-12 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 hover:bg-white/10 transition-colors cursor-pointer"
                        >
                            <Briefcase className="h-6 w-6 text-neutral-400" />
                        </a>
                    )}
                    <div>
                        <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors font-heading">
                            {experience.role}
                        </h3>
                        <div className="flex items-center gap-3 text-neutral-400 mt-1.5">
                            {!experience.logo && <Briefcase className="h-4 w-4" />}
                            <span className="font-medium text-neutral-300 font-ui">{experience.company}</span>
                            
                            <div className="flex items-center gap-1.5 border-l border-white/10 pl-3 ml-1">
                                {experience.website && (
                                    <a 
                                        href={experience.website} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="p-1.5 rounded-md hover:bg-white/10 hover:text-blue-400 transition-all"
                                        title="Visit Website"
                                    >
                                        <ExternalLink className="h-5 w-5" />
                                    </a>
                                )}
                                {experience.linkedin && (
                                    <a 
                                        href={experience.linkedin} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="p-1.5 rounded-md hover:bg-white/10 hover:text-blue-400 transition-all"
                                        title="View LinkedIn"
                                    >
                                        <Linkedin className="h-5 w-5" />
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="flex flex-wrap items-center gap-2 w-fit h-fit">
                    <div className="font-code flex items-center gap-2 text-sm font-medium text-neutral-300 bg-white/10 px-4 py-1.5 rounded-full border border-white/5 shadow-sm">
                        <Calendar className="h-4 w-4 text-blue-400" />
                        {experience.period}
                    </div>
                    <div className="font-code flex items-center gap-1.5 text-xs font-semibold text-[#cf005d] bg-[#cf005d]/10 px-3 py-1.5 rounded-full border border-[#cf005d]/20">
                        <Clock className="h-3.5 w-3.5" />
                        {getDuration(experience.period)}
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                <ul className="space-y-2">
                    {experience.description.map((point, i) => (
                        <li key={i} className="text-sm text-neutral-400 leading-relaxed flex items-start gap-2">
                            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-500/50 flex-shrink-0" />
                            <span>
                                {point.split(/(\*\*.*?\*\*)/).map((part, index) => {
                                    if (part.startsWith('**') && part.endsWith('**')) {
                                        return (
                                            <span key={index} className="font-semibold text-white">
                                                {part.slice(2, -2)}
                                            </span>
                                        );
                                    }
                                    return <span key={index}>{part}</span>;
                                })}
                            </span>
                        </li>
                    ))}
                </ul>

                <div className="flex flex-wrap gap-2 pt-2">
                    {experience.techStack.map((tech) => (
                        <span 
                            key={tech} 
                            className="font-code px-2.5 py-1 text-xs font-medium text-blue-300 bg-blue-500/10 border border-blue-500/20 rounded-md"
                        >
                            {tech}
                        </span>
                    ))}
                </div>
            </div>
        </GlassCard>
    </motion.div>
  );
}
