'use client';

import { motion } from 'framer-motion';
import { InvitationData } from '@/providers/invitation';

export default function ClassicHero({ data }: { data: InvitationData }) {
  const { brideName, groomName } = data.couple;
  const dateObj = new Date(data.timing.eventDateTime);

  const formattedDate = dateObj.toLocaleDateString('es-MX', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="min-h-screen bg-[#fafaf9] flex items-center justify-center p-4 font-serif">
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
        className="max-w-xl w-full text-center relative py-20"
      >
        <span className="text-stone-400 tracking-[0.4em] uppercase text-[10px] mb-12 block">
          {data.theme.cover.headline}
        </span>

        <h1 className="text-5xl md:text-7xl text-stone-800 mb-6 font-light tracking-tight">
          {brideName}
        </h1>
        <span className="text-stone-300 italic text-3xl lowercase my-4 block font-light">y</span>
        <h1 className="text-5xl md:text-7xl text-stone-800 mb-16 font-light tracking-tight">
          {groomName}
        </h1>

        <div className="w-16 h-px bg-stone-200 mx-auto mb-12" />

        <p className="text-stone-500 mb-2 uppercase tracking-[0.2em] text-[11px]">
          {formattedDate}
        </p>
        <p className="text-stone-400 italic text-sm mb-16">
          {data.locations[0].time} hrs — {data.locations[0].venueName}
        </p>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-stone-300"
        >
          <div className="w-px h-12 bg-stone-200 mx-auto" />
        </motion.div>
      </motion.div>
    </div>
  );
}
