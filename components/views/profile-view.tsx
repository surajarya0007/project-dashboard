import { GlassCard } from "@/components/ui/glass-card";
import { Github, Linkedin, Mail, MapPin } from "lucide-react";

export function ProfileView() {
  return (
    <div className="space-y-6">
      <div className="text-center md:text-left">
        <h1 className="text-3xl font-bold text-white">Profile</h1>
        <p className="mt-2 text-neutral-400">Your personal information and settings</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-1">
          <GlassCard className="p-6">
            <div className="flex flex-col items-center">
              <div className="h-24 w-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg" />
              <h2 className="mt-4 text-xl font-bold text-white">Suraj</h2>
              <p className="text-sm text-neutral-400">Full Stack Developer</p>
              
              <div className="mt-6 flex gap-3">
                <a href="#" className="rounded-full bg-white/5 border border-white/10 p-2 text-white hover:bg-white/10 transition-colors">
                  <Github className="h-5 w-5" />
                </a>
                <a href="#" className="rounded-full bg-white/5 border border-white/10 p-2 text-white hover:bg-white/10 transition-colors">
                  <Linkedin className="h-5 w-5" />
                </a>
                <a href="#" className="rounded-full bg-white/5 border border-white/10 p-2 text-white hover:bg-white/10 transition-colors">
                  <Mail className="h-5 w-5" />
                </a>
              </div>
            </div>
          </GlassCard>
        </div>

        <div className="md:col-span-2">
          <div className="space-y-4">
            <GlassCard className="p-6">
              <h3 className="text-lg font-semibold text-white">About</h3>
              <p className="mt-2 text-sm text-neutral-400 leading-relaxed">
                Passionate developer with expertise in building modern web applications.
                Love working with React, Next.js, and TypeScript.
              </p>
            </GlassCard>

            <GlassCard className="p-6">
              <h3 className="text-lg font-semibold text-white">Contact Information</h3>
              <div className="mt-4 space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="h-4 w-4 text-neutral-400" />
                  <span className="text-neutral-300">suraj@example.com</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <MapPin className="h-4 w-4 text-neutral-400" />
                  <span className="text-neutral-300">New Delhi, India</span>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </div>
  );
}
