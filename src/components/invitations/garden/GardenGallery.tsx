'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { InvitationData } from '@/providers/invitation';
import { Flower, ChevronLeft, ChevronRight } from 'lucide-react';

export default function GardenGallery({ data }: { data: InvitationData }) {
  const [current, setCurrent] = useState(0);
  const images = data.gallery;

  const next = () => setCurrent((prev) => (prev + 1) % images.length);
  const prev = () => setCurrent((_prev) => (_prev - 1 + images.length) % images.length);

  return (
    <section className="py-32 bg-[#f8faf8] overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mb-20 flex flex-col items-center"
        >
          <Flower size={40} className="text-[#d4af37] mb-6 opacity-30" strokeWidth={1} />
          <h2 className="text-4xl md:text-5xl font-serif text-[#4a5d4c] italic">
            Instantes Eternos
          </h2>
          <div className="mt-4 text-[#86a789] text-[10px] tracking-widest uppercase font-bold">
            Nuestra historia en imágenes
          </div>
        </motion.div>

        <div className="relative max-w-5xl mx-auto">
          <div className="aspect-[3/4] md:aspect-video relative overflow-hidden rounded-[80px] shadow-2xl border-8 border-white">
            <motion.div
              key={current}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2 }}
              className="w-full h-full relative"
            >
              <img
                src={images[current] as string}
                alt="Gallery"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#4a5d4c]/40 to-transparent" />
            </motion.div>

            <div className="absolute inset-0 flex items-center justify-between px-8 md:px-12 pointer-events-none">
              <button
                onClick={prev}
                className="p-4 bg-white/30 backdrop-blur-xl rounded-full text-white pointer-events-auto hover:bg-[#86a789]/80 transition-all border border-white/20 shadow-lg"
              >
                <ChevronLeft size={30} strokeWidth={1} />
              </button>
              <button
                onClick={next}
                className="p-4 bg-white/30 backdrop-blur-xl rounded-full text-white pointer-events-auto hover:bg-[#86a789]/80 transition-all border border-white/20 shadow-lg"
              >
                <ChevronRight size={30} strokeWidth={1} />
              </button>
            </div>

            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`transition-all duration-500 rounded-full ${i === current ? 'bg-[#d4af37] w-12 h-1' : 'bg-white/50 w-2 h-1 hover:bg-white'}`}
                />
              ))}
            </div>
          </div>

          {/* Decoration */}
          <div className="hidden md:block absolute -top-10 -right-10 w-20 h-20 border-t-4 border-r-4 border-[#d4af37]/20 rounded-tr-[40px]" />
          <div className="hidden md:block absolute -bottom-10 -left-10 w-20 h-20 border-b-4 border-l-4 border-[#86a789]/20 rounded-bl-[40px]" />
        </div>
      </div>
    </section>
  );
}
