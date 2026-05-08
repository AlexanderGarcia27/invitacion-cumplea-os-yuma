'use client';

import gsap from 'gsap';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import Envelope from '@/src/components/Envelope';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Title, Subtitle } from '@/src/components/Typography';
import FloralBackground from '@/src/components/FloralBackground';

gsap.registerPlugin(ScrollTrigger);

export default function HeroEnvelope() {
  const containerRef = useRef<HTMLDivElement>(null);
  const envelopeRef = useRef<HTMLDivElement>(null);

  // Static Data mapping
  const brideName = 'Yuma';
  const groomName = '';
  const displayNames = 'Yuma';
  const envelopeDisplayNames = 'Yuma';
  const eventHeadline = 'Ven a celebrar mi cumpleaños';
  const polaroid1 = '/slider/foto-8.jpeg';
  const formattedDate = '11 . 07 . 2026';
  const formattedNames = ''; // Set to empty to show general 'Invitación de'
  const slug = 'cumpleanos';
  const isSingleHost = true;

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=150%',
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      tl.to(
        '.envelope-flap',
        {
          rotateX: 180,
          duration: 2,
          ease: 'power1.inOut',
        },
        0
      )
        .to(
          '.envelope-seal',
          {
            opacity: 0,
            scale: 0,
            duration: 0.5,
            ease: 'power2.in',
          },
          0
        )
        .to(
          '.scroll-hint',
          {
            opacity: 0,
            y: 20,
            duration: 0.5,
          },
          0
        )
        .to(
          '.envelope-card',
          {
            y: -160,
            opacity: 1,
            duration: 3,
            ease: 'power2.out',
          },
          0.5
        )
        .to(
          '.envelope-container',
          {
            y: 100,
            scale: 1.1,
            duration: 3,
            ease: 'power1.inOut',
          },
          0.5
        )
        .to(
          '.envelope-wrapper',
          {
            opacity: 0,
            y: -200,
            scale: 1.2,
            duration: 2,
            ease: 'power2.in',
            pointerEvents: 'none',
          },
          2.5
        )
        .fromTo(
          '.hero-content',
          { opacity: 0 },
          { opacity: 1, duration: 2.5, ease: 'power2.inOut' },
          3
        )
        .fromTo(
          '.hero-background',
          { scale: 1.1, opacity: 0 },
          { scale: 1, opacity: 1, duration: 3, ease: 'power2.out' },
          3
        )
        .fromTo(
          '.hero-text-overlay > *',
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.5, stagger: 0.3, ease: 'power3.out' },
          4
        )
        .fromTo(
          '.scroll-indicator-final',
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 1, ease: 'power2.out' },
          6
        );
    },
    { scope: containerRef }
  );

  const handleScrollToNext = () => {
    const nextSection = containerRef.current?.nextElementSibling;
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('/paper-texture.png')] mix-blend-overlay" />

      <FloralBackground variant="hero" />

      <div className="absolute inset-0 flex items-center justify-center z-20">
        <Envelope
          ref={envelopeRef}
          brideName={brideName}
          groomName={groomName}
          displayNames={envelopeDisplayNames}
          guestNames={formattedNames}
          slug={slug}
          isSingleHost={isSingleHost}
        />
      </div>

      <div className="hero-content opacity-0 absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-auto">
        {/* Full Image Background revealed after envelope */}
        <div className="hero-background absolute inset-0 z-0 overflow-hidden">
          {polaroid1 && (
            <img
              src={polaroid1}
              alt={`Foto de ${displayNames}`}
              className="w-full h-full object-cover"
            />
          )}
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="hero-text-overlay relative z-10 text-center flex flex-col items-center px-6">
          <Subtitle className="hero-subtitle-top mb-4 text-white uppercase tracking-[0.4em] text-sm md:text-base font-medium drop-shadow-lg">
            {eventHeadline}
          </Subtitle>

          <Title className="hero-title mb-4 text-white text-5xl md:text-8xl italic font-light drop-shadow-2xl">
            {displayNames}
          </Title>

          <div className="hero-divider w-px h-8 bg-linear-to-b from-transparent via-white/40 to-transparent origin-top mb-4" />

          <Subtitle className="hero-subtitle-date text-white/90 text-lg md:text-xl tracking-[0.3em] font-serif italic drop-shadow-lg">
            {formattedDate}
          </Subtitle>
        </div>

        <button
          onClick={handleScrollToNext}
          className="scroll-indicator-final absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 cursor-pointer group"
          aria-label="Scroll down"
        >
          <span className="text-[10px] uppercase tracking-[0.4em] font-sans font-bold text-white/50 group-hover:text-white transition-all duration-300 drop-shadow-md">
            Continuar
          </span>
        </button>
      </div>
    </section>
  );
}
