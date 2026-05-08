'use client';

import { motion } from 'framer-motion';
import { InvitationData } from '@/providers/invitation';
import {
  Moon,
  Star,
  Heart,
  Music2,
  GlassWater,
  UtensilsCrossed,
  Cake as CakeIcon,
} from 'lucide-react';

const ATMOSPHERIC_STARS_CONFIG = {
  STYLE: {
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
  },
  TRANSITION_DURATION: 2 + Math.random() * 4,
};

const getIcon = (iconName: string) => {
  const props = { size: 24, strokeWidth: 1.5, className: 'text-[#CFB53B]' };
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

export default function DarkItinerary({ data }: { data: InvitationData }) {
  return (
    <section className="py-32 bg-[#0a0a0a] relative overflow-hidden">
      {/* Atmospheric Star Background Elements */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ opacity: [0.2, 0.5, 0.2] }}
            className="absolute"
            transition={{
              duration: ATMOSPHERIC_STARS_CONFIG.TRANSITION_DURATION,
              repeat: Infinity,
            }}
            style={ATMOSPHERIC_STARS_CONFIG.STYLE}
          >
            <Star size={4} className="text-white fill-white" />
          </motion.div>
        ))}
      </div>

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="text-center mb-32">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-5xl md:text-7xl font-serif text-white italic">Itinerario</h2>
            <div className="h-[2px] w-20 bg-gradient-to-r from-transparent via-[#CFB53B]/40 to-transparent mx-auto" />
          </motion.div>
        </div>

        <div className="relative">
          {/* Central Line with glow */}
          <div className="absolute left-[20px] md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-[#CFB53B]/20 to-transparent" />

          <div className="space-y-24">
            {data.timeline.map((event, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                className={`relative flex items-center md:justify-center ${i % 2 === 0 ? 'md:flex-row-reverse' : 'md:flex-row'}`}
              >
                {/* Connector Point with glow */}
                <div className="absolute left-[20px] md:left-1/2 -translate-x-1/2">
                  <div className="w-10 h-10 rounded-full bg-[#0a0a0a] border border-[#CFB53B]/40 flex items-center justify-center z-20 shadow-[0_0_15px_rgba(207,181,59,0.2)]">
                    <div className="w-2 h-2 rounded-full bg-[#CFB53B] animate-pulse" />
                  </div>
                </div>

                {/* Content Card */}
                <div className="w-full md:w-1/2 pl-16 md:pl-0">
                  <div className={`md:w-[85%] ${i % 2 === 0 ? 'md:mr-auto' : 'md:ml-auto'} group`}>
                    <motion.div
                      whileHover={{ y: -5 }}
                      className="bg-[#111111] p-10 rounded-[40px] border border-white/[0.03] group-hover:border-[#CFB53B]/20 transition-all duration-500 shadow-2xl relative overflow-hidden"
                    >
                      {/* Inner soft glow */}
                      <div className="absolute -top-10 -right-10 w-24 h-24 bg-[#CFB53B]/5 blur-2xl rounded-full" />

                      <div className="flex items-center gap-6 mb-8">
                        <div className="p-4 bg-white/[0.02] rounded-2xl border border-white/[0.05] group-hover:text-[#CFB53B] transition-colors">
                          {getIcon(event.icon)}
                        </div>
                        <div className="h-px flex-grow bg-white/5" />
                        <span className="text-[#CFB53B] font-bold tracking-[0.3em] text-[11px] bg-[#CFB53B]/5 px-4 py-1.5 rounded-full border border-[#CFB53B]/10">
                          {event.time}
                        </span>
                      </div>

                      <h4 className="text-white text-lg uppercase tracking-[0.2em] font-bold mb-3 group-hover:text-[#CFB53B] transition-colors">
                        {event.title}
                      </h4>
                      <p className="text-white/30 italic text-sm leading-relaxed font-light">
                        {event.description || 'Un momento lleno de alegría y emoción.'}
                      </p>
                    </motion.div>
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
