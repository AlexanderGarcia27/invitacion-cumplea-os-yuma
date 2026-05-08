'use client';

import { motion } from 'framer-motion';
import { Play, Pause } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';
import { InvitationData } from '@/providers/invitation';

const STARS_CONFIG = {
  TRANSITION_DURATION: 2 + Math.random() * 4,
  STYLE: {
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
  },
};

const CIRCULAR_WAVE_CONFIG = {
  ANIMATE: {
    height: [20, 40 + Math.random() * 40, 20],
    opacity: [0.2, 0.5, 0.2],
  },
  TRANSITION: { duration: 0.5 + Math.random() * 0.5, repeat: Infinity },
};

export default function DarkCountdown({ data }: { data: InvitationData }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const targetDate = new Date(data.timing.eventDateTime).getTime();
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const { audioUrl } = data.theme.music;

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const units = [
    { label: 'Días', value: timeLeft.days, angle: -90 },
    { label: 'Hrs', value: timeLeft.hours, angle: -0 },
    { label: 'Mins', value: timeLeft.minutes, angle: 90 },
    { label: 'Segs', value: timeLeft.seconds, angle: 180 },
  ];

  return (
    <section className="py-48 bg-[#0a0a0a] relative overflow-hidden flex items-center justify-center min-h-175">
      {audioUrl ? <audio ref={audioRef} src={audioUrl} loop /> : null}

      {/* Background stars/particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              opacity: [0.1, 0.4, 0.1],
              scale: [1, 1.5, 1],
            }}
            transition={{ duration: STARS_CONFIG.TRANSITION_DURATION, repeat: Infinity }}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={STARS_CONFIG.STYLE}
          />
        ))}
      </div>

      <div className="relative z-10 w-full max-w-lg aspect-square flex items-center justify-center">
        {/* Orbital Rings */}
        <div className="absolute inset-0 border border-white/5 rounded-full scale-100" />
        <div className="absolute inset-0 border border-[#CFB53B]/10 rounded-full scale-75" />

        {/* Floating Time Units (Orbiting) */}
        {units.map((unit, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1 + i * 0.2 }}
            className="absolute flex flex-col items-center justify-center bg-[#111111] w-20 h-20 md:w-24 md:h-24 rounded-full border border-white/10 shadow-2xl z-20"
            style={{
              top: `${50 + 42 * Math.sin((unit.angle * Math.PI) / 180)}%`,
              left: `${50 + 42 * Math.cos((unit.angle * Math.PI) / 180)}%`,
              transform: 'translate(-50%, -50%)',
            }}
          >
            <span className="text-2xl md:text-3xl font-serif text-white">{unit.value}</span>
            <span className="text-[8px] uppercase tracking-widest text-[#CFB53B] font-bold">
              {unit.label}
            </span>
          </motion.div>
        ))}

        {/* Central Celestial Orb (Music Control) */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, type: 'spring' }}
          className="relative group cursor-pointer"
          onClick={togglePlay}
        >
          {/* Outer Glowing Layers */}
          <motion.div
            animate={{
              scale: isPlaying ? [1, 1.1, 1] : [1, 1.05, 1],
              opacity: isPlaying ? [0.4, 0.7, 0.4] : [0.2, 0.4, 0.2],
            }}
            transition={{ duration: isPlaying ? 0.8 : 3, repeat: Infinity }}
            className="absolute inset-[-40px] bg-[#CFB53B]/20 blur-3xl rounded-full"
          />

          <div className="relative w-32 h-32 md:w-44 md:h-44 bg-[#151515] rounded-full border border-[#CFB53B]/30 flex items-center justify-center transition-all hover:border-[#CFB53B] shadow-[0_0_60px_rgba(207,181,59,0.15)] group-hover:scale-105 duration-500">
            <div
              className={`p-6 rounded-full transition-all ${isPlaying ? 'bg-[#CFB53B] text-black shadow-[0_0_30px_#CFB53B]' : 'bg-white/5 text-[#CFB53B]'}`}
            >
              {isPlaying ? <Pause size={40} /> : <Play size={40} className="ml-1" />}
            </div>
          </div>
        </motion.div>

        {/* Circular Audio Wave Visualization */}
        {isPlaying && (
          <div className="absolute inset-[-60px] pointer-events-none">
            {[...Array(32)].map((_, i) => (
              <motion.div
                key={i}
                animate={CIRCULAR_WAVE_CONFIG.ANIMATE}
                transition={CIRCULAR_WAVE_CONFIG.TRANSITION}
                className="absolute w-[1px] bg-[#CFB53B]/40 bottom-1/2 left-1/2 origin-bottom"
                style={{
                  transform: `rotate(${i * (360 / 32)}deg) translateY(-80px)`,
                }}
              />
            ))}
          </div>
        )}
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-center opacity-30">
        <span className="text-[8px] text-white uppercase tracking-[0.6em] font-bold">
          Un viaje estelar hacia el Sí
        </span>
      </div>
    </section>
  );
}
