"use client";
import * as React from "react";
import { cn } from "@/lib/utils";

export function AuroraBackground({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className={cn("relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-background p-0 sm:p-2 md:p-8", className)}>
      <div className="pointer-events-none fixed inset-0 z-0 w-screen h-screen">
        <svg
          width="100vw"
          height="100vh"
          viewBox="0 0 1200 900"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
          preserveAspectRatio="none"
        >
          <g filter="url(#filter0_f_1_2)">
            <ellipse cx="600" cy="900" rx="700" ry="200" fill="#f59e42" fillOpacity="0.35"/>
            <ellipse cx="300" cy="800" rx="400" ry="120" fill="#fbbf24" fillOpacity="0.18"/>
            <ellipse cx="900" cy="850" rx="400" ry="120" fill="#fdba74" fillOpacity="0.18"/>
          </g>
          <defs>
            <filter id="filter0_f_1_2" x="-200" y="0" width="1600" height="1100" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
              <feGaussianBlur stdDeviation="80" result="effect1_foregroundBlur_1_2" />
            </filter>
          </defs>
        </svg>
      </div>
      <div className="relative z-10 w-full flex flex-col min-h-screen">{children}</div>
    </div>
  );
} 