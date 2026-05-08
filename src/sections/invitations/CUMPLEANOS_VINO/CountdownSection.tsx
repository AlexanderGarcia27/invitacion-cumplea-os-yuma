'use client';

import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Play, Pause } from 'lucide-react';
import { Subtitle } from '@/src/components/Typography';
import BotanicalSVG from '@/src/components/BotanicalSVG';
import { motion, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

export default function CountdownSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Static Data
  const countdownEnabled = true;
  const musicEnabled = true;
  const trackTitle = 'Canción de Cumpleaños';
  const audioUrl = '/audio/vivehoy.mp3';
  const eventDate = new Date('2026-07-11T14:30:00Z');
  
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    if (!eventDate || !countdownEnabled) return;

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = eventDate.getTime() - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const togglePlay = async () => {
    if (!audioRef.current || !audioUrl) return;

    try {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        await audioRef.current.play();
        setIsPlaying(true);
      }
    } catch (error) {
      console.error('Error playing audio:', error);
    }
  };

  useEffect(() => {
    setIsPlaying(false);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.load();
    }
  }, [audioUrl]);

  useGSAP(
    () => {
      gsap.fromTo(
        '.countdown-card',
        { y: 100, opacity: 0, scale: 0.95, rotateX: 5 },
        {
          scrollTrigger: {
            trigger: '.countdown-card',
            start: 'top bottom-=100',
            toggleActions: 'play none none reverse',
          },
          y: 0,
          opacity: 1,
          scale: 1,
          rotateX: 0,
          duration: 1.2,
          ease: 'power3.out',
        }
      );

      gsap.from('.countdown-item', {
        scrollTrigger: {
          trigger: '.countdown-grid',
          start: 'top 85%',
        },
        y: 30,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: 'back.out(1.7)',
      });

      gsap.from('.countdown-botanical', {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top center',
          scrub: 1,
        },
        y: 40,
        opacity: 0,
        rotation: 5,
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative w-full py-24 px-4 flex flex-col items-center justify-center overflow-hidden"
    >
      <div className="countdown-botanical absolute top-0 left-0 w-32 md:w-48 opacity-20 pointer-events-none -translate-x-10 -translate-y-10">
        <BotanicalSVG type="eucalyptus" />
      </div>

      <div className="countdown-botanical absolute bottom-0 right-0 w-32 md:w-48 opacity-20 pointer-events-none translate-x-10 translate-y-10 rotate-180">
        <BotanicalSVG type="babys-breath" />
      </div>

      <div className="w-full max-w-3xl relative z-10 mx-auto">
        <div className="countdown-card bg-background p-12 md:p-16 shadow-xl border border-beige/30 rounded-sm text-center relative overflow-hidden transform-style-3d perspective-1000">
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay bg-[url('/paper-texture.png')]" />

          {countdownEnabled && eventDate && (
            <>
              <Subtitle className="mb-8 text-olive tracking-[0.2em] text-sm font-bold">
                SOLO FALTAN
              </Subtitle>

              <div className="countdown-grid grid grid-cols-4 gap-4 md:gap-8 mb-12">
                {[
                  { label: 'D', value: timeLeft.days },
                  { label: 'H', value: timeLeft.hours },
                  { label: 'M', value: timeLeft.minutes },
                  { label: 'S', value: timeLeft.seconds },
                ].map((item, i) => (
                  <div key={i} className="countdown-item flex flex-col items-center">
                    <span className="font-serif text-4xl md:text-6xl text-olive font-light tabular-nums leading-none drop-shadow-sm">
                      {String(item.value).padStart(2, '0')}
                    </span>
                    <span className="text-[10px] md:text-xs text-olive/80 uppercase tracking-widest mt-2 font-bold">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </>
          )}

          {musicEnabled && audioUrl && (
            <>
              <div className="w-full h-px bg-warm-gray/10 mb-10 mx-auto max-w-xs" />

              <div className="flex flex-col items-center gap-6">
                <span className="font-serif text-foreground/80 italic tracking-wide">
                  ESCUCHA MI CANCIÓN
                </span>

                <button
                  onClick={togglePlay}
                  className="w-16 h-16 rounded-full border border-beige flex items-center justify-center text-olive hover:bg-olive hover:text-white hover:border-olive transition-all duration-300 shadow-sm group"
                  aria-label={isPlaying ? 'Pausar música' : 'Reproducir música'}
                >
                  <AnimatePresence mode="wait">
                    {isPlaying ? (
                      <motion.div
                        key="pause"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                      >
                        <Pause size={24} fill="currentColor" className="ml-0" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="play"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                      >
                        <Play size={24} fill="currentColor" className="ml-1" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>

                <p className="text-xs text-warm-gray/60 font-sans tracking-wider uppercase">
                  {trackTitle}
                </p>
              </div>

              <div
                className={`flex gap-1 justify-center h-4 mt-6 transition-opacity duration-500 ${isPlaying ? 'opacity-40' : 'opacity-0'}`}
              >
                {[...Array(10)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-1 bg-olive"
                    animate={{ height: ['20%', '100%', '20%'] }}
                    transition={{
                      repeat: Infinity,
                      duration: 0.8,
                      delay: i * 0.1,
                      ease: 'easeInOut',
                    }}
                  />
                ))}
              </div>

              <audio key={audioUrl} ref={audioRef} loop src={audioUrl} />
            </>
          )}
        </div>
      </div>
    </section>
  );
}
