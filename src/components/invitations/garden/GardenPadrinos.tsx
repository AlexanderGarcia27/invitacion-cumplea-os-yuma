'use client';

import { motion } from 'framer-motion';
import { InvitationData } from '@/providers/invitation';

export default function GardenPadrinos({ data }: { data: InvitationData }) {
  return (
    <section className="py-32 bg-white relative">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-serif text-[#4a5d4c] italic mb-4">
            Nuestros Padrinos
          </h2>
          <div className="w-12 h-1 bg-[#d4af37]/30 mx-auto rounded-full" />
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.hosts.map((host, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="bg-[#f8faf8] p-10 rounded-[40px] border border-[#86a789]/5 hover:shadow-xl hover:bg-white transition-all cursor-default"
            >
              <span className="inline-block px-3 py-1 bg-[#86a789]/10 rounded-full text-[#86a789] uppercase text-[9px] font-bold tracking-widest mb-6">
                {host.category}
              </span>
              <div className="space-y-2">
                <p className="text-[#4a5d4c] text-lg font-serif italic">{host.godfatherName}</p>
                <div className="text-[#d4af37] text-xs font-serif opacity-50">&</div>
                <p className="text-[#4a5d4c] text-lg font-serif italic">{host.godmotherName}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
