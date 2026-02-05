"use client";

import { GlassCard } from "@/components/ui/glass-card";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer, PolarRadiusAxis } from "recharts";

interface TechRadarProps {
    data?: { subject: string; A: number; fullMark: number }[];
}

const defaultData = [
  { subject: 'Wait', A: 0, fullMark: 150 },
  { subject: 'Loading', A: 0, fullMark: 150 },
  { subject: 'Data', A: 0, fullMark: 150 },
];

export function TechRadar({ data = defaultData }: TechRadarProps) {
  return (
    <GlassCard className="p-6 h-full flex flex-col">
       <div className="mb-2">
        <h3 className="text-lg font-semibold text-white">Tech Stack Radar</h3>
        <p className="text-xs text-neutral-500">Proficiency Analysis (Based on GitHub)</p>
      </div>
      
      <div className="flex-1 min-h-[250px] -ml-4">
        <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
            <PolarGrid stroke="rgba(255,255,255,0.1)" />
            <PolarAngleAxis 
                dataKey="subject" 
                tick={{ fill: '#9ca3af', fontSize: 10 }} 
            />
            <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} axisLine={false} />
            <Radar
                name="Suraj"
                dataKey="A"
                stroke="#8b5cf6"
                strokeWidth={2}
                fill="#8b5cf6"
                fillOpacity={0.3}
            />
            </RadarChart>
        </ResponsiveContainer>
      </div>
    </GlassCard>
  );
}
