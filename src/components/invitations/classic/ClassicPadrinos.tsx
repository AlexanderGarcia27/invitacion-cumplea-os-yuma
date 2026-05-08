'use client';

import { motion } from 'framer-motion';
import { InvitationData } from '@/providers/invitation';

export default function ClassicPadrinos({ data }: { data: InvitationData }) {
  return (
    <section className="py-32 bg-[#fafaf9] text-center font-serif">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-3xl mx-auto px-6"
      >
        <h2 className="text-3xl text-stone-800 mb-20 italic font-light tracking-wide">
          Con la bendición de nuestros padrinos
        </h2>

        <div className="grid md:grid-cols-2 gap-x-20 gap-y-16">
          {data.hosts.map((host, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="border-b border-stone-200 pb-8 flex flex-col items-center"
            >
              <span className="text-stone-400 uppercase tracking-[0.2em] text-[9px] mb-4 block">
                {host.category}
              </span>
              <p className="text-stone-700 text-lg mb-1 leading-relaxed">{host.godfatherName}</p>
              <p className="text-stone-300 italic text-sm my-1">y</p>
              <p className="text-stone-700 text-lg leading-relaxed">{host.godmotherName}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
