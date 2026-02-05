"use client";

import { GlassCard } from "@/components/ui/glass-card";
import { Github, Linkedin, Mail, MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import { 
    CodingStats, 
    fetchLeetCodeStats, 
    fetchCodeforcesStats, 
    fetchGFGStats 
} from "@/lib/coding-stats";
import { CodingStatsCard } from "@/components/profile/coding-stats-card";
import { LeetCodeIcon, CodeforcesIcon, GFGIcon } from "@/components/ui/icons";
import { motion } from "framer-motion";

interface ProfileViewProps {
  initialStats?: {
    leetCode: CodingStats | null;
    codeforces: CodingStats | null;
    gfg: CodingStats | null;
  };
}

export function ProfileView({ initialStats }: ProfileViewProps) {
  const [leetCode, setLeetCode] = useState<CodingStats | null>(initialStats?.leetCode || null);
  const [codeforces, setCodeforces] = useState<CodingStats | null>(initialStats?.codeforces || null);
  const [gfg, setGfg] = useState<CodingStats | null>(initialStats?.gfg || null);

  useEffect(() => {
    
    if (initialStats) return;

    async function fetchStats() {
      try {
        const [lc, cf, gg] = await Promise.all([
          fetchLeetCodeStats("aryasuraj351"),
          fetchCodeforcesStats("aryasuraj351"),
          fetchGFGStats("aryasuryv2d")
        ]);
        setLeetCode(lc);
        setCodeforces(cf);
        setGfg(gg);
      } catch (error) {
        console.error("Failed to fetch coding stats", error);
      }
    }
    fetchStats();
  }, [initialStats]);

  return (
    <div className="space-y-6">
      <div className="text-center md:text-left">
        <h1 className="text-3xl font-bold text-white">Profile</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        { }
        <motion.div 
          className="md:col-span-1"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
            <GlassCard className="h-full p-8 flex flex-col items-center text-center relative overflow-hidden">
             <div className="absolute inset-0 bg-blue-500/5 blur-3xl rounded-full opacity-20" />
              <div className="relative z-10 w-full flex flex-col items-center">
                  <div className="relative mb-6">
                      <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full" />
                      <img 
                        src="/profile.jpg" 
                        alt="Profile" 
                        className="relative h-32 w-32 rounded-full object-cover border-4 border-white/10 shadow-2xl"
                      />
                  </div>
                  <h2 className="mt-2 text-2xl font-bold text-white">Suraj Arya</h2>
                  <p className="text-blue-400 font-medium mb-4">Full Stack Developer</p>
                  <p className="text-sm text-neutral-400 leading-relaxed px-2">
                    Passionate developer with expertise in building modern web applications.
                    Love working with React, Next.js, and TypeScript.
                  </p>
                  
                  <div className="m-8 flex gap-4">
                    <a href="https://github.com/surajarya0007" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors border border-white/10 hover:scale-105 transform duration-200">
                      <Github className="h-5 w-5" />
                    </a>
                    <a href="https://www.linkedin.com/in/suraj-arya-bba885213/" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors border border-white/10 hover:scale-105 transform duration-200">
                      <Linkedin className="h-5 w-5" />
                    </a>
                    <a href="mailto:aryasuraj351@gmail.com" className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors border border-white/10 hover:scale-105 transform duration-200">
                      <Mail className="h-5 w-5" />
                    </a>
                  </div>

                   <div className="mt-auto w-full border-t border-white/10 pt-6 mt-8">
                    <div className="flex items-center gap-3 text-sm text-neutral-400 justify-center">
                       <MapPin className="h-4 w-4" />
                       <span>New Delhi, India</span>
                    </div>
                  </div>
              </div>
            </GlassCard>
        </motion.div>

        { }
        <motion.div 
          className="md:col-span-2"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
        >
            <h3 className="text-xl font-bold text-white mb-6">Competitive Programming</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                { }
                <CodingStatsCard 
                    stats={leetCode || { platform: 'LeetCode', username: 'aryasuraj351', solved: 0, profileUrl: 'https://leetcode.com/aryasuraj351/' }}
                    icon={<LeetCodeIcon className="h-full w-full" />}
                    color="text-yellow-500"
                    delay={0.3}
                />
                
                { }
                <CodingStatsCard 
                    stats={codeforces || { platform: 'Codeforces', username: 'aryasuraj351', solved: 0, profileUrl: 'https://codeforces.com/profile/aryasuraj351' }}
                    icon={<CodeforcesIcon className="h-full w-full" />}
                    color="text-blue-500"
                    delay={0.4}
                />

                { }
                <CodingStatsCard 
                    stats={gfg || { platform: 'GeeksForGeeks', username: 'aryasuryv2d', solved: 0, profileUrl: 'https://auth.geeksforgeeks.org/user/aryasuryv2d/' }}
                    icon={<GFGIcon className="h-full w-full" />}
                    color="text-green-500"
                    delay={0.5}
                />
            </div>
        </motion.div>
      </div>
    </div>
  );
}
