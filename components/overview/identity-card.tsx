"use client";

import { GlassCard } from "@/components/ui/glass-card";
import { Download, User } from "lucide-react";
import Image from "next/image";

interface IdentityCardProps {
  name?: string;
  bio?: string;
  avatarUrl?: string;
  profileUrl?: string;
  resumeUrl?: string;
}

export function IdentityCard({ name = "Suraj", bio = "Full Stack Engineer", avatarUrl, profileUrl, resumeUrl }: IdentityCardProps) {
  return (
    <GlassCard className="p-6 h-full flex flex-col items-center justify-center text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 to-transparent opacity-50" />
      <div className="relative z-10 flex flex-col items-center">
        <div className="h-40 w-40 rounded-full bg-neutral-800 border-4 border-white/10 flex items-center justify-center mb-6 overflow-hidden relative shadow-2xl">
           {avatarUrl ? (
             <Image src={avatarUrl} alt={name} fill className="object-cover" />
           ) : (
             <User className="h-16 w-16 text-neutral-400" />
           )}
        </div>
        <h2 className="text-4xl font-bold text-white mb-2">{name}</h2>
        <p className="text-blue-400 font-medium text-xl mb-6">Full Stack Engineer</p>
        <p className="text-neutral-400 text-base mb-8 px-6 line-clamp-3 leading-relaxed">{bio}</p>
        
        <div className="flex gap-3">
            {resumeUrl ? (
                <a 
                    href={resumeUrl}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full font-bold hover:bg-neutral-200 transition-colors text-base shadow-lg hover:shadow-xl hover:scale-105 transform duration-200"
                >
                    <Download className="h-4 w-4" />
                    Resume
                </a>
            ) : (
                <button className="flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full font-bold hover:bg-neutral-200 transition-colors text-base shadow-lg hover:shadow-xl hover:scale-105 transform duration-200">
                    <Download className="h-4 w-4" />
                    Resume
                </button>
            )}
            
             {profileUrl && (
                <a href={profileUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-white/10 text-white px-6 py-3 rounded-full font-bold hover:bg-white/20 transition-colors text-base shadow-lg hover:shadow-xl hover:scale-105 transform duration-200">
                    GitHub
                </a>
            )}
        </div>
      </div>
    </GlassCard>
  );
}
