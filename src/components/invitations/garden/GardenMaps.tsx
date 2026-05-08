'use client';

import { motion } from 'framer-motion';
import EventHelpers from '@/components/EventHelpers';
import { InvitationData } from '@/providers/invitation';

export default function GardenMaps({ data }: { data: InvitationData }) {
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
    <section className="py-32 bg-[#fafdfa] font-serif">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-5xl text-[#4a5d4c] mb-24 italic font-light">Ubicaciones</h2>

        <div className="grid md:grid-cols-2 gap-16">
          {locations.map((loc, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="space-y-10"
            >
              <div className="space-y-6">
                <h4 className="text-[#86a789] text-[10px] uppercase tracking-[0.3em] font-bold">
                  {loc.title}
                </h4>
                <div className="w-full h-80 rounded-[50px] overflow-hidden shadow-xl border-4 border-white">
                  <iframe
                    src={loc.embedUrl}
                    width="100%"
                    height="100%"
                    loading="lazy"
                    className="opacity-90 hover:opacity-100 transition-opacity border-none grayscale-[20%] sepia-[10%]"
                  />
                </div>
              </div>

              <div className="pt-4 scale-110">
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
