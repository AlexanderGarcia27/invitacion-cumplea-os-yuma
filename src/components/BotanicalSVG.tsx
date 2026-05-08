'use client';

import gsap from 'gsap';
import { useRef, useEffect } from 'react';

export type BotanicalType = 'white-rose' | 'eucalyptus' | 'babys-breath';

export interface BotanicalSVGProps {
  type: BotanicalType;
  className?: string;
  color?: string;
  secondaryColor?: string;
  accentColor?: string;
  delay?: number;
  scale?: number;
  flip?: boolean;
  animate?: boolean;
}

export default function BotanicalSVG({
  type,
  className = '',
  color = 'var(--olive)',
  secondaryColor = 'var(--olive-light)',
  accentColor = 'var(--olive-bright)',
  delay = 0,
  scale = 1,
  flip = false,
  animate = true,
}: BotanicalSVGProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!animate || !svgRef.current) return;

    const ctx = gsap.context(() => {
      // Gentle sway animation for all leaves and petals
      gsap.to('.botanical-sway', {
        rotation: 'random(-3, 3)',
        transformOrigin: 'bottom center',
        duration: 'random(3, 5)',
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay,
        stagger: {
          each: 0.1,
          from: 'random',
        },
      });

      // Subtle bloom/pulse for rose petals
      if (type === 'white-rose') {
        gsap.to('.rose-petal', {
          scale: 1.02,
          transformOrigin: 'center center',
          duration: 4,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: delay + 0.5,
          stagger: 0.15,
        });
      }

      // Flutter effect for small flowers
      if (type === 'babys-breath') {
        gsap.to('.tiny-flower', {
          y: 'random(-2, 2)',
          duration: 'random(1.5, 2.5)',
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          stagger: {
            each: 0.08,
            from: 'random',
          },
        });
      }
    }, svgRef);

    // eslint-disable-next-line consistent-return
    return () => ctx.revert();
  }, [animate, delay, type]);

  const transform = `scale(${flip ? -scale : scale}, ${scale})`;

  if (type === 'white-rose') {
    return (
      <svg
        ref={svgRef}
        viewBox="0 0 120 150"
        className={`w-full h-auto ${className}`}
        style={{ transform, transformOrigin: 'center' }}
      >
        {/* Stem */}
        <path
          className="botanical-sway"
          d="M60,150 Q58,120 62,90 Q60,70 60,50"
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* Rose Leaves */}
        <g className="botanical-sway" style={{ transformOrigin: '60px 110px' }}>
          <path
            d="M60,110 Q40,105 35,95 Q45,90 55,95 Q60,100 60,110"
            fill={secondaryColor}
            fillOpacity="0.4"
            stroke={secondaryColor}
            strokeWidth="0.8"
          />
          <path d="M45,100 L55,95" stroke={secondaryColor} strokeWidth="0.5" strokeOpacity="0.5" />
        </g>
        <g className="botanical-sway" style={{ transformOrigin: '60px 85px' }}>
          <path
            d="M60,85 Q80,82 88,72 Q78,68 68,73 Q60,78 60,85"
            fill={secondaryColor}
            fillOpacity="0.4"
            stroke={secondaryColor}
            strokeWidth="0.8"
          />
          <path d="M75,78 L68,75" stroke={secondaryColor} strokeWidth="0.5" strokeOpacity="0.5" />
        </g>

        {/* White Rose Petals - Layered */}
        <g style={{ transformOrigin: '60px 35px' }}>
          {/* Outer petals */}
          <path
            className="rose-petal"
            d="M60,55 Q35,50 30,35 Q35,20 60,25 Q50,35 60,55"
            fill="#fdf4e3"
            fillOpacity="0.9"
            stroke={accentColor}
            strokeWidth="0.5"
            strokeOpacity="0.3"
          />
          <path
            className="rose-petal"
            d="M60,55 Q85,50 90,35 Q85,20 60,25 Q70,35 60,55"
            fill="#fdf4e3"
            fillOpacity="0.9"
            stroke={accentColor}
            strokeWidth="0.5"
            strokeOpacity="0.3"
          />
          <path
            className="rose-petal"
            d="M60,55 Q55,60 45,58 Q30,50 35,35 Q45,40 60,55"
            fill="#fff"
            fillOpacity="0.85"
            stroke={accentColor}
            strokeWidth="0.5"
            strokeOpacity="0.3"
          />
          <path
            className="rose-petal"
            d="M60,55 Q65,60 75,58 Q90,50 85,35 Q75,40 60,55"
            fill="#fff"
            fillOpacity="0.85"
            stroke={accentColor}
            strokeWidth="0.5"
            strokeOpacity="0.3"
          />

          {/* Middle petals */}
          <path
            className="rose-petal"
            d="M60,50 Q40,48 38,35 Q42,25 60,30 Q52,38 60,50"
            fill="#fff"
            fillOpacity="0.95"
            stroke={accentColor}
            strokeWidth="0.4"
            strokeOpacity="0.2"
          />
          <path
            className="rose-petal"
            d="M60,50 Q80,48 82,35 Q78,25 60,30 Q68,38 60,50"
            fill="#fff"
            fillOpacity="0.95"
            stroke={accentColor}
            strokeWidth="0.4"
            strokeOpacity="0.2"
          />
          <path
            className="rose-petal"
            d="M60,48 Q50,55 45,45 Q42,35 55,32 Q52,40 60,48"
            fill="#fefefe"
            fillOpacity="0.9"
            stroke={accentColor}
            strokeWidth="0.3"
            strokeOpacity="0.15"
          />
          <path
            className="rose-petal"
            d="M60,48 Q70,55 75,45 Q78,35 65,32 Q68,40 60,48"
            fill="#fefefe"
            fillOpacity="0.9"
            stroke={accentColor}
            strokeWidth="0.3"
            strokeOpacity="0.15"
          />

          {/* Inner petals / bud */}
          <path
            className="rose-petal"
            d="M60,45 Q52,42 50,35 Q55,30 60,33 Q57,38 60,45"
            fill="#fff"
            stroke={accentColor}
            strokeWidth="0.3"
            strokeOpacity="0.1"
          />
          <path
            className="rose-petal"
            d="M60,45 Q68,42 70,35 Q65,30 60,33 Q63,38 60,45"
            fill="#fff"
            stroke={accentColor}
            strokeWidth="0.3"
            strokeOpacity="0.1"
          />

          {/* Center spiral */}
          <ellipse cx="60" cy="38" rx="4" ry="5" fill={accentColor} fillOpacity="0.3" />
          <path
            d="M58,40 Q60,35 62,38"
            fill="none"
            stroke={accentColor}
            strokeWidth="0.4"
            strokeOpacity="0.5"
          />
        </g>
      </svg>
    );
  }

  if (type === 'eucalyptus') {
    return (
      <svg
        ref={svgRef}
        viewBox="0 0 100 220"
        className={`w-full h-auto ${className}`}
        style={{ transform, transformOrigin: 'center' }}
      >
        {/* Main curved stem */}
        <path
          className="botanical-sway"
          d="M50,220 Q55,180 48,140 Q52,100 45,60 Q48,30 50,0"
          fill="none"
          stroke={color}
          strokeWidth="1.8"
          strokeLinecap="round"
        />

        <g className="botanical-sway" style={{ transformOrigin: '50px 200px' }}>
          <ellipse
            cx="35"
            cy="195"
            rx="18"
            ry="10"
            fill={secondaryColor}
            fillOpacity="0.35"
            stroke={secondaryColor}
            strokeWidth="0.8"
            transform="rotate(-25, 35, 195)"
          />
          <path
            d="M25,195 Q35,193 45,195"
            fill="none"
            stroke={secondaryColor}
            strokeWidth="0.4"
            strokeOpacity="0.5"
          />
        </g>

        <g className="botanical-sway" style={{ transformOrigin: '50px 175px' }}>
          <ellipse
            cx="68"
            cy="170"
            rx="18"
            ry="9"
            fill={accentColor}
            fillOpacity="0.35"
            stroke={accentColor}
            strokeWidth="0.8"
            transform="rotate(20, 68, 170)"
          />
          <path
            d="M58,170 Q68,168 78,170"
            fill="none"
            stroke={accentColor}
            strokeWidth="0.4"
            strokeOpacity="0.5"
          />
        </g>

        <g className="botanical-sway" style={{ transformOrigin: '48px 145px' }}>
          <ellipse
            cx="32"
            cy="140"
            rx="16"
            ry="8"
            fill={secondaryColor}
            fillOpacity="0.35"
            stroke={secondaryColor}
            strokeWidth="0.8"
            transform="rotate(-30, 32, 140)"
          />
          <path
            d="M22,140 Q32,138 42,140"
            fill="none"
            stroke={secondaryColor}
            strokeWidth="0.4"
            strokeOpacity="0.5"
          />
        </g>

        <g className="botanical-sway" style={{ transformOrigin: '52px 115px' }}>
          <ellipse
            cx="70"
            cy="110"
            rx="15"
            ry="7"
            fill={accentColor}
            fillOpacity="0.35"
            stroke={accentColor}
            strokeWidth="0.8"
            transform="rotate(25, 70, 110)"
          />
          <path
            d="M62,110 Q70,108 78,110"
            fill="none"
            stroke={accentColor}
            strokeWidth="0.4"
            strokeOpacity="0.5"
          />
        </g>

        <g className="botanical-sway" style={{ transformOrigin: '45px 80px' }}>
          <ellipse
            cx="30"
            cy="80"
            rx="14"
            ry="6"
            fill={secondaryColor}
            fillOpacity="0.35"
            stroke={secondaryColor}
            strokeWidth="0.8"
            transform="rotate(-35, 30, 80)"
          />
          <path
            d="M22,80 Q30,78 38,80"
            fill="none"
            stroke={secondaryColor}
            strokeWidth="0.4"
            strokeOpacity="0.5"
          />
        </g>

        <g className="botanical-sway" style={{ transformOrigin: '48px 55px' }}>
          <ellipse
            cx="65"
            cy="55"
            rx="12"
            ry="5"
            fill={accentColor}
            fillOpacity="0.35"
            stroke={accentColor}
            strokeWidth="0.8"
            transform="rotate(30, 65, 55)"
          />
          <path
            d="M58,55 Q65,53 72,55"
            fill="none"
            stroke={accentColor}
            strokeWidth="0.4"
            strokeOpacity="0.5"
          />
        </g>

        <g className="botanical-sway" style={{ transformOrigin: '50px 30px' }}>
          <ellipse
            cx="40"
            cy="30"
            rx="10"
            ry="4"
            fill={secondaryColor}
            fillOpacity="0.3"
            stroke={secondaryColor}
            strokeWidth="0.8"
            transform="rotate(-40, 40, 30)"
          />
        </g>

        <g className="botanical-sway" style={{ transformOrigin: '50px 10px' }}>
          <ellipse
            cx="55"
            cy="12"
            rx="8"
            ry="3.5"
            fill={accentColor}
            fillOpacity="0.4"
            stroke={accentColor}
            strokeWidth="0.8"
            transform="rotate(15, 55, 12)"
          />
        </g>
      </svg>
    );
  }

  // Baby's Breath (Gypsophila)
  return (
    <svg
      ref={svgRef}
      viewBox="0 0 120 180"
      className={`w-full h-auto ${className}`}
      style={{ transform, transformOrigin: 'center' }}
    >
      {/* Main stems - delicate branching */}
      <path
        className="botanical-sway"
        d="M60,180 Q65,150 55,120 Q60,100 50,80"
        fill="none"
        stroke={color}
        strokeWidth="0.8"
        strokeLinecap="round"
      />
      <path
        className="botanical-sway"
        d="M55,120 Q40,100 25,75"
        fill="none"
        stroke={color}
        strokeWidth="0.6"
        strokeLinecap="round"
      />
      <path
        className="botanical-sway"
        d="M55,120 Q75,95 90,70"
        fill="none"
        stroke={color}
        strokeWidth="0.6"
        strokeLinecap="round"
      />
      <path
        className="botanical-sway"
        d="M60,150 Q80,140 95,125"
        fill="none"
        stroke={color}
        strokeWidth="0.6"
        strokeLinecap="round"
      />
      <path
        className="botanical-sway"
        d="M60,150 Q40,135 20,130"
        fill="none"
        stroke={color}
        strokeWidth="0.6"
        strokeLinecap="round"
      />

      {/* Secondary branches */}
      <path d="M50,80 Q35,65 25,50" fill="none" stroke={color} strokeWidth="0.5" />
      <path d="M50,80 Q60,55 70,40" fill="none" stroke={color} strokeWidth="0.5" />
      <path d="M25,75 Q15,60 10,45" fill="none" stroke={color} strokeWidth="0.4" />
      <path d="M90,70 Q100,55 105,40" fill="none" stroke={color} strokeWidth="0.4" />

      {/* Tiny flowers - scattered clusters */}
      {/* Top cluster */}
      <circle
        className="tiny-flower"
        cx="25"
        cy="50"
        r="3.5"
        fill="white"
        stroke={color}
        strokeWidth="0.4"
      />
      <circle
        className="tiny-flower"
        cx="18"
        cy="55"
        r="2.5"
        fill="white"
        stroke={color}
        strokeWidth="0.4"
      />
      <circle
        className="tiny-flower"
        cx="32"
        cy="45"
        r="2.5"
        fill="white"
        stroke={color}
        strokeWidth="0.4"
      />

      <circle
        className="tiny-flower"
        cx="70"
        cy="40"
        r="3.5"
        fill="white"
        stroke={color}
        strokeWidth="0.4"
      />
      <circle
        className="tiny-flower"
        cx="65"
        cy="48"
        r="2.5"
        fill="white"
        stroke={color}
        strokeWidth="0.4"
      />
      <circle
        className="tiny-flower"
        cx="78"
        cy="35"
        r="2.5"
        fill="white"
        stroke={color}
        strokeWidth="0.4"
      />

      <circle
        className="tiny-flower"
        cx="10"
        cy="45"
        r="3"
        fill="white"
        stroke={color}
        strokeWidth="0.4"
      />
      <circle
        className="tiny-flower"
        cx="5"
        cy="52"
        r="2"
        fill="white"
        stroke={color}
        strokeWidth="0.4"
      />

      <circle
        className="tiny-flower"
        cx="105"
        cy="40"
        r="3"
        fill="white"
        stroke={color}
        strokeWidth="0.4"
      />
      <circle
        className="tiny-flower"
        cx="110"
        cy="48"
        r="2"
        fill="white"
        stroke={color}
        strokeWidth="0.4"
      />

      {/* Middle cluster */}
      <circle
        className="tiny-flower"
        cx="25"
        cy="75"
        r="3"
        fill="white"
        stroke={color}
        strokeWidth="0.4"
      />
      <circle
        className="tiny-flower"
        cx="18"
        cy="80"
        r="2.5"
        fill="white"
        stroke={color}
        strokeWidth="0.4"
      />

      <circle
        className="tiny-flower"
        cx="90"
        cy="70"
        r="3"
        fill="white"
        stroke={color}
        strokeWidth="0.4"
      />
      <circle
        className="tiny-flower"
        cx="85"
        cy="78"
        r="2.5"
        fill="white"
        stroke={color}
        strokeWidth="0.4"
      />
      <circle
        className="tiny-flower"
        cx="97"
        cy="65"
        r="2"
        fill="white"
        stroke={color}
        strokeWidth="0.4"
      />

      <circle
        className="tiny-flower"
        cx="50"
        cy="80"
        r="2.5"
        fill="white"
        stroke={color}
        strokeWidth="0.4"
      />
      <circle
        className="tiny-flower"
        cx="45"
        cy="85"
        r="2"
        fill="white"
        stroke={color}
        strokeWidth="0.4"
      />

      {/* Side clusters */}
      <circle
        className="tiny-flower"
        cx="95"
        cy="125"
        r="3"
        fill="white"
        stroke={color}
        strokeWidth="0.4"
      />
      <circle
        className="tiny-flower"
        cx="100"
        cy="118"
        r="2.5"
        fill="white"
        stroke={color}
        strokeWidth="0.4"
      />
      <circle
        className="tiny-flower"
        cx="88"
        cy="130"
        r="2"
        fill="white"
        stroke={color}
        strokeWidth="0.4"
      />

      <circle
        className="tiny-flower"
        cx="20"
        cy="130"
        r="3"
        fill="white"
        stroke={color}
        strokeWidth="0.4"
      />
      <circle
        className="tiny-flower"
        cx="12"
        cy="125"
        r="2.5"
        fill="white"
        stroke={color}
        strokeWidth="0.4"
      />
      <circle
        className="tiny-flower"
        cx="28"
        cy="135"
        r="2"
        fill="white"
        stroke={color}
        strokeWidth="0.4"
      />

      {/* Extra scattered flowers */}
      <circle
        className="tiny-flower"
        cx="40"
        cy="60"
        r="2"
        fill="white"
        stroke={color}
        strokeWidth="0.4"
      />
      <circle
        className="tiny-flower"
        cx="80"
        cy="55"
        r="2"
        fill="white"
        stroke={color}
        strokeWidth="0.4"
      />
      <circle
        className="tiny-flower"
        cx="55"
        cy="95"
        r="2"
        fill="white"
        stroke={color}
        strokeWidth="0.4"
      />
      <circle
        className="tiny-flower"
        cx="70"
        cy="100"
        r="2.5"
        fill={accentColor}
        fillOpacity="0.4"
        stroke={color}
        strokeWidth="0.4"
      />
    </svg>
  );
}
