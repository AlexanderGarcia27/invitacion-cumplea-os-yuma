'use client';

import { motion } from 'framer-motion';
import { InvitationData } from '@/providers/invitation';

export default function DarkDressCode({ data }: { data: InvitationData }) {
  const { type, women, men, imageUrl } = data.dressCode;

  return (
    <section className="py-32 bg-[#0c0c0c] relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-24">
          <h2 className="text-5xl md:text-7xl font-serif text-white italic">Etiqueta</h2>
          <div className="mt-6 flex items-center justify-center gap-4">
            <div className="h-px w-8 bg-[#CFB53B]/20" />
            <span className="text-[#CFB53B] uppercase tracking-[0.3em] text-[10px] font-bold">
              {type}
            </span>
            <div className="h-px w-8 bg-[#CFB53B]/20" />
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative group"
          >
            {/* Immersive glow behind image */}
            <div className="absolute inset-0 bg-[#CFB53B]/5 blur-[100px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

            <div className="bg-[#151515] rounded-[60px] p-10 shadow-2xl border border-white/5 group-hover:border-[#CFB53B]/20 transition-all duration-700">
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt="Dress code"
                  width={300}
                  height={450}
                  className="object-contain mx-auto transition-transform duration-1000 group-hover:scale-110"
                />
              ) : null}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-16"
          >
            <div className="relative pl-12">
              <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-gradient-to-b from-[#CFB53B] to-transparent" />
              <div className="absolute left-0 top-0 -translate-x-1/2 w-2 h-2 rounded-full bg-[#CFB53B] shadow-[0_0_10px_#CFB53B]" />

              <span className="text-[10px] text-[#CFB53B] uppercase tracking-[0.5em] font-bold block mb-4">
                Damas
              </span>
              <h4 className="text-white text-2xl font-serif italic mb-4 leading-relaxed tracking-wide">
                {women.description}
              </h4>
              <p className="text-white/30 text-xs leading-relaxed max-w-sm italic">
                {women.restrictions}
              </p>
            </div>

            <div className="relative pl-12">
              <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-gradient-to-b from-[#CFB53B] to-transparent" />
              <div className="absolute left-0 top-0 -translate-x-1/2 w-2 h-2 rounded-full bg-[#CFB53B] shadow-[0_0_10px_#CFB53B]" />

              <span className="text-[10px] text-[#CFB53B] uppercase tracking-[0.5em] font-bold block mb-4">
                Caballeros
              </span>
              <h4 className="text-white text-2xl font-serif italic mb-4 leading-relaxed tracking-wide">
                Traje o smoking formal
              </h4>
              <p className="text-white/30 text-xs leading-relaxed max-w-sm italic">
                {men.restrictions}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
