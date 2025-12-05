import { useState } from 'react';

export default function About() {
  const [open, setOpen] = useState(true);

  if (!open) return null;

  return (
    <div className="relative lg:absolute lg:bottom-6 lg:right-15 w-full max-w-sm lg:max-w-xs bg-gradient-to-br from-zinc-800 to-zinc-900 border border-zinc-700 shadow-xl rounded-xl p-5 text-sm text-zinc-300 animate-in fade-in duration-300 flex flex-col gap-4">
      <button
        onClick={() => setOpen(false)}
        className="absolute top-2 right-2 text-zinc-400 hover:text-white transition-colors"
        aria-label="Close"
      >
        ✕
      </button>

      <h3 className="text-lg font-semibold text-white">About SafestCode</h3>

      <p className="leading-relaxed text-zinc-200">
        SafestCode is an AI-powered tool for reviewing, debugging, and securing
        code — designed to help developers write better, safer software, faster.
      </p>

      <div className="border-t border-zinc-700 pt-3 flex items-center gap-3">
        <a
          href="https://github.com/ziglacity"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 hover:scale-105 transition-transform"
        >
          <img
            src="/zigla.png"
            alt="Zigla City"
            className="w-10 h-10 rounded-full border border-zinc-600"
          />
          <div className="flex flex-col">
            <span className="font-medium text-white hover:underline">
              Zigla City
            </span>
            <span className="text-xs text-zinc-400">
              Software & Cybersecurity Engineer
            </span>
          </div>
        </a>
      </div>
    </div>
  );
}
