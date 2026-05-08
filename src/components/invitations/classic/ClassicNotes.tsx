'use client';

import { motion } from 'framer-motion';
import { InvitationData } from '@/providers/invitation';

export default function ClassicNotes({ data }: { data: InvitationData }) {
  const { noKids } = data.notes;

  if (!noKids.isEnabled) return null;

  return (
    <section className="py-32 bg-stone-50 font-serif text-center">
      <div className="max-w-2xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <span className="text-stone-400 tracking-[0.2em] uppercase text-[10px] block">
            {noKids.title}
          </span>

          <h3 className="text-2xl text-stone-800 italic font-light">{noKids.subtitle}</h3>

          <div className="w-8 h-px bg-stone-200 mx-auto" />

          <p className="text-stone-500 text-sm leading-relaxed italic max-w-lg mx-auto">
            &quot;{noKids.message}&quot;
          </p>

          <div className="pt-20">
            <span className="text-stone-300 uppercase tracking-[0.3em] text-[9px] block">
              R.S.V.P. —{' '}
              {new Date(data.timing.rsvpDeadline).toLocaleDateString('es-MX', {
                day: 'numeric',
                month: 'long',
              })}
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
