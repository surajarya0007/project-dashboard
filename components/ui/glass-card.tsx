"use client";

import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  gradient?: boolean;
}

export function GlassCard({ children, className, ...props }: GlassCardProps) {
  return (
    <div
      className={cn(
        "relative rounded-xl overflow-hidden group",
        
        "backdrop-blur-md saturate-200", 
        "bg-gradient-to-br from-white/1 to-white/5", 
        
        
        "shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2),inset_0_0_0_1px_rgba(255,255,255,0.1)]",
        
        
        "shadow-lg", 
        className
      )}
      {...props}
    >
      { }
      <div className={cn("relative z-10", className?.includes("h-full") && "h-full", className?.includes("flex") && "flex flex-col")}>
        {children}
      </div>
    </div>
  );
}
