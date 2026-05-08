'use client';

import { motion } from 'framer-motion';
import { InvitationData } from '@/providers/invitation';

export default function GardenDressCode({ data }: { data: InvitationData }) {
  const { type, women, men, imageUrl } = data.dressCode;

  return (
    <section className="py-32 bg-white text-center font-serif">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-4xl md:text-5xl text-[#4a5d4c] mb-20 italic">Código de Vestimenta</h2>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative group"
          >
            {/* Decorative background shape */}
            <div className="absolute inset-0 bg-[#86a789]/10 rounded-[60px] translate-x-4 translate-y-4 -z-10 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-500" />
            <div className="bg-white rounded-[60px] p-8 shadow-xl border border-[#86a789]/5">
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt="Dress code"
                  width={300}
                  height={400}
                  className="object-contain mx-auto transition-transform duration-700 group-hover:scale-105"
                />
              ) : null}
              <div className="mt-6 px-6 py-2 bg-[#86a789]/5 inline-block rounded-full">
                <span className="text-[#86a789] uppercase tracking-widest text-xs font-bold">
                  {type}
                </span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-left space-y-12"
          >
            <div className="relative pl-8">
              <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-[#d4af37]/30" />
              <span className="text-[10px] text-[#86a789] uppercase tracking-[0.4em] font-bold block mb-4">
                Para Ella
              </span>
              <p className="text-[#4a5d4c] text-lg italic leading-relaxed">{women.description}</p>
              <p className="text-[#4a5d4c]/50 text-xs mt-3">{women.restrictions}</p>
            </div>

            <div className="relative pl-8">
              <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-[#d4af37]/30" />
              <span className="text-[10px] text-[#86a789] uppercase tracking-[0.4em] font-bold block mb-4">
                Para Él
              </span>
              <p className="text-[#4a5d4c] text-lg italic leading-relaxed">{men.description}</p>
              <p className="text-[#4a5d4c]/50 text-xs mt-3">{men.restrictions}</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
