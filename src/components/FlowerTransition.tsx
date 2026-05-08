'use client';

import gsap from 'gsap';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface FlowerTransitionProps {
  className?: string;
}

export default function FlowerTransition({ className = '' }: FlowerTransitionProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      // Animate the flower petals appearing
      gsap.from('.flower-petal', {
        scale: 0,
        opacity: 0,
        rotation: -45,
        transformOrigin: 'center center',
        duration: 0.8,
        stagger: 0.1,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });

      // Animate stem drawing
      const stem = containerRef.current.querySelector('.flower-stem') as SVGPathElement;
      if (stem) {
        const length = stem.getTotalLength();
        gsap.set(stem, {
          strokeDasharray: length,
          strokeDashoffset: length,
        });
        gsap.to(stem, {
          strokeDashoffset: 0,
          duration: 1.2,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        });
      }

      // Animate leaves
      gsap.from('.flower-leaf', {
        scale: 0,
        opacity: 0,
        transformOrigin: 'bottom center',
        duration: 0.6,
        stagger: 0.15,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
        delay: 0.3,
      });

      // Continuous subtle sway after entrance
      gsap.to('.flower-group', {
        rotation: 2,
        transformOrigin: 'bottom center',
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 1.5,
      });
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className={`relative w-full py-8 flex items-center justify-center ${className}`}
    >
      <svg viewBox="0 0 100 60" className="flower-group w-20 md:w-24 h-auto" fill="none">
        {/* Stem */}
        <path
          className="flower-stem"
          d="M50,60 Q48,45 50,30"
          stroke="var(--olive)"
          strokeOpacity="0.5"
          strokeWidth="1.5"
          fill="none"
        />

        {/* Left leaf */}
        <path
          className="flower-leaf"
          d="M50,50 Q40,46 35,50 Q40,54 50,50"
          fill="var(--olive)"
          fillOpacity="0.4"
        />

        {/* Right leaf */}
        <path
          className="flower-leaf"
          d="M50,45 Q60,41 65,45 Q60,49 50,45"
          fill="var(--olive)"
          fillOpacity="0.4"
        />

        {/* Flower petals - white rose style */}
        <g transform="translate(50, 25)">
          {/* Outer petals */}
          <ellipse
            className="flower-petal"
            cx="0"
            cy="-12"
            rx="6"
            ry="10"
            fill="rgba(253, 244, 227, 0.7)"
            stroke="rgba(193, 185, 174, 0.3)"
            strokeWidth="0.5"
          />
          <ellipse
            className="flower-petal"
            cx="11"
            cy="-4"
            rx="6"
            ry="10"
            fill="rgba(253, 244, 227, 0.65)"
            stroke="rgba(193, 185, 174, 0.3)"
            strokeWidth="0.5"
            transform="rotate(72)"
          />
          <ellipse
            className="flower-petal"
            cx="7"
            cy="10"
            rx="6"
            ry="10"
            fill="rgba(253, 244, 227, 0.6)"
            stroke="rgba(193, 185, 174, 0.3)"
            strokeWidth="0.5"
            transform="rotate(144)"
          />
          <ellipse
            className="flower-petal"
            cx="-7"
            cy="10"
            rx="6"
            ry="10"
            fill="rgba(253, 244, 227, 0.65)"
            stroke="rgba(193, 185, 174, 0.3)"
            strokeWidth="0.5"
            transform="rotate(216)"
          />
          <ellipse
            className="flower-petal"
            cx="-11"
            cy="-4"
            rx="6"
            ry="10"
            fill="rgba(253, 244, 227, 0.7)"
            stroke="rgba(193, 185, 174, 0.3)"
            strokeWidth="0.5"
            transform="rotate(288)"
          />

          {/* Center */}
          <circle
            className="flower-petal"
            cx="0"
            cy="0"
            r="4"
            fill="var(--warm-gray)"
            fillOpacity="0.4"
          />
        </g>
      </svg>
    </div>
  );
}
