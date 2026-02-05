"use client";

import { ExperienceCard } from "@/components/experience/experience-card";
import { EXPERIENCES } from "@/data/experience";

export function ExperienceView() {
  return (
    <div className="space-y-6">
      <div className="text-center md:text-left mb-8">
        <h1 className="text-3xl font-bold text-white">Experience</h1>
        <p className="mt-2 text-neutral-400">Professional Journey & Career Highlights</p>
      </div>

      <div className="grid gap-6">
        {EXPERIENCES.map((exp) => (
            <ExperienceCard key={exp.id} experience={exp} />
        ))}
      </div>
    </div>
  );
}
