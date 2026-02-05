"use client";

import { ActivityHeatmap } from "@/components/overview/activity-heatmap";
import { GithubVitals } from "@/components/overview/github-vitals";
import { IdentityCard } from "@/components/overview/identity-card";
import { TerminalWidget } from "@/components/overview/terminal-widget";
import { 
    getGithubProfile, 
    getGithubRepos, 
    getGithubEvents, 
    getGithubContributions,
    processLanguageData, 
    GithubProfile, 
    GithubEvent, 
    GithubRepo,
    GithubContributionDay 
} from "@/lib/github";
import { useEffect, useState } from "react";

export function OverviewView() {
  const [profile, setProfile] = useState<GithubProfile | null>(null);
  const [languageData, setLanguageData] = useState<{ name: string; value: number }[]>([]);
  const [commits, setCommits] = useState<{ message: string; time: string }[]>([]);
  const [totalCommits, setTotalCommits] = useState(0);
  const [heatmapData, setHeatmapData] = useState<GithubContributionDay[]>([]);
  const [publicRepos, setPublicRepos] = useState(0); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [profileData, reposData, eventsData, contributionsData] = await Promise.all([
          getGithubProfile(),
          getGithubRepos(),
          getGithubEvents(),
          getGithubContributions()
        ]);

        if (profileData) setProfile(profileData);
        if (reposData) {
            setLanguageData(processLanguageData(reposData));
            setPublicRepos(reposData.length);
        }
        
        if (eventsData) {
            
            const pushEvents = eventsData.filter((e: GithubEvent) => e.type === "PushEvent");
            const recentCommits = pushEvents.flatMap((e: GithubEvent) => 
                e.payload.commits?.map(c => ({
                    message: c.message,
                    time: new Date(e.created_at).toLocaleDateString()
                })) || []
            ).slice(0, 5);
            setCommits(recentCommits);
        }

        if (contributionsData) {
            setHeatmapData(contributionsData.contributions);
            
            const lastYearTotal = Object.values(contributionsData.total).reduce((a, b) => a + b, 0); 
            
            setTotalCommits(contributionsData.total.lastYear || lastYearTotal);
        }

      } catch (error) {
        console.error("Failed to fetch GitHub data", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="space-y-6">
      <div className="text-center md:text-left mb-8">
        <h1 className="text-3xl font-bold text-white">Overview</h1>
        <p className="mt-2 text-neutral-400">Engineering Metrics & Performance</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        { }
        <div className="md:col-span-1 md:row-span-2 h-full min-h-[500px]">
            <IdentityCard 
                name={profile?.name || "Suraj"}
                bio={profile?.bio || "Full Stack Engineer"}
                avatarUrl="/profile.jpg"
                profileUrl={profile?.html_url}
                resumeUrl="https://drive.google.com/file/d/1Rg6jn15cQXHk06wW0U848LLnprFx9GiO/view?usp=sharing"
            />
        </div>

        { }
        <div className="md:col-span-2 h-[280px]">
            <GithubVitals 
                languageData={languageData.length > 0 ? languageData : undefined}
                commits={commits}
                totalCommits={totalCommits}
                publicRepos={publicRepos || profile?.public_repos}
            />
        </div>

        { }
        <div className="md:col-span-2 h-[200px]">
             <ActivityHeatmap 
                data={heatmapData} 
                total={totalCommits}
             />
        </div>

        { }
        <div className="md:col-span-3 h-[300px]">
            <TerminalWidget />
        </div>
      </div>
    </div>
  );
}
