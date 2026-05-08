'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { InvitationData } from '@/providers/invitation';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function ClassicGallery({ data }: { data: InvitationData }) {
  const [current, setCurrent] = useState(0);
  const images = data.gallery;

  const next = () => setCurrent((prev) => (prev + 1) % images.length);
  const prev = () => setCurrent((_prev) => (_prev - 1 + images.length) % images.length);

  return (
    <section className="py-32 bg-white font-serif">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-3xl text-stone-800 mb-20 italic font-light tracking-wide">
          Nuestra Historia
        </h2>

        <div className="relative max-w-lg mx-auto aspect-4/5 overflow-hidden group shadow-2xl border-4 border-white">
          <motion.div
            key={current}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="w-full h-full relative"
          >
            {images[current] ? (
              <img src={images[current]} alt="Gallery" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500">Imagen no disponible</span>
              </div>
            )}
          </motion.div>

          <button
            onClick={prev}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/20 backdrop-blur-md rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <ChevronLeft size={24} strokeWidth={1} />
          </button>
          <button
            onClick={next}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/20 backdrop-blur-md rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <ChevronRight size={24} strokeWidth={1} />
          </button>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((_, i) => (
              <div
                key={i}
                className={`w-1 h-1 rounded-full transition-all ${i === current ? 'bg-white w-4' : 'bg-white/40'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
