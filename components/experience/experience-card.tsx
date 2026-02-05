import { GlassCard } from "@/components/ui/glass-card";
import { ExperienceItem } from "@/data/experience";
import { Briefcase, Calendar, ExternalLink, Linkedin } from "lucide-react";
import Image from "next/image";

interface ExperienceCardProps {
    experience: ExperienceItem;
}

export function ExperienceCard({ experience }: ExperienceCardProps) {
    return (
        <GlassCard className="p-6 transition-all duration-300 hover:scale-[1.01] hover:bg-white/10 group">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                <div className="flex gap-4">
                    {experience.logo ? (
                        <div className="h-16 w-40 relative flex-shrink-0">
                            <Image 
                                src={experience.logo} 
                                alt={experience.company} 
                                fill 
                                className="object-contain object-left"
                            />
                        </div>
                    ) : (
                        <div className="h-12 w-12 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                            <Briefcase className="h-6 w-6 text-neutral-400" />
                        </div>
                    )}
                    <div>
                        <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                            {experience.role}
                        </h3>
                        <div className="flex items-center gap-3 text-neutral-400 mt-1">
                            {!experience.logo && <Briefcase className="h-4 w-4" />}
                            <span className="font-medium text-neutral-300">{experience.company}</span>
                            
                            <div className="flex items-center gap-2 border-l border-white/10 pl-3 ml-1">
                                {experience.website && (
                                    <a 
                                        href={experience.website} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="hover:text-blue-400 transition-colors"
                                        title="Visit Website"
                                    >
                                        <ExternalLink className="h-4 w-4" />
                                    </a>
                                )}
                                {experience.linkedin && (
                                    <a 
                                        href={experience.linkedin} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="hover:text-blue-400 transition-colors"
                                        title="View LinkedIn"
                                    >
                                        <Linkedin className="h-4 w-4" />
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="flex items-center gap-2 text-sm font-medium text-neutral-300 bg-white/10 px-4 py-1.5 rounded-full w-fit h-fit border border-white/5 shadow-sm">
                    <Calendar className="h-4 w-4 text-blue-400" />
                    {experience.period}
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
                            className="px-2.5 py-1 text-xs font-medium text-blue-300 bg-blue-500/10 border border-blue-500/20 rounded-md"
                        >
                            {tech}
                        </span>
                    ))}
                </div>
            </div>
        </GlassCard>
    );
}
