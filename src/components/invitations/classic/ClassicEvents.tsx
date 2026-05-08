'use client';

import { motion } from 'framer-motion';
import EventHelpers from '@/components/EventHelpers';
import { InvitationData } from '@/providers/invitation';

export default function ClassicEvents({ data }: { data: InvitationData }) {
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
    <section className="py-32 bg-white text-center font-serif">
      <div className="max-w-4xl mx-auto px-6">
        <span className="text-stone-400 tracking-[0.3em] uppercase text-[10px] mb-20 block">
          Detalles de la celebración
        </span>

        <div className="space-y-32">
          {events.map((loc, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-col items-center"
            >
              <h3 className="text-2xl text-stone-800 mb-6 italic tracking-wide">{loc.title}</h3>

              <div className="w-8 h-px bg-stone-200 mb-8" />

              <div className="space-y-4 max-w-md mx-auto mb-10">
                <p className="text-stone-600 text-lg tracking-wide uppercase text-[13px]">
                  {loc.venueName}
                </p>
                <div className="flex justify-center items-center gap-4 text-stone-400 text-xs tracking-widest uppercase">
                  <span>{loc.time} hrs</span>
                  <span className="h-4 w-px bg-stone-200" />
                  <span>{loc.address}</span>
                </div>
                <p className="text-stone-500 italic text-sm leading-relaxed pt-4 border-t border-stone-100">
                  {loc.description}
                </p>
              </div>

              <EventHelpers
                title={`${loc.title} - Boda ${data.couple.brideName} & ${data.couple.groomName}`}
                location={loc.venueName}
                date={loc.dateObject}
                description={loc.description}
                coordinates={{ lat: loc.latitude, lng: loc.longitude }}
                googleMapsUrl={loc.mapUrl}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
