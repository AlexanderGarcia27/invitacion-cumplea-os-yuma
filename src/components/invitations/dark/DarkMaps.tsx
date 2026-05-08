'use client';

import { motion } from 'framer-motion';
import EventHelpers from '@/components/EventHelpers';
import { InvitationData } from '@/providers/invitation';

export default function DarkMaps({ data }: { data: InvitationData }) {
  const locations = data.locations.map((loc) => {
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
    <section className="py-32 bg-[#0a0a0a] relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-5xl md:text-7xl font-serif text-white mb-28 italic"
        >
          Ubicaciones
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-20">
          {locations.map((loc, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-12"
            >
              <div className="space-y-6">
                <span className="text-[#CFB53B] text-[10px] uppercase tracking-[0.5em] font-bold block">
                  {loc.title}
                </span>
                <div className="w-full h-[450px] rounded-[50px] overflow-hidden shadow-[0_40px_80px_-15px_rgba(0,0,0,0.8)] border border-white/10 group">
                  <iframe
                    src={loc.embedUrl}
                    width="100%"
                    height="100%"
                    loading="lazy"
                    className="opacity-60 hover:opacity-100 transition-opacity duration-700 border-none grayscale-[80%] invert-[90%] hue-rotate-180 contrast-[110%]"
                  />
                </div>
              </div>

              <div className="scale-110">
                <EventHelpers
                  title={`${loc.title} - Boda ${data.couple.brideName} & ${data.couple.groomName}`}
                  location={loc.venueName}
                  date={loc.dateObject}
                  description={loc.description}
                  coordinates={{ lat: loc.latitude, lng: loc.longitude }}
                  googleMapsUrl={loc.mapUrl}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
