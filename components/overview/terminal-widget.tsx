"use client";

import { GlassCard } from "@/components/ui/glass-card";
import { Terminal as TerminalIcon } from "lucide-react";
import { useState, useRef, useEffect } from "react";

type Message = {
    type: 'input' | 'output' | 'system';
    text: string;
}

export function TerminalWidget() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<Message[]>([
    { type: 'system', text: 'Welcome to SurajOS v1.0.0' },
    { type: 'system', text: 'Type "help" for available commands.' },
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    const newHistory = [...history, { type: 'input', text: cmd } as Message];

    switch (trimmedCmd) {
        case 'help':
            newHistory.push({ type: 'output', text: 'Available commands:\n  about     - Who am I?\n  contact   - Get in touch\n  skills    - Tech stack info\n  clear     - Clear terminal' });
            break;
        case 'about':
             newHistory.push({ type: 'output', text: 'Full Stack Engineer with a passion for building beautiful, high-performance web applications.' });
            break;
        case 'contact':
             newHistory.push({ type: 'output', text: 'Email: hello@suraj.dev\nGitHub: @suraj-dev' });
            break;
         case 'skills':
             newHistory.push({ type: 'output', text: 'Frontend: React, Next.js, Tailwind\nBackend: Node.js, Python, PostgreSQL' });
            break;
        case 'clear':
            setHistory([]);
            setInput("");
            return;
        default:
            newHistory.push({ type: 'output', text: `Command not found: ${trimmedCmd}` });
    }

    setHistory(newHistory);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
        handleCommand(input);
    }
  };

  return (
    <GlassCard className="p-0 h-full flex flex-col overflow-hidden bg-black/80 backdrop-blur-xl border-white/10 font-mono">
       <div className="flex items-center gap-2 p-3 bg-white/5 border-b border-white/5">
        <div className="flex gap-1.5">
            <div className="h-3 w-3 rounded-full bg-red-500/80" />
            <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
            <div className="h-3 w-3 rounded-full bg-green-500/80" />
        </div>
        <div className="flex-1 text-center text-xs text-neutral-500 flex items-center justify-center gap-2">
             <TerminalIcon className="h-3 w-3" />
             suraj @ macbook-pro
        </div>
      </div>

      <div className="flex-1 p-4 overflow-y-auto text-sm space-y-2 scrollbar-hide" ref={scrollRef}>
        {history.map((msg, i) => (
             <div key={i} className={`${msg.type === 'input' ? 'text-white' : msg.type === 'system' ? 'text-blue-400' : 'text-neutral-300'} whitespace-pre-wrap`}>
                {msg.type === 'input' && <span className="text-green-500 mr-2">$</span>}
                {msg.text}
            </div>
        ))}
         <div className="flex items-center">
            <span className="text-green-500 mr-2">$</span>
            <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="bg-transparent border-none outline-none text-white w-full focus:ring-0 placeholder-neutral-600"
                placeholder="..."
                autoFocus
            />
        </div>
      </div>
    </GlassCard>
  );
}
