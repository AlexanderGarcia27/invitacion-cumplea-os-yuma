'use client';

import { motion } from 'framer-motion';
import EventHelpers from '@/components/EventHelpers';
import { InvitationData } from '@/providers/invitation';

export default function ClassicMaps({ data }: { data: InvitationData }) {
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
    <section className="py-32 bg-white font-serif">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-3xl text-stone-800 mb-20 italic font-light tracking-wide">
          Ubicaciones
        </h2>

        <div className="grid md:grid-cols-2 gap-12">
          {locations.map((loc, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <h4 className="text-stone-700 text-xs uppercase tracking-[0.2em] font-semibold">
                  {loc.title}
                </h4>
                <div className="w-full h-64 border border-stone-100 overflow-hidden shadow-sm">
                  <iframe
                    src={loc.embedUrl}
                    width="100%"
                    height="100%"
                    loading="lazy"
                    className="opacity-90 hover:opacity-100 transition-opacity border-none"
                  />
                </div>
              </div>

              <div className="pt-4">
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
