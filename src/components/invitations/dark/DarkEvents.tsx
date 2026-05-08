'use client';

import { motion } from 'framer-motion';
import { Church, Sparkles } from 'lucide-react';
import EventHelpers from '@/components/EventHelpers';
import { InvitationData } from '@/providers/invitation';

export default function DarkEvents({ data }: { data: InvitationData }) {
  const events = data.locations.map((loc) => {
    const startObj = new Date(data.timing.eventDateTime);
    const [h, m] = loc.time.split(':').map(Number);
    startObj.setHours(h, m, 0, 0);
    const endObj = new Date(startObj.getTime() + 90 * 60000);

    const formatISO = (d: Date) => d.toISOString().replace(/[-:]/g, '').split('.')[0];

    return {
      ...loc,
      dateObject: {
        start: formatISO(startObj),
        end: formatISO(endObj),
      },
    };
  });

  return (
    <section className="py-32 bg-[#0c0c0c] relative overflow-hidden">
      {/* Dynamic background glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#CFB53B]/5 filter blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="text-center mb-28">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h2 className="text-5xl md:text-7xl font-serif text-white italic">
              Ubicación & Horarios
            </h2>
            <div className="flex items-center justify-center gap-4">
              <div className="h-px w-10 bg-[#CFB53B]/30" />
              <span className="text-[#CFB53B] uppercase tracking-[0.4em] text-[10px] font-bold">
                Save the Date
              </span>
              <div className="h-px w-10 bg-[#CFB53B]/30" />
            </div>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 gap-16">
          {events.map((loc, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="relative group h-full"
            >
              {/* Card with dark glassmorphism */}
              <div className="h-full bg-[#151515]/80 backdrop-blur-xl rounded-[40px] p-12 md:p-16 border border-white/[0.05] group-hover:border-[#CFB53B]/30 transition-all duration-700 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] flex flex-col items-center text-center">
                <div className="mb-12 relative">
                  <div className="absolute inset-0 bg-[#CFB53B]/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative p-6 bg-white/[0.02] border border-white/[0.05] rounded-[30px] text-[#CFB53B]">
                    {loc.key === 'ceremony' ? (
                      <Church size={40} strokeWidth={1} />
                    ) : (
                      <Sparkles size={40} strokeWidth={1} />
                    )}
                  </div>
                </div>

                <div className="space-y-8 mb-12 flex-grow">
                  <div>
                    <h3 className="text-3xl font-serif text-white italic mb-2 tracking-wide">
                      {loc.title}
                    </h3>
                    <div className="w-8 h-[2px] bg-[#CFB53B]/40 mx-auto rounded-full" />
                  </div>

                  <div className="space-y-2">
                    <p className="text-[#CFB53B] uppercase tracking-[0.3em] text-xs font-bold">
                      {loc.venueName}
                    </p>
                    <p className="text-white/40 text-sm italic">
                      {loc.time} hrs — {loc.address}
                    </p>
                  </div>

                  <p className="text-white/30 text-sm leading-relaxed max-w-xs mx-auto italic font-light">
                    {loc.description}
                  </p>
                </div>

                <div className="mt-auto w-full group/btn">
                  <EventHelpers
                    title={`${loc.title} - Boda ${data.couple.brideName} & ${data.couple.groomName}`}
                    location={loc.venueName}
                    date={loc.dateObject}
                    description={loc.description}
                    coordinates={{ lat: loc.latitude, lng: loc.longitude }}
                    googleMapsUrl={loc.mapUrl}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
