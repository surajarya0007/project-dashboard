import { GlassCard } from "@/components/ui/glass-card";

export function CompetitionView() {
  const competitions = [
    { name: "Web3 Hackathon 2024", date: "March 15-17, 2024", status: "Upcoming" },
    { name: "AI Challenge", date: "February 1-3, 2024", status: "Active" },
    { name: "Design Sprint", date: "January 20-22, 2024", status: "Completed" },
  ];

  return (
    <div className="space-y-6">
      <div className="text-center md:text-left">
        <h1 className="text-3xl font-bold text-white">Competition</h1>
        <p className="mt-2 text-neutral-400">Track your competitions and challenges</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {competitions.map((comp, index) => (
          <GlassCard key={index} className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white">{comp.name}</h3>
                <p className="mt-1 text-sm text-neutral-400">{comp.date}</p>
              </div>
              <span
                className={`rounded-full px-3 py-1 text-xs font-medium ${
                  comp.status === "Active"
                    ? "bg-green-500/10 text-green-500"
                    : comp.status === "Upcoming"
                    ? "bg-blue-500/10 text-blue-500"
                    : "bg-neutral-500/10 text-neutral-500"
                }`}
              >
                {comp.status}
              </span>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
