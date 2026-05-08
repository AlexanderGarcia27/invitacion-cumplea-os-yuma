'use client';

import { forwardRef } from 'react';
import { motion } from 'framer-motion';

import { Title, Caption } from './Typography';

interface EnvelopeProps {
  brideName?: string;
  groomName?: string;
  displayNames?: string;
  guestNames?: string;
  slug?: string;
  isSingleHost?: boolean;
  eventDate?: string;
}

// Pure presentational component that exposes DOM structure for GSAP animation
const Envelope = forwardRef<HTMLDivElement, EnvelopeProps>(
  (
    {
      brideName = '',
      groomName = '',
      displayNames = '',
      guestNames,
      slug,
      isSingleHost,
      eventDate,
    },
    ref
  ) => {
    const initials = isSingleHost
      ? (brideName || groomName)?.charAt(0)
      : `${brideName.charAt(0)}&${groomName.charAt(0)}`;

    return (
      <div
        ref={ref}
        className="envelope-wrapper relative flex flex-col items-center justify-center w-full h-full perspective-1000"
      >
        <motion.div
          className="envelope-container relative w-[320px] h-[210px] md:w-[460px] md:h-[300px] shadow-2xl rounded-sm"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Backplate to hide the oversized card when envelope is closed */}
          <div
            className="absolute inset-0 bg-background rounded-sm shadow-xl"
            style={{ transform: 'translateZ(-10px)' }}
          />

          <div className="absolute inset-0 bg-background border border-beige/50 z-10 overflow-hidden">
            <div className="absolute bottom-0 w-full h-[50%] bg-olive/10 opacity-60 clip-triangle-up" />
          </div>

          {/* Flap (The part that opens) - Olive accent */}
          <div
            className="envelope-flap absolute top-0 w-full h-1/2 bg-olive/80 origin-top z-30 shadow-md border-b border-olive-light/20"
            style={{
              clipPath: 'polygon(0 0, 50% 100%, 100% 0)',
              transformStyle: 'preserve-3d',
              backfaceVisibility: 'hidden',
            }}
          />

          {/* The Invitation Card inside - Theme background */}
          <div className="envelope-card absolute top-2 left-2 right-2 bottom-2 bg-background flex flex-col items-center justify-center text-center p-4 origin-bottom shadow-xl border border-beige/50 z-40 opacity-0 overflow-hidden">
            <div className="relative z-10 flex flex-col items-center w-full px-2">
              {guestNames ? (
                <>
                  <div className="mb-2 flex flex-col items-center gap-1">
                    <Caption className="text-warm-gray/60 uppercase tracking-[0.2em] text-[8px] md:text-[9px]">
                      Especialmente para
                    </Caption>
                    <div className="font-serif italic text-foreground text-sm md:text-base leading-tight line-clamp-3">
                      {guestNames}
                    </div>
                  </div>
                  <div className="my-2 h-px w-6 bg-beige" />
                  <Caption className="mt-2 mb-1 text-warm-gray/60 uppercase tracking-[0.2em] text-[8px] md:text-[9px]">
                    De
                  </Caption>
                </>
              ) : (
                <Caption className="mb-2 text-warm-gray uppercase tracking-widest text-[9px] md:text-[10px]">
                  Invitación de
                </Caption>
              )}
              <Title className="text-xl md:text-2xl text-olive! font-serif mt-1 drop-shadow-sm">
                {displayNames
                  ? displayNames
                  : !isSingleHost && brideName && groomName
                    ? `${brideName} & ${groomName}`
                    : brideName || groomName}
              </Title>
              {eventDate && (
                <p className="text-warm-gray/60 font-serif italic text-xs md:text-sm mt-2 tracking-widest">
                  {eventDate}
                </p>
              )}
            </div>
          </div>

          {slug === 'alanysofi' ? (
            <img
              src="/assets/alanysofi-stamp.png"
              alt="Sello personalizado de Alan y Sofía"
              className="envelope-seal absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 w-24 h-24 md:w-32 md:h-32 object-contain filter drop-shadow-xl"
            />
          ) : (
            <div className="envelope-seal absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 w-14 h-14 md:w-16 md:h-16 rounded-full bg-olive flex items-center justify-center text-white font-serif italic text-lg md:text-xl shadow-lg border-[3px] border-background">
              <div className="absolute inset-1 rounded-full border border-white/20" />
              {initials}
            </div>
          )}
        </motion.div>

        {/* Scroll hint below envelope */}
        <div className="scroll-hint absolute bottom-12 md:bottom-16 flex flex-col items-center gap-3 pointer-events-none opacity-60">
          <span className="text-[10px] md:text-xs uppercase tracking-[0.25em] font-medium text-warm-gray/80 text-center">
            Desliza para abrir
          </span>
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="text-olive/70 animate-bounce"
          >
            <path d="M12 5v14M19 12l-7 7-7-7" />
          </svg>
        </div>
      </div>
    );
  }
);

Envelope.displayName = 'Envelope';

export default Envelope;
