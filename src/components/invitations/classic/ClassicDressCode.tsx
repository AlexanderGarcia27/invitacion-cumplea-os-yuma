'use client';

import { motion } from 'framer-motion';
import { InvitationData } from '@/providers/invitation';

export default function ClassicDressCode({ data }: { data: InvitationData }) {
  const { type, women, men, imageUrl } = data.dressCode;

  return (
    <section className="py-32 bg-[#fafaf9] font-serif text-center">
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="text-3xl text-stone-800 mb-16 italic font-light tracking-wide">
          Código de Vestimenta
        </h2>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mb-20 flex justify-center"
        >
          <div className="relative w-64 h-80 border-t-2 border-x-2 border-stone-200 pt-8 px-4">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 bg-[#fafaf9]">
              <span className="text-stone-400 uppercase tracking-[0.3em] text-[9px] font-sans">
                {type}
              </span>
            </div>
            {imageUrl ? (
              <img
                src={imageUrl}
                alt="Dress code"
                width={220}
                height={300}
                className="object-contain"
              />
            ) : null}
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 text-left">
          <div className="space-y-4">
            <span className="text-[10px] text-stone-400 uppercase tracking-widest block border-b border-stone-100 pb-2">
              Para Ella
            </span>
            <p className="text-stone-600 text-sm leading-relaxed">{women.description}</p>
            <p className="text-stone-400 italic text-[11px]">{women.restrictions}</p>
          </div>
          <div className="space-y-4">
            <span className="text-[10px] text-stone-400 uppercase tracking-widest block border-b border-stone-100 pb-2">
              Para Él
            </span>
            <p className="text-stone-600 text-sm leading-relaxed">{men.description}</p>
            <p className="text-stone-400 italic text-[11px]">{men.restrictions}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
