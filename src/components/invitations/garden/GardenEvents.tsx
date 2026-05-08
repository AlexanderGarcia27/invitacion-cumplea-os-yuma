'use client';

import { motion } from 'framer-motion';
import { Church, Sparkles } from 'lucide-react';
import EventHelpers from '@/components/EventHelpers';
import { InvitationData } from '@/providers/invitation';

export default function GardenEvents({ data }: { data: InvitationData }) {
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
    <section className="py-32 bg-[#f1f5f1] relative">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-24">
          <span className="text-[#86a789] uppercase tracking-[0.3em] text-[10px] font-bold mb-4 block">
            Dos momentos, un amor
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-[#4a5d4c] italic">
            ¿Dónde y Cuándo?
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {events.map((loc, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white/60 backdrop-blur-md rounded-[50px] p-12 shadow-lg border border-white flex flex-col items-center text-center relative overflow-hidden group"
            >
              {/* Floating icon */}
              <div className="mb-8 p-4 bg-[#86a789]/10 rounded-full text-[#86a789] group-hover:scale-125 transition-transform duration-500">
                {loc.key === 'ceremony' ? (
                  <Church size={32} strokeWidth={1.5} />
                ) : (
                  <Sparkles size={32} strokeWidth={1.5} />
                )}
              </div>

              <h3 className="text-2xl font-serif text-[#4a5d4c] mb-6 italic">{loc.title}</h3>

              <div className="space-y-4 mb-10">
                <p className="text-[#86a789] uppercase tracking-widest text-sm font-bold">
                  {loc.venueName}
                </p>
                <p className="text-[#4a5d4c]/70 text-sm italic">
                  {loc.time} hrs — {loc.address}
                </p>
                <p className="text-[#4a5d4c]/50 text-xs leading-relaxed max-w-xs pt-4 border-t border-black/5">
                  {loc.description}
                </p>
              </div>

              <div className="mt-auto">
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
