'use client';

import { motion } from 'framer-motion';
import { InvitationData } from '@/providers/invitation';

export default function GardenNotes({ data }: { data: InvitationData }) {
  const { noKids } = data.notes;

  if (!noKids.isEnabled) return null;

  return (
    <section className="py-32 bg-white font-serif text-center relative overflow-hidden">
      {/* Subtle texture circle */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#86a789]/5 rounded-full filter blur-3xl" />

      <div className="max-w-3xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-[#f1f5f1] p-16 rounded-[60px] border border-[#86a789]/10 shadow-sm"
        >
          <span className="text-[#86a789] uppercase tracking-[0.3em] text-[10px] font-bold block mb-12">
            {noKids.title}
          </span>

          <h3 className="text-3xl text-[#4a5d4c] italic font-light mb-8">{noKids.subtitle}</h3>

          <p className="text-[#4a5d4c]/60 text-base leading-relaxed italic max-w-lg mx-auto">
            &quot;{noKids.message}&quot;
          </p>

          <div className="pt-20">
            <div className="inline-block px-10 py-4 bg-white rounded-full shadow-sm border border-[#86a789]/5">
              <span className="text-[#86a789] uppercase tracking-[0.3em] text-[10px] font-bold">
                Confirma antes del{' '}
                {new Date(data.timing.rsvpDeadline).toLocaleDateString('es-MX', {
                  day: 'numeric',
                  month: 'long',
                })}
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
