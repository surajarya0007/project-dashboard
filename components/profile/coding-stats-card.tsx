"use client";

import { GlassCard } from "@/components/ui/glass-card";
import { CodingStats } from "@/lib/coding-stats";
import { Code2, ExternalLink, Trophy, TrendingUp } from "lucide-react";
import { motion, Variants } from "framer-motion";

interface CodingStatsCardProps {
  stats: CodingStats;
  icon: React.ReactNode;
  color: string;
  delay?: number;
}

export function CodingStatsCard({ stats, icon, color, delay = 0 }: CodingStatsCardProps) {
  const containerVars: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: delay,
      },
    },
  };

  const itemVars: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    },
  };

  return (
    <GlassCard className="p-6 flex flex-col h-full relative overflow-hidden group hover:scale-[1.02] transition-transform duration-300">
      <motion.div
        variants={containerVars}
        initial="hidden"
        animate="visible"
        className="flex flex-col h-full"
      >
        { }
        <motion.div variants={itemVars} className="flex items-center gap-4 mb-6">
          <div className={`h-16 w-16 rounded-xl flex items-center justify-center bg-white/5 border border-white/10 ${color} shrink-0`}>
              <div className="h-8 w-8">
                  {icon}
              </div>
          </div>
          <div>
              <h3 className="text-xl font-bold text-white leading-tight">{stats.platform}</h3>
              <p className="text-sm text-neutral-400">@{stats.username}</p>
          </div>
        </motion.div>

        { }
        <motion.div variants={itemVars} className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white/5 rounded-lg p-3 border border-white/5">
              <div className="flex items-center gap-2 text-neutral-400 text-xs mb-1">
                  <Code2 className="h-3 w-3" />
                  <span>Solved</span>
              </div>
              <div className="text-xl font-bold text-white">{stats.solved}</div>
          </div>

          {(stats.rating || stats.globalRank) && (
                  <div className="bg-white/5 rounded-lg p-3 border border-white/5">
                  <div className="flex items-center gap-2 text-neutral-400 text-xs mb-1">
                      {stats.rating ? <TrendingUp className="h-3 w-3" /> : <Trophy className="h-3 w-3" />}
                      <span>{stats.rating ? "Rating" : "Rank"}</span>
                  </div>
                  <div className="text-xl font-bold text-white">
                      {stats.rating || `#${stats.globalRank}`}
                  </div>
              </div>
          )}
        </motion.div>
        
        { }
        {stats.achievements && stats.achievements.length > 0 && (
              <motion.div variants={itemVars} className="space-y-2 mb-6 flex-grow">
                  <div className="flex flex-wrap gap-2">
                      {stats.achievements.slice(0, 3).map((achievement, i) => (
                          <span key={i} className="text-[10px] px-2 py-1 rounded-full bg-white/5 text-neutral-300 border border-white/5">
                              {achievement}
                          </span>
                      ))}
                  </div>
              </motion.div>
          )}

        { }
        <motion.a 
          variants={itemVars}
          href={stats.profileUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className={`mt-auto w-full p-3 rounded-xl flex items-center justify-center gap-2 font-medium transition-all duration-300 border border-white/10 hover:brightness-110 active:scale-95 bg-white/5 hover:bg-white/10 text-white`}
        >
          <span>View Profile</span>
          <ExternalLink className="h-4 w-4 opacity-70" />
        </motion.a>
      </motion.div>
    </GlassCard>
  );
}
