"use client";

import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  gradient?: boolean;
}

export function GlassCard({ children, className, gradient = false, ...props }: GlassCardProps) {
  return (
    <div
      className={cn(
        "relative rounded-xl overflow-hidden group",
        // Apple-style Glass Material
        "backdrop-blur-md saturate-200", // Strong blur and high saturation for 'vibrancy'
        "bg-gradient-to-br from-white/1 to-white/5", // Directional light gradient
        
        // Crisp glass edge (bezel) - using overlapping shadows for depth
        "shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2),inset_0_0_0_1px_rgba(255,255,255,0.1)]",
        
        // Soft drop shadow for elevation
        "shadow-lg", 
        className
      )}
      {...props}
    >
      {/* Content wrapper */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
