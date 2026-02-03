"use client";

import { Sidebar } from "./sidebar";

interface AppShellProps {
  children: React.ReactNode;
  currentView: string;
  onNavigate: (view: string) => void;
}

export function AppShell({ children, currentView, onNavigate }: AppShellProps) {
  return (
    <div className="relative flex min-h-screen z-10">
      <Sidebar currentView={currentView} onNavigate={onNavigate} />
      <main className="flex-1 p-4 md:ml-64 md:p-8">
        {children}
      </main>
    </div>
  );
}
