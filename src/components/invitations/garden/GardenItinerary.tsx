'use client';

import { motion } from 'framer-motion';
import { InvitationData } from '@/providers/invitation';
import {
  Moon,
  Heart,
  Clock,
  Music2,
  GlassWater,
  UtensilsCrossed,
  Cake as CakeIcon,
} from 'lucide-react';

const getIcon = (iconName: string) => {
  const props = { size: 22, strokeWidth: 1.5, className: 'text-[#86a789]' };
  switch (iconName) {
    case 'cocktail':
      return <GlassWater {...props} />;
    case 'heart':
      return <Heart {...props} />;
    case 'food':
      return <UtensilsCrossed {...props} />;
    case 'music':
      return <Music2 {...props} />;
    case 'cake':
      return <CakeIcon {...props} />;
    case 'moon':
      return <Moon {...props} />;
    default:
      return <Heart {...props} />;
  }
};

export default function GardenItinerary({ data }: { data: InvitationData }) {
  return (
    <section className="py-32 bg-white relative overflow-hidden">
      {/* Decorative floral elements placeholder */}
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-[#f1f5f1]/50 to-transparent" />

      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-24 relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="absolute -top-12 left-1/2 -translate-x-1/2 text-[#d4af37]/10"
          >
            <Clock size={120} strokeWidth={0.5} />
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-serif text-[#4a5d4c] italic relative z-10">
            Línea del Tiempo
          </h2>
          <div className="mt-6 text-[#86a789] text-[10px] tracking-[0.4em] uppercase font-bold">
            Cada instante cuenta
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.timeline.map((event, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              className="bg-[#f8faf8] p-8 rounded-[40px] border border-[#86a789]/5 shadow-sm hover:shadow-xl hover:bg-white transition-all group"
            >
              <div className="flex justify-between items-start mb-8">
                <div className="p-4 bg-white rounded-2xl shadow-sm group-hover:bg-[#86a789] group-hover:text-white transition-colors">
                  {getIcon(event.icon)}
                </div>
                <span className="text-[#d4af37] font-bold tracking-widest text-sm bg-white px-4 py-1 rounded-full shadow-sm">
                  {event.time}
                </span>
              </div>

              <h4 className="text-[#4a5d4c] text-lg uppercase tracking-wider font-bold mb-3">
                {event.title}
              </h4>
              <p className="text-[#4a5d4c]/50 italic text-sm leading-relaxed">
                {event.description || 'Un momento para recordar y celebrar juntos.'}
              </p>

              <div className="mt-8 pt-6 border-t border-black/5 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-2 h-2 rounded-full bg-[#86a789]/30 mx-auto" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
