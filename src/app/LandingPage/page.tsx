"use client";

import  { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { AuroraBackground } from "@/components/ui/aurora-background";
import buildasquadLogo from "@/assets/buildasquad_logo.png";
import { useNavigate } from "react-router-dom";

// Responsive Dots background with fade up animation
const useResponsiveDots = () => {
  const [dotsConfig, setDotsConfig] = useState({ cols: 20, rows: 10, dotSize: 'w-1 h-1' });
  useEffect(() => {
    const update = () => {
      if (window.innerWidth < 640) {
        setDotsConfig({ cols: 10, rows: 8, dotSize: 'w-1 h-1' });
      } else if (window.innerWidth < 1024) {
        setDotsConfig({ cols: 14, rows: 7, dotSize: 'w-1 h-1' });
      } else {
        setDotsConfig({ cols: 20, rows: 10, dotSize: 'w-1 h-1' });
      }
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);
  return dotsConfig;
};

const DotsBackground = () => {
  const { cols, rows, dotSize } = useResponsiveDots();
  const dots = [];
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const delay = (y * 0.15 + x * 0.05).toFixed(2);
      dots.push(
        <div
          key={`dot-${x}-${y}`}
          className={`absolute rounded-full bg-orange-300 opacity-0 animate-dot-fadeup ${dotSize}`}
          style={{
            left: `calc(${(x / (cols - 1)) * 100}% - 0.25rem)`,
            bottom: `${(y / (rows - 1)) * 100}%`,
            animationDelay: `${delay}s`,
            animationDuration: '7s',
          }}
        />
      );
    }
  }
  return (
    <div className="pointer-events-none fixed inset-0 z-0 w-screen h-screen">
      <div className="w-full h-full">
        {dots}
      </div>
    </div>
  );
};

export default function LandingPage() {
  const [showSub, setShowSub] = useState(false);
  const navigate = useNavigate();
  return (
    <AuroraBackground>
      {/* Header with Logo/Brand (left) and Login/Signup buttons (right) */}
      <header className="w-full flex justify-between items-center absolute top-0 left-0 z-20 px-4 md:px-12 py-6">
        {/* Brand logo and name */}
        <div className="flex items-center gap-3 select-none pl-4 md:pl-8">
          <img src={buildasquadLogo} alt="BuildASquad Logo" className="h-8 w-8 md:h-10 md:w-10 object-contain" />
          <span className="text-lg md:text-2xl font-bold text-black tracking-tight">BuildASquad</span>
        </div>
        {/* Login/Signup buttons */}
        <div className="flex gap-2 md:gap-4 pr-4 md:pr-8">
          <Button variant="ghost" size={window.innerWidth < 640 ? "sm" : "lg"} className="px-3 md:px-6 py-2 md:py-3 text-base md:text-md" onClick={() => navigate('/login')}>
            Login
          </Button>
          <Button variant="default" size={window.innerWidth < 640 ? "sm" : "lg"} className="px-3 md:px-6 py-2 md:py-3 text-base md:text-md" onClick={() => navigate('/signup')}>
            Signup
          </Button>
        </div>
      </header>
      {/* Main content */}
      <main className="flex flex-1 flex-col items-center justify-center text-center px-2 md:px-4 z-10 relative">
        {/* Tagline with Text Generate Effect */}
        <h1
          className={`text-5xl md:text-7xl lg:text-7xl font-extrabold mb-6 transition-all duration-700 ${
            showSub ? "translate-y-[-32px]" : "translate-y-0"
          }`}
        >
          <TextGenerateEffect words="Build  Your  Dream  Squad" className="text-black" wordGap="0.5rem" onDone={() => setShowSub(true)} />
        </h1>
        {/* Subtagline and CTA appear smoothly after text generate effect completes */}
        <div
          className={`transition-all duration-700 flex flex-col items-center ${
            showSub ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8 pointer-events-none"
          }`}
        >
          <p className="text-base md:text-lg lg:text-2xl text-muted-foreground max-w-2xl mx-auto animate-fade-in">
            Connect. Collaborate. Create. Find the perfect teammates for your next big project.
          </p>
          <Button
            size={window.innerWidth < 640 ? "sm" : "lg"}
            className="mt-6 md:mt-8 px-6 md:px-10 py-4 md:py-6 text-base md:text-lg font-semibold shadow-lg animate-fade-in"
            onClick={() => navigate('/login')}
          >
            Get Started
          </Button>
        </div>
      </main>
      <DotsBackground />
    </AuroraBackground>
  );
}

// Tailwind animation utilities (add to your global CSS if not present):
// .animate-aurora-move { animation: auroraMove 12s ease-in-out infinite alternate; }
// @keyframes auroraMove { 0% { transform: translateX(-50%) scale(1); opacity: 1; } 100% { transform: translateX(-48%) scale(1.04); opacity: 0.95; } }
// .animate-dot-fadeup { animation: dotFadeUp 3.5s cubic-bezier(0.4,0,0.2,1) infinite; }
// @keyframes dotFadeUp { 0% { opacity: 0; transform: translateY(40px); } 20% { opacity: 0.7; } 60% { opacity: 0.7; } 100% { opacity: 0; transform: translateY(-40px); } }
// .animate-type-cursor { animation: typeCursor 1s steps(2) infinite; }
// @keyframes typeCursor { 0%,100% { opacity: 1; } 50% { opacity: 0; } }
