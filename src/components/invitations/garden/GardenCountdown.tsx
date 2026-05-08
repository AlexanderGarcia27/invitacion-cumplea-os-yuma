'use client';

import { motion } from 'framer-motion';
import { Play, Pause } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';
import { InvitationData } from '@/providers/invitation';

export default function GardenCountdown({ data }: { data: InvitationData }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const targetDate = new Date(data.timing.eventDateTime).getTime();
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const { trackTitle, audioUrl } = data.theme.music;

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
    { label: 'Días', value: timeLeft.days },
    { label: 'Horas', value: timeLeft.hours },
    { label: 'Mins', value: timeLeft.minutes },
    { label: 'Segs', value: timeLeft.seconds },
  ];

  return (
    <section className="py-32 bg-[#fafdfa] relative overflow-hidden">
      {audioUrl ? <audio ref={audioRef} src={audioUrl} loop /> : null}

      {/* Decorative leaf-like shapes */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#86a789]/5 rounded-full filter blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#d4af37]/5 rounded-full filter blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-[#86a789] uppercase tracking-[0.3em] text-[10px] font-bold mb-16 block"
        >
          Inicia la aventura en
        </motion.span>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-20">
          {units.map((unit, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-[32px] shadow-[0_10px_30px_rgba(134,167,137,0.05)] border border-[#86a789]/10 group hover:border-[#86a789]/30 transition-colors"
            >
              <div className="text-4xl md:text-5xl font-serif text-[#4a5d4c] mb-2 group-hover:scale-110 transition-transform">
                {unit.value.toString().padStart(2, '0')}
              </div>
              <div className="text-[10px] uppercase tracking-widest text-[#86a789] font-bold">
                {unit.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Music Control Integrated */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-col items-center gap-6"
        >
          <button
            onClick={togglePlay}
            className="flex items-center gap-4 px-8 py-4 bg-white rounded-full shadow-lg border border-[#86a789]/10 hover:shadow-xl transition-all group"
          >
            <div
              className={`p-3 rounded-full ${isPlaying ? 'bg-[#86a789] text-white' : 'bg-[#f1f5f1] text-[#86a789]'} transition-colors`}
            >
              {isPlaying ? <Pause size={20} /> : <Play size={20} className="ml-1" />}
            </div>
            <div className="text-left">
              <div className="text-[10px] text-[#86a789] font-bold uppercase tracking-widest">
                {isPlaying ? 'Reproduciendo' : 'Escucha nuestra canción'}
              </div>
              <div className="text-sm font-serif italic text-[#4a5d4c]">{trackTitle}</div>
            </div>
            {isPlaying && (
              <div className="flex gap-1 ml-4 items-end h-4">
                {[0, 1, 2, 3].map((i) => (
                  <motion.div
                    key={i}
                    animate={{ height: [4, 16, 4] }}
                    transition={{ duration: 0.8, delay: i * 0.2, repeat: Infinity }}
                    className="w-[2px] bg-[#86a789] rounded-full"
                  />
                ))}
              </div>
            )}
          </button>
        </motion.div>
      </div>
    </section>
  );
}
