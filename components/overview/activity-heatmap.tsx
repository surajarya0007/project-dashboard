"use client";

import { GlassCard } from "@/components/ui/glass-card";
import { GithubContributionDay } from "@/lib/github";
import { cn } from "@/lib/utils";
import { Flame } from "lucide-react";

interface ActivityHeatmapProps {
    data?: GithubContributionDay[];
    total?: number;
}

export function ActivityHeatmap({ data, total }: ActivityHeatmapProps) {
    const weeksToDisplay = 53;
    const daysToDisplay = weeksToDisplay * 7;
    
    // Ensure we have at least 371 days of data or pad with empty
    const recentData = data ? data.slice(-daysToDisplay) : Array(daysToDisplay).fill({ count: 0, level: 0, date: "" });
    
    // Group by weeks for easier rendering (7 days per column)
    const weeks: any[][] = [];
    for (let i = 0; i < recentData.length; i += 7) {
        weeks.push(recentData.slice(i, i + 7));
    }

    // Helper to get month labels
    const getMonthLabels = () => {
        const labels: { name: string; index: number }[] = [];
        let currentMonth = -1;
        
        weeks.forEach((week, weekIndex) => {
            const firstDay = week[0];
            if (!firstDay || !firstDay.date) return;
            
            const date = new Date(firstDay.date);
            const month = date.getMonth();
            
            // Show label if it's a new month and we have space (skip first week if it starts late in month)
            if (month !== currentMonth) {
                labels.push({ name: date.toLocaleString('default', { month: 'short' }), index: weekIndex });
                currentMonth = month;
            }
        });
        return labels;
    };

    const monthLabels = getMonthLabels();

    const getColor = (level: number) => {
        switch (level) {
            case 1: return "bg-green-900/40";
            case 2: return "bg-green-700/60";
            case 3: return "bg-green-500/80";
            case 4: return "bg-green-400";
            default: return "bg-white/5";
        }
    };

  return (
    <GlassCard className="p-4 h-full flex flex-col">
       <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold text-white flex items-center gap-2">
            <Flame className="h-4 w-4 text-orange-500" />
            The Green Wall
        </h3>
        <div className="text-[10px] text-neutral-500">
            {total ? `${total} contributions (1y)` : `Last year`}
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center w-full overflow-x-auto">
        <div className="flex flex-col gap-1 min-w-max">
            {/* Month Labels */}
            <div className="flex text-[10px] text-neutral-500 mb-1 relative h-4">
                {monthLabels.map((label, i) => (
                    <span 
                        key={i} 
                        className="absolute"
                        style={{ left: `${label.index * 14}px` }} // 14px approx width of week col (10px + gap)
                    >
                        {label.name}
                    </span>
                ))}
            </div>

            <div className="flex gap-2">
                {/* Day Labels */}
                <div className="flex flex-col justify-between text-[9px] text-neutral-600 pb-2 h-[88px] leading-3 py-[2px]">
                    <span>Mon</span>
                    <span>Wed</span>
                    <span>Fri</span>
                </div>

                {/* Grid */}
                {data ? (
                    <div className="flex gap-[3px]">
                        {weeks.map((week, wIndex) => (
                            <div key={wIndex} className="flex flex-col gap-[3px]">
                                {week.map((day, dIndex) => (
                                    <div 
                                        key={dIndex} 
                                        className={cn(
                                            "h-2.5 w-2.5 rounded-[2px] transition-colors duration-200",
                                            getColor(day?.level || 0)
                                        )}
                                        title={`${day?.date}: ${day?.count} contributions`}
                                    />
                                ))}
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex items-center justify-center h-[90px] w-full">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-green-500" />
                    </div>
                )}
            </div>
        </div>
      </div>
    </GlassCard>
  );
}
