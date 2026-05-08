'use client';

import gsap from 'gsap';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import BotanicalSVG from './BotanicalSVG';

gsap.registerPlugin(ScrollTrigger);

export type TransitionVariant = 'line' | 'ornament' | 'botanical';

interface SectionTransitionProps {
  variant?: TransitionVariant;
  className?: string;
  botanical?: 'eucalyptus' | 'white-rose' | 'babys-breath';
}

export default function SectionTransition({
  variant = 'ornament',
  className = '',
  botanical,
}: SectionTransitionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<SVGPathElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      // Line drawing animation
      if (lineRef.current) {
        const pathLength = lineRef.current.getTotalLength();
        gsap.set(lineRef.current, {
          strokeDasharray: pathLength,
          strokeDashoffset: pathLength,
        });

        gsap.to(lineRef.current, {
          strokeDashoffset: 0,
          duration: 1.5,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        });
      }

      // Ornament elements fade in
      gsap.from('.transition-ornament', {
        opacity: 0,
        scale: 0.8,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });

      // Botanical element
      if (botanical) {
        gsap.from('.transition-botanical', {
          opacity: 0,
          y: 20,
          rotation: -5,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        });
      }
    },
    { scope: containerRef }
  );

  if (variant === 'line') {
    return (
      <div
        ref={containerRef}
        className={`relative w-full py-8 flex items-center justify-center ${className}`}
      >
        <svg viewBox="0 0 400 2" className="w-full max-w-md h-[2px]" preserveAspectRatio="none">
          <path
            ref={lineRef}
            d="M0,1 L400,1"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            className="text-olive/70"
          />
        </svg>
      </div>
    );
  }

  if (variant === 'botanical') {
    return (
      <div
        ref={containerRef}
        className={`relative w-full py-12 flex items-center justify-center gap-6 ${className}`}
      >
        {/* Left line */}
        <svg viewBox="0 0 100 2" className="w-20 md:w-32 h-[1px] flex-shrink-0">
          <path
            ref={lineRef}
            d="M0,1 L100,1"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            className="text-warm-gray/60"
          />
        </svg>

        {/* Botanical center */}
        <div className="transition-botanical w-12 md:w-16 opacity-100">
          <BotanicalSVG type={botanical || 'babys-breath'} animate={false} scale={0.7} />
        </div>

        {/* Right line */}
        <svg viewBox="0 0 100 2" className="w-20 md:w-32 h-[1px] flex-shrink-0">
          <path
            d="M0,1 L100,1"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            className="text-warm-gray/60"
          />
        </svg>
      </div>
    );
  }

  // Default: ornament variant
  return (
    <div
      ref={containerRef}
      className={`relative w-full py-10 flex items-center justify-center ${className}`}
    >
      <svg viewBox="0 0 200 40" className="w-48 md:w-64 h-10" preserveAspectRatio="xMidYMid meet">
        {/* Decorative curved lines */}
        <path
          ref={lineRef}
          d="M10,20 Q50,5 100,20 Q150,35 190,20"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          className="text-olive/80"
        />

        {/* Center ornament */}
        <g className="transition-ornament">
          <circle
            cx="100"
            cy="20"
            r="6"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            className="text-olive/60"
          />
          <circle cx="100" cy="20" r="2" fill="currentColor" className="text-olive/40" />
        </g>

        {/* Side diamonds */}
        <g className="transition-ornament">
          <path d="M40,20 L45,15 L50,20 L45,25 Z" fill="currentColor" className="text-olive/30" />
          <path
            d="M150,20 L155,15 L160,20 L155,25 Z"
            fill="currentColor"
            className="text-olive/30"
          />
        </g>
      </svg>
    </div>
  );
}
