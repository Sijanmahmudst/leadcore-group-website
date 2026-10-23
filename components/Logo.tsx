import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
  className?: string;
  isLink?: boolean;
}

export function Logo({
  size = 'md',
  showTagline = false,
  className = '',
  isLink = true,
}: LogoProps) {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-11 h-11',
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
  };

  const content = (
    <div className={`inline-flex items-center gap-3 select-none group ${className}`}>
      {/* Custom Geometric Icon: Interconnected Data Nodes + Precision Core Target */}
      <div className={`relative flex items-center justify-center ${iconSizes[size]} shrink-0 transition-transform duration-300 group-hover:scale-105`}>
        {/* Glow ambient background */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-blue-600/40 via-cyan-500/30 to-blue-400/20 blur-sm -z-10" />
        
        {/* SVG Geometric Mark */}
        <svg
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-[0_0_12px_rgba(6,182,212,0.4)]"
          aria-label="LeadCore Group geometric data logo"
        >
          {/* Hexagonal container with electric border */}
          <rect
            x="2"
            y="2"
            width="36"
            height="36"
            rx="9"
            fill="#091122"
            stroke="url(#lcg-border-gradient)"
            strokeWidth="1.5"
          />

          {/* Connected Network Lines */}
          <path
            d="M12 20L20 12M20 12L28 20M28 20L20 28M20 28L12 20"
            stroke="url(#lcg-cyan-blue)"
            strokeWidth="1.5"
            strokeDasharray="2 2"
            opacity="0.8"
          />
          <path
            d="M20 8V32M8 20H32"
            stroke="#1E293B"
            strokeWidth="1"
            opacity="0.6"
          />

          {/* 4 Outer Data Nodes */}
          <circle cx="20" cy="12" r="2.5" fill="#38BDF8" />
          <circle cx="28" cy="20" r="2.5" fill="#2563EB" />
          <circle cx="20" cy="28" r="2.5" fill="#06B6D4" />
          <circle cx="12" cy="20" r="2.5" fill="#38BDF8" />

          {/* Central Target Core */}
          <circle cx="20" cy="20" r="4.5" fill="#0A162D" stroke="#00D4FF" strokeWidth="1.5" />
          <circle cx="20" cy="20" r="2" fill="#FFFFFF" />

          {/* Linear Gradients */}
          <defs>
            <linearGradient id="lcg-border-gradient" x1="2" y1="2" x2="38" y2="38" gradientUnits="userSpaceOnUse">
              <stop stopColor="#38BDF8" />
              <stop offset="0.5" stopColor="#2563EB" />
              <stop offset="1" stopColor="#06B6D4" />
            </linearGradient>
            <linearGradient id="lcg-cyan-blue" x1="12" y1="12" x2="28" y2="28" gradientUnits="userSpaceOnUse">
              <stop stopColor="#00D4FF" />
              <stop offset="1" stopColor="#2563EB" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Wordmark: Exactly LeadCore Group */}
      <div className="flex flex-col leading-tight">
        <div className="flex items-center tracking-tight font-bold">
          <span className={`text-white font-extrabold tracking-tight ${textSizes[size]}`}>
            Lead<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-sky-200">Core</span>
          </span>
          <span className={`text-slate-300 font-semibold ml-1.5 ${textSizes[size]}`}>
            Group
          </span>
        </div>
        {showTagline && (
          <span className="text-[10px] tracking-wider uppercase font-medium text-slate-400">
            B2B Prospect Research
          </span>
        )}
      </div>
    </div>
  );

  if (isLink) {
    return (
      <a href="#home" className="focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-lg">
        {content}
      </a>
    );
  }

  return content;
}
