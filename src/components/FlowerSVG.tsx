'use client';

import gsap from 'gsap';
import { useRef, useEffect } from 'react';

export interface FlowerProps {
  type: 'eucalyptus' | 'babys-breath';
  className?: string;
  color?: string;
  delay?: number;
}

export default function FlowerSVG({
  type,
  className = '',
  color = '#4d5317', // Return to Olive
  delay = 0,
}: FlowerProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Wind/Breathing effect
      gsap.to('path', {
        rotation: 'random(-5, 5)',
        transformOrigin: 'bottom center',
        duration: 'random(2, 4)',
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay,
      });
    }, svgRef);

    return () => ctx.revert();
  }, [delay]);

  if (type === 'eucalyptus') {
    // Simplified Eucalyptus Branch
    return (
      <svg
        ref={svgRef}
        viewBox="0 0 100 200"
        className={`w-full h-auto ${className}`}
        style={{
          fill: 'none',
          stroke: color,
          strokeWidth: 1.5,
          strokeLinecap: 'round',
        }}
      >
        {/* Stem */}
        <path d="M50,200 Q55,150 45,100 T50,0" />
        {/* Leaves - olive with opacity */}
        <path d="M50,180 Q20,170 30,150 Q45,160 50,180" fill={color} fillOpacity="0.1" />
        <path d="M50,140 Q80,130 70,110 Q55,120 50,140" fill={color} fillOpacity="0.1" />
        <path d="M45,100 Q15,90 25,70 Q40,80 45,100" fill={color} fillOpacity="0.1" />
        <path d="M55,60 Q85,50 75,30 Q60,40 55,60" fill={color} fillOpacity="0.1" />
        <path d="M50,20 Q30,10 40,-10 Q50,0 50,20" fill={color} fillOpacity="0.1" />
      </svg>
    );
  }

  // Baby's Breath (Gipsofila)
  return (
    <svg
      ref={svgRef}
      viewBox="0 0 100 200"
      className={`w-full h-auto ${className}`}
      style={{ fill: 'none', stroke: color, strokeWidth: 0.8 }}
    >
      <path d="M50,200 Q60,150 40,100" />
      <path d="M40,100 Q30,80 20,60" />
      <path d="M40,100 Q60,80 70,50" />
      <path d="M50,150 Q70,140 80,120" />
      <path d="M50,150 Q30,130 20,120" />

      {/* Tiny flowers - White or Light fill */}
      <circle cx="20" cy="60" r="3" fill="white" stroke={color} />
      <circle cx="70" cy="50" r="3" fill="white" stroke={color} />
      <circle cx="80" cy="120" r="2.5" fill="white" stroke={color} />
      <circle cx="20" cy="120" r="2.5" fill="white" stroke={color} />
      <circle cx="40" cy="90" r="2" fill="white" stroke={color} />
    </svg>
  );
}
