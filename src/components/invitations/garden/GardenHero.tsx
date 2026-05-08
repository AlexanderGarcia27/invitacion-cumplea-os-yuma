'use client';

import { motion } from 'framer-motion';
import { InvitationData } from '@/providers/invitation';

export default function GardenHero({ data }: { data: InvitationData }) {
  const { brideName, groomName } = data.couple;

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#f1f5f1] flex items-center justify-center p-6">
      {/* Animated background elements */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 45, 0],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
        className="absolute -top-20 -left-20 w-96 h-96 bg-[#d4af37] filter blur-[100px] rounded-full pointer-events-none"
      />
      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          rotate: [0, -45, 0],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
        className="absolute -bottom-20 -right-20 w-96 h-96 bg-[#86a789] filter blur-[100px] rounded-full pointer-events-none"
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        className="relative z-10 max-w-2xl w-full bg-white/40 backdrop-blur-xl p-12 md:p-24 rounded-[40px] shadow-[0_20px_50px_rgba(134,167,137,0.1)] border border-white/50 text-center"
      >
        <motion.span
          initial={{ opacity: 0, letterSpacing: '0.2em' }}
          animate={{ opacity: 1, letterSpacing: '0.5em' }}
          transition={{ duration: 2, delay: 0.5 }}
          className="text-[#86a789] uppercase text-[10px] font-medium mb-12 block"
        >
          {data.theme.cover.headline}
        </motion.span>

        <div className="relative">
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="text-6xl md:text-8xl font-serif text-[#4a5d4c] italic leading-tight"
          >
            {brideName}
          </motion.h1>

          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', duration: 1, delay: 1.2 }}
            className="my-6 flex justify-center items-center"
          >
            <div className="h-px w-12 bg-[#d4af37]/30" />
            <span className="mx-4 text-[#d4af37] font-serif text-3xl">&</span>
            <div className="h-px w-12 bg-[#d4af37]/30" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 1 }}
            className="text-6xl md:text-8xl font-serif text-[#4a5d4c] italic leading-tight mb-16"
          >
            {groomName}
          </motion.h1>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="space-y-4"
        >
          <p className="text-[#86a789] uppercase tracking-[0.3em] text-xs font-semibold">
            {new Date(data.timing.eventDateTime).toLocaleDateString('es-MX', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </p>
          <p className="text-[#4a5d4c]/60 italic">{data.locations[0].venueName}</p>
        </motion.div>

        <motion.div
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          className="mt-16 flex justify-center"
        >
          <div className="w-6 h-10 border-2 border-[#86a789]/30 rounded-full flex justify-center p-1">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1 h-1 bg-[#86a789] rounded-full"
            />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
