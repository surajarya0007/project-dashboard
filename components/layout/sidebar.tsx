"use client";

import { cn } from "@/lib/utils";
import { Home, Layout, Trophy, User, X, Menu } from "lucide-react";
import { useState } from "react";

interface SidebarProps {
  currentView: string;
  onNavigate: (view: string) => void;
}

const navItems = [
  { id: "overview", label: "Overview", icon: Home },
  { id: "projects", label: "Projects", icon: Layout },
  { id: "competition", label: "Competition", icon: Trophy },
  { id: "profile", label: "Profile", icon: User },
];

export function Sidebar({ currentView, onNavigate }: SidebarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavigation = (view: string) => {
    onNavigate(view);
    setIsMobileMenuOpen(false); // Close menu after navigation on mobile
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="fixed top-4 left-4 z-50 p-2 bg-neutral-800 rounded-lg md:hidden"
      >
        {isMobileMenuOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <Menu className="w-6 h-6 text-white" />
        )}
      </button>

      {/* Overlay for mobile */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-40 h-screen w-64 border-r border-neutral-800 bg-black transition-transform duration-300",
          "md:translate-x-0", // Always visible on desktop
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full" // Toggle on mobile
        )}
      >
        {/* Brand */}
        <div className="flex h-16 items-center border-b border-neutral-800 px-6">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-black to-[#cf005d]" />
            <span className="text-lg font-bold text-white">Dashboard</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="space-y-1 p-4">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavigation(item.id)}
              className={cn(
                "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                currentView === item.id
                  ? "bg-gradient-to-r from-black to-[#cf005d] text-white shadow-lg"
                  : "text-neutral-400 hover:bg-neutral-900 hover:text-white"
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </button>
          ))}
        </nav>

        {/* User Info */}
        <div className="absolute bottom-0 left-0 right-0 border-t border-neutral-800 p-4">
          <a
            href="https://suraj-cyan.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 hover:bg-neutral-900 rounded-lg p-2 -m-2 transition-colors"
          >
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-black to-[#cf005d]" />
            <div className="flex flex-col">
              <span className="text-sm font-medium text-white">Suraj</span>
              <span className="text-xs text-neutral-500">Developer</span>
            </div>
          </a>
        </div>
      </aside>
    </>
  );
}
