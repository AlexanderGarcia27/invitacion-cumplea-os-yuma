'use client';

import gsap from 'gsap';
import { useRef, useEffect } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import BotanicalSVG from './BotanicalSVG';

gsap.registerPlugin(ScrollTrigger);

export interface FloralBackgroundProps {
  variant?: 'hero' | 'section' | 'full';
  className?: string;
  parallax?: boolean;
}

export default function FloralBackground({
  variant = 'section',
  className = '',
  parallax = true,
}: FloralBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!parallax || !containerRef.current) return;

    const ctx = gsap.context(() => {
      // Parallax effect on scroll
      gsap.utils.toArray<HTMLElement>('.floral-parallax').forEach((el) => {
        const speed = parseFloat(el.dataset.speed || '0.5');
        gsap.to(el, {
          y: () => window.innerHeight * speed * -0.3,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        });
      });

      // Fade in elements as they enter viewport
      gsap.utils.toArray<HTMLElement>('.floral-fade').forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, scale: 0.8 },
          {
            opacity: 1,
            scale: 1,
            duration: 1.5,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 90%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, containerRef);

    // eslint-disable-next-line consistent-return
    return () => ctx.revert();
  }, [parallax]);

  if (variant === 'hero') {
    return (
      <div
        ref={containerRef}
        className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      >
        {/* Top-left corner arrangement */}
        <div
          className="floral-parallax floral-fade absolute -top-10 -left-10 w-32 md:w-48 opacity-40"
          data-speed="0.3"
        >
          <BotanicalSVG type="eucalyptus" delay={0} />
        </div>
        <div
          className="floral-parallax floral-fade absolute top-20 left-5 w-20 md:w-28 opacity-30"
          data-speed="0.5"
        >
          <BotanicalSVG type="babys-breath" delay={0.3} />
        </div>

        {/* Top-right corner arrangement */}
        <div
          className="floral-parallax floral-fade absolute -top-5 -right-10 w-28 md:w-40 opacity-40"
          data-speed="0.4"
        >
          <BotanicalSVG type="eucalyptus" flip delay={0.2} />
        </div>
        <div
          className="floral-parallax floral-fade absolute top-32 right-8 w-24 md:w-32 opacity-35"
          data-speed="0.6"
        >
          <BotanicalSVG type="white-rose" delay={0.5} scale={0.9} />
        </div>

        {/* Bottom corners */}
        <div
          className="floral-parallax floral-fade absolute -bottom-20 -left-5 w-24 md:w-36 opacity-30"
          data-speed="0.2"
        >
          <BotanicalSVG type="babys-breath" flip delay={0.4} />
        </div>
        <div
          className="floral-parallax floral-fade absolute -bottom-10 -right-8 w-28 md:w-44 opacity-35"
          data-speed="0.3"
        >
          <BotanicalSVG type="eucalyptus" delay={0.6} />
        </div>
      </div>
    );
  }

  if (variant === 'full') {
    return (
      <div
        ref={containerRef}
        className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      >
        {/* Large corner arrangements */}
        <div
          className="floral-parallax floral-fade absolute -top-20 -left-16 w-48 md:w-64 opacity-25"
          data-speed="0.2"
        >
          <BotanicalSVG type="eucalyptus" delay={0} />
        </div>
        <div
          className="floral-parallax floral-fade absolute top-10 left-10 w-32 md:w-40 opacity-30"
          data-speed="0.4"
        >
          <BotanicalSVG type="white-rose" delay={0.3} />
        </div>
        <div
          className="floral-parallax floral-fade absolute top-40 left-0 w-28 md:w-36 opacity-25"
          data-speed="0.5"
        >
          <BotanicalSVG type="babys-breath" delay={0.5} />
        </div>

        <div
          className="floral-parallax floral-fade absolute -top-10 -right-20 w-52 md:w-72 opacity-25"
          data-speed="0.3"
        >
          <BotanicalSVG type="eucalyptus" flip delay={0.2} />
        </div>
        <div
          className="floral-parallax floral-fade absolute top-20 right-5 w-28 md:w-36 opacity-30"
          data-speed="0.5"
        >
          <BotanicalSVG type="white-rose" flip delay={0.4} />
        </div>

        {/* Bottom arrangements */}
        <div
          className="floral-parallax floral-fade absolute -bottom-32 -left-10 w-44 md:w-56 opacity-20"
          data-speed="0.15"
        >
          <BotanicalSVG type="eucalyptus" delay={0.6} />
        </div>
        <div
          className="floral-parallax floral-fade absolute -bottom-20 -right-16 w-48 md:w-60 opacity-20"
          data-speed="0.2"
        >
          <BotanicalSVG type="eucalyptus" flip delay={0.7} />
        </div>
        <div
          className="floral-parallax floral-fade absolute bottom-10 right-20 w-24 md:w-32 opacity-25"
          data-speed="0.4"
        >
          <BotanicalSVG type="babys-breath" delay={0.8} />
        </div>
      </div>
    );
  }

  // Default: section variant - subtle side decorations
  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
    >
      {/* Left side */}
      <div
        className="floral-parallax floral-fade absolute top-1/4 -left-8 w-20 md:w-28 opacity-25"
        data-speed="0.3"
      >
        <BotanicalSVG type="eucalyptus" delay={0} />
      </div>
      <div
        className="floral-parallax floral-fade absolute bottom-1/4 -left-4 w-16 md:w-24 opacity-20"
        data-speed="0.4"
      >
        <BotanicalSVG type="babys-breath" delay={0.3} />
      </div>

      {/* Right side */}
      <div
        className="floral-parallax floral-fade absolute top-1/3 -right-6 w-18 md:w-26 opacity-25"
        data-speed="0.35"
      >
        <BotanicalSVG type="eucalyptus" flip delay={0.2} />
      </div>
      <div
        className="floral-parallax floral-fade absolute bottom-1/3 -right-4 w-16 md:w-22 opacity-20"
        data-speed="0.45"
      >
        <BotanicalSVG type="white-rose" flip delay={0.5} scale={0.8} />
      </div>
    </div>
  );
}
