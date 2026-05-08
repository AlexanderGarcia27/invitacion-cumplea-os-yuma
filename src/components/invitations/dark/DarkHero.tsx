'use client';

import { motion } from 'framer-motion';
import { InvitationData } from '@/providers/invitation';

export default function DarkHero({ data }: { data: InvitationData }) {
  const { brideName, groomName } = data.couple;

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#0a0a0a] flex items-center justify-center p-6 text-white">
      {/* Immersive background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,#CFB53B_0%,transparent_50%)] blur-[120px] -translate-y-1/2" />
      </div>

      <motion.div
        animate={{
          opacity: [0.3, 0.5, 0.3],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#CFB53B]/10 filter blur-[100px] rounded-full translate-x-1/2 translate-y-1/2 pointer-events-none"
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="relative z-10 max-w-4xl w-full text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mb-12"
        >
          <span className="text-[#CFB53B] uppercase tracking-[0.6em] text-[10px] font-semibold block mb-2">
            {data.theme.cover.headline}
          </span>
          <div className="w-12 h-px bg-[#CFB53B]/50 mx-auto" />
        </motion.div>

        <div className="flex flex-col items-center">
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.8 }}
            className="text-7xl md:text-9xl font-serif text-white tracking-tight italic"
          >
            {brideName}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, rotate: -45, scale: 0 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            transition={{ duration: 1, delay: 1.2, type: 'spring' }}
            className="my-10 text-[#CFB53B] text-4xl md:text-6xl font-serif"
          >
            &
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 1 }}
            className="text-7xl md:text-9xl font-serif text-white tracking-tight italic mb-20"
          >
            {groomName}
          </motion.h1>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="space-y-6"
        >
          <div className="inline-block px-8 py-3 border border-[#CFB53B]/30 rounded-full backdrop-blur-sm">
            <p className="text-[#CFB53B] uppercase tracking-[0.4em] text-xs font-bold">
              {new Date(data.timing.eventDateTime).toLocaleDateString('es-MX', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </p>
          </div>
          <p className="text-white/40 tracking-[0.2em] uppercase text-[10px]">
            {data.locations[0].venueName} — {data.locations[0].address}
          </p>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="mt-24 flex flex-col items-center gap-2"
        >
          <div className="w-[1px] h-12 bg-gradient-to-b from-[#CFB53B] to-transparent" />
        </motion.div>
      </motion.div>
    </div>
  );
}
