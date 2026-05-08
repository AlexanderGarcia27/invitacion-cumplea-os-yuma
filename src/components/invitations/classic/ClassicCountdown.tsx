'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { InvitationData } from '@/providers/invitation';

export default function ClassicCountdown({ data }: { data: InvitationData }) {
  const targetDate = new Date(data.timing.eventDateTime).getTime();
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

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
    { label: 'Minutos', value: timeLeft.minutes },
    { label: 'Segundos', value: timeLeft.seconds },
  ];

  return (
    <section className="py-32 bg-white text-center font-serif">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto px-4"
      >
        <span className="text-stone-400 tracking-[0.2em] uppercase text-[10px] mb-12 block">
          Faltan para el gran día
        </span>

        <div className="flex justify-center items-baseline gap-4 md:gap-12">
          {units.map((unit, i) => (
            <div key={i} className="flex flex-col items-center">
              <span className="text-4xl md:text-6xl text-stone-800 font-light mb-2">
                {unit.value.toString().padStart(2, '0')}
              </span>
              <span className="text-[10px] uppercase tracking-widest text-stone-400 italic">
                {unit.label}
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
