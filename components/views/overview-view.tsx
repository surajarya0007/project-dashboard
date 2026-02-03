import { GlassCard } from "@/components/ui/glass-card";

export function OverviewView() {
  return (
    <div className="space-y-6">
      <div className="text-center md:text-left">
        <h1 className="text-3xl font-bold text-white">Overview</h1>
        <p className="mt-2 text-neutral-400">Welcome to your dashboard</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <GlassCard className="p-6">
          <div className="text-sm font-medium text-neutral-400">Total Projects</div>
          <div className="mt-2 text-3xl font-bold text-white">12</div>
          <div className="mt-1 text-xs text-neutral-500">+2 from last month</div>
        </GlassCard>
        <GlassCard className="p-6">
          <div className="text-sm font-medium text-neutral-400">Competitions</div>
          <div className="mt-2 text-3xl font-bold text-white">8</div>
          <div className="mt-1 text-xs text-neutral-500">3 active</div>
        </GlassCard>
        <GlassCard className="p-6">
          <div className="text-sm font-medium text-neutral-400">Profile Views</div>
          <div className="mt-2 text-3xl font-bold text-white">1,234</div>
          <div className="mt-1 text-xs text-neutral-500">+18% this week</div>
        </GlassCard>
      </div>

      <GlassCard className="p-6">
        <h2 className="text-lg font-semibold text-white">Recent Activity</h2>
        <div className="mt-4 space-y-4">
          <div className="flex items-center gap-4">
            <div className="h-2 w-2 rounded-full bg-green-500" />
            <div className="flex-1">
              <div className="text-sm font-medium text-white">New project created</div>
              <div className="text-xs text-neutral-500">2 hours ago</div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="h-2 w-2 rounded-full bg-blue-500" />
            <div className="flex-1">
              <div className="text-sm font-medium text-white">Joined a competition</div>
              <div className="text-xs text-neutral-500">1 day ago</div>
            </div>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}
