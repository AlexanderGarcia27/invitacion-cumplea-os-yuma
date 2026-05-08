'use client';

import { motion } from 'framer-motion';
import { InvitationData } from '@/providers/invitation';

export default function DarkNotes({ data }: { data: InvitationData }) {
  const { noKids } = data.notes;

  if (!noKids.isEnabled) return null;

  return (
    <section className="py-40 bg-[#0a0a0a] font-serif text-center relative overflow-hidden">
      {/* Soft atmospheric glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#CFB53B]/5 rounded-full filter blur-[150px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="bg-[#111111] p-20 md:p-32 rounded-[60px] border border-white/[0.03] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.8)] relative"
        >
          {/* Decorative gold emblem placeholder */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-[#111111] border border-[#CFB53B]/30 rounded-full flex items-center justify-center shadow-2xl">
            <div className="w-2 h-2 rounded-full bg-[#CFB53B] animate-pulse" />
          </div>

          <span className="text-[#CFB53B] uppercase tracking-[0.6em] text-[10px] font-bold block mb-12">
            {noKids.title}
          </span>

          <h3 className="text-4xl md:text-5xl text-white italic font-light mb-10 tracking-wide">
            {noKids.subtitle}
          </h3>

          <div className="w-12 h-px bg-[#CFB53B]/30 mx-auto mb-10" />

          <p className="text-white/40 text-lg leading-[1.8] italic max-w-xl mx-auto font-light">
            &quot;{noKids.message}&quot;
          </p>

          <div className="pt-24">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="inline-block px-12 py-5 bg-white text-black rounded-xl font-sans text-[11px] font-bold uppercase tracking-[0.3em] shadow-2xl cursor-default"
            >
              Confirmar antes del{' '}
              {new Date(data.timing.rsvpDeadline).toLocaleDateString('es-MX', {
                day: 'numeric',
                month: 'long',
              })}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
