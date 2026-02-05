"use client";

import { GlassCard } from "@/components/ui/glass-card";
import { GitCommit, GitPullRequest } from "lucide-react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

interface GithubVitalsProps {
    languageData?: { name: string; value: number; color?: string }[];
    commits?: { message: string; time: string }[];
    totalCommits?: number;
    publicRepos?: number;
}

const COLORS = ['#3178C6', '#3776AB', '#00599C', '#F7DF1E', '#E34F26', '#563D7C'];

const defaultLanguageData = [
  { name: "TypeScript", value: 45 },
  { name: "Python", value: 30 },
  { name: "C++", value: 25 },
];

export function GithubVitals({ languageData = defaultLanguageData, commits = [], totalCommits = 1842, publicRepos = 142 }: GithubVitalsProps) {
  
  const dataWithColors = languageData.map((item, index) => ({
      ...item,
      color: COLORS[index % COLORS.length]
  }));

  return (
    <GlassCard className="p-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse"/>
            GitHub Vitals
        </h3>
        <span className="text-xs text-neutral-500 font-mono">LIVE</span>
      </div>

      <div className="flex-1 flex flex-col md:flex-row gap-6 items-center">
        { }
        <div className="h-40 w-40 relative flex-shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={dataWithColors}
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
                stroke="none"
              >
                {dataWithColors.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333', borderRadius: '8px' }}
                itemStyle={{ color: '#fff' }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex items-center justify-center flex-col pointer-events-none">
              <span className="text-2xl font-bold text-white">Full</span>
              <span className="text-xs text-neutral-500">Stack</span>
          </div>
        </div>

        { }
        <div className="flex-1 space-y-4 w-full min-w-0">
            <div className="grid grid-cols-2 gap-2">
                <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                    <div className="text-xs text-neutral-400 mb-1">Public Repos</div>
                    <div className="text-xl font-bold text-white flex items-center gap-2">
                        {publicRepos}
                        <GitCommit className="h-4 w-4 text-neutral-500" />
                    </div>
                </div>
                 <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                    <div className="text-xs text-neutral-400 mb-1">Contributions (1y)</div>
                    <div className="text-xl font-bold text-white flex items-center gap-2">
                        {totalCommits}+
                         <GitPullRequest className="h-4 w-4 text-neutral-500" />
                    </div>
                </div>
            </div>

            <div className="space-y-2">
                <div className="text-xs text-neutral-500 font-medium">TOP LANGUAGES</div>
                <div className="space-y-1">
                    {languageData.slice(0, 4).map((lang, i) => {
                         const total = languageData.reduce((acc, curr) => acc + curr.value, 0);
                         const percentage = Math.round((lang.value / total) * 100);
                         
                         return (
                            <div key={i} className="flex justify-between items-center text-xs">
                                <span className="flex items-center gap-2 text-neutral-300">
                                    <span className="h-2 w-2 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                                    {lang.name}
                                </span>
                                <span className="text-neutral-500 font-mono">{percentage}%</span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
      </div>
    </GlassCard>
  );
}
