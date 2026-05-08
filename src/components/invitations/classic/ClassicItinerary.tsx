'use client';

import { motion } from 'framer-motion';
import { InvitationData } from '@/providers/invitation';
import { Moon, Heart, Music2, GlassWater, UtensilsCrossed, Cake as CakeIcon } from 'lucide-react';

const getIcon = (iconName: string) => {
  const props = { size: 18, strokeWidth: 1.2, className: 'text-stone-400' };
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

export default function ClassicItinerary({ data }: { data: InvitationData }) {
  return (
    <section className="py-32 bg-[#fafaf9] font-serif overflow-hidden">
      <div className="max-w-xl mx-auto px-6 text-center">
        <h2 className="text-3xl text-stone-800 mb-20 italic font-light tracking-wide">
          Nuestro Itinerario
        </h2>

        <div className="relative">
          {/* Central Line */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-stone-200" />

          <div className="space-y-24 relative">
            {data.timeline.map((event, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                className="flex items-center justify-center relative"
              >
                {/* Connector Dot */}
                <div className="absolute left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-white border border-stone-300 z-10" />

                <div
                  className={`w-full flex ${i % 2 === 0 ? 'flex-row-reverse text-right pr-4' : 'flex-row text-left pl-4'}`}
                >
                  <div className="w-1/2" />
                  <div className="w-1/2 px-4 space-y-2">
                    <div className="flex items-center gap-3 mb-1 justify-start">
                      {getIcon(event.icon)}
                      <span className="text-[10px] text-stone-400 tracking-[0.2em] font-sans">
                        {event.time}
                      </span>
                    </div>
                    <h4 className="text-stone-700 text-xs uppercase tracking-widest font-semibold">
                      {event.title}
                    </h4>
                    <p className="text-stone-500 italic text-[11px] leading-relaxed">
                      {event.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
