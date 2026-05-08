'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import HeroEnvelope from './HeroEnvelope';
import CountdownSection from './CountdownSection';
import SliderSection from './SliderSection';
import EventLocationSection from './EventLocationSection';
import RSVPSection from './RSVPSection';
import SectionTransition from '@/src/components/SectionTransition';
import FlowerTransition from '@/src/components/FlowerTransition';

gsap.registerPlugin(ScrollTrigger);

const wineStyles = {
  '--olive': '#722F37',
  '--olive-light': '#8b3c48',
  '--olive-bright': '#984351',
  '--warm-gray': '#4a282f',
  '--warm-gray-light': '#d6b8be',
  '--beige': '#f5ecee',
  '--beige-muted': '#fcf8f9',
  '--foreground': '#1c1917',
  '--background': '#ffffff',
} as React.CSSProperties;

export default function CumpleanosVinoDesign() {
  const footerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from('.footer-content > *', {
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 90%',
          toggleActions: 'play none none reverse',
        },
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power2.out',
      });

      gsap.to('.footer-heart', {
        scale: 1.15,
        duration: 0.6,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    },
    { scope: footerRef }
  );

  return (
    <main className="min-h-screen bg-white" style={wineStyles}>
      <HeroEnvelope />

      <SectionTransition variant="ornament" />
      <CountdownSection />

      <div className="py-8 flex justify-center">
        <FlowerTransition />
      </div>

      <EventLocationSection />

      <div className="py-12 flex justify-center">
        <FlowerTransition />
      </div>

      <SliderSection />

      <SectionTransition variant="botanical" botanical="white-rose" />
      <RSVPSection />

      <div className="py-4 flex justify-center">
        <FlowerTransition />
      </div>

      {/* Dedicatoria personal instagrameable */}
      <section className="py-24 bg-background text-center relative">
        <div className="max-w-3xl mx-auto px-6 relative z-10">
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="w-16 h-px bg-beige/20" />
            <span className="text-olive/40 text-xl">✧</span>
            <div className="w-16 h-px bg-beige/20" />
          </div>

          <p className="mb-6 block text-foreground/40 uppercase tracking-[0.25em] text-xs">
            ¡Te espero para celebrar!
          </p>

          <div className="py-2">
            <p className="font-serif text-3xl md:text-5xl text-foreground italic leading-relaxed md:leading-normal">
              No faltes
            </p>
          </div>

          <div className="flex items-center justify-center gap-4 mt-10">
            <div className="w-16 h-px bg-beige/20" />
            <span className="text-olive/40 text-xl">✧</span>
            <div className="w-16 h-px bg-beige/20" />
          </div>
        </div>
      </section>

      <footer
        ref={footerRef}
        className="py-16 text-center bg-foreground/5 relative overflow-hidden"
      >
        <div className="footer-content flex flex-col items-center gap-4">
          <p className="text-foreground/40 font-sans text-xs uppercase tracking-widest">
            GRACIAS POR SER PARTE DE MI VIDA
          </p>

          <div className="flex items-center gap-3">
            <div className="w-16 h-px bg-beige/20" />
            <span className="footer-heart text-olive">♥</span>
            <div className="w-16 h-px bg-beige/20" />
          </div>

          <p className="font-serif text-2xl text-foreground mt-2">Yuma</p>

          <p className="text-foreground/40 font-sans text-sm">2026</p>
        </div>
      </footer>
    </main>
  );
}
