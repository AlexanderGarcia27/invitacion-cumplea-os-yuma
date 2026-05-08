'use client';

import { motion } from 'framer-motion';
import { InvitationData } from '@/providers/invitation';

export default function DarkPadrinos({ data }: { data: InvitationData }) {
  return (
    <section className="py-32 bg-[#0a0a0a] relative">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-24"
        >
          <span className="text-[#CFB53B] uppercase tracking-[0.5em] text-[10px] font-bold block mb-4">
            En compañía de Dios y nuestros padres
          </span>
          <h2 className="text-5xl md:text-7xl font-serif text-white italic">Nuestros Padrinos</h2>
          <div className="mt-8 w-24 h-px bg-gradient-to-r from-transparent via-[#CFB53B]/50 to-transparent mx-auto" />
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {data.hosts.map((host, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-[#CFB53B]/5 blur-2xl rounded-full scale-0 group-hover:scale-100 transition-transform duration-700 pointer-events-none" />

              <div className="relative bg-[#111111] p-12 rounded-3xl border border-white/[0.03] group-hover:border-[#CFB53B]/30 transition-all duration-500 shadow-2xl overflow-hidden">
                {/* Decorative gold corner */}
                <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-[#CFB53B]/0 group-hover:border-[#CFB53B]/20 transition-all duration-700 rounded-tr-3xl" />

                <div className="relative z-10">
                  <div className="inline-block px-4 py-1.5 bg-[#CFB53B]/5 rounded-full text-[#CFB53B] uppercase text-[9px] font-bold tracking-[0.2em] mb-8 border border-[#CFB53B]/10">
                    {host.category}
                  </div>

                  <div className="space-y-4">
                    <p className="text-white text-xl font-serif italic tracking-wide group-hover:text-[#CFB53B] transition-colors">
                      {host.godfatherName}
                    </p>
                    <div className="flex items-center justify-center gap-4 opacity-20">
                      <div className="h-px w-8 bg-white" />
                      <span className="text-[#CFB53B] font-serif text-xl italic">&</span>
                      <div className="h-px w-8 bg-white" />
                    </div>
                    <p className="text-white text-xl font-serif italic tracking-wide group-hover:text-[#CFB53B] transition-colors">
                      {host.godmotherName}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
