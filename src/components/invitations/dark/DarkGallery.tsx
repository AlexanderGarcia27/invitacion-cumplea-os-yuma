'use client';

import { useState } from 'react';
import { InvitationData } from '@/providers/invitation';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, ChevronLeft, ChevronRight } from 'lucide-react';

export default function DarkGallery({ data }: { data: InvitationData }) {
  const [current, setCurrent] = useState(0);
  const images = data.gallery;

  const next = () => setCurrent((prev) => (prev + 1) % images.length);
  const prev = () => setCurrent((_prev) => (_prev - 1 + images.length) % images.length);

  return (
    <section className="py-32 bg-[#0a0a0a] overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mb-32 flex flex-col items-center"
        >
          <div className="p-5 bg-white/[0.02] rounded-full border border-[#CFB53B]/20 text-[#CFB53B] mb-8">
            <Camera size={32} strokeWidth={1} />
          </div>
          <h2 className="text-5xl md:text-7xl font-serif text-white italic">Sesión de Fotos</h2>
          <div className="mt-6 flex items-center gap-3">
            <div className="h-px w-6 bg-white/10" />
            <span className="text-[#CFB53B] text-[10px] tracking-[0.5em] uppercase font-bold">
              Instantes
            </span>
            <div className="h-px w-6 bg-white/10" />
          </div>
        </motion.div>

        <div className="relative max-w-5xl mx-auto group">
          <div className="aspect-3/4 md:aspect-video relative overflow-hidden rounded-[60px] shadow-[0_50px_100px_-20px_rgba(0,0,0,1)] border border-white/5">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, filter: 'blur(20px)' }}
                animate={{ opacity: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, filter: 'blur(20px)' }}
                transition={{ duration: 1 }}
                className="w-full h-full relative"
              >
                {images[current] ? (
                  <img
                    src={images[current]}
                    alt="Gallery"
                    className="w-full h-full object-cover transition-transform duration-4000 scale-110 group-hover:scale-100"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-900 flex items-center justify-center">
                    <span className="text-gray-500">Imagen no disponible</span>
                  </div>
                )}

                <div className="absolute inset-0 bg-linear-to-t from-[#0a0a0a] via-transparent to-transparent opacity-60" />
              </motion.div>
            </AnimatePresence>

            {/* Navigation - Cinematic Gold */}
            <div className="absolute inset-0 flex items-center justify-between px-6 md:px-12 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <button
                onClick={prev}
                className="p-5 bg-black/40 backdrop-blur-2xl rounded-full text-[#CFB53B] hover:bg-[#CFB53B] hover:text-black transition-all border border-white/10 shadow-2xl pointer-events-auto"
              >
                <ChevronLeft size={32} strokeWidth={1.5} />
              </button>
              <button
                onClick={next}
                className="p-5 bg-black/40 backdrop-blur-2xl rounded-full text-[#CFB53B] hover:bg-[#CFB53B] hover:text-black transition-all border border-white/10 shadow-2xl pointer-events-auto"
              >
                <ChevronRight size={32} strokeWidth={1.5} />
              </button>
            </div>

            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-4">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`transition-all duration-700 rounded-full h-1.5 ${i === current ? 'bg-[#CFB53B] w-12' : 'bg-white/20 w-3 hover:bg-white/40'}`}
                />
              ))}
            </div>
          </div>

          {/* Cinematic frame corners */}
          <div className="absolute -top-4 -left-4 w-12 h-12 border-t border-l border-[#CFB53B]/30 rounded-tl-3xl pointer-events-none" />
          <div className="absolute -bottom-4 -right-4 w-12 h-12 border-b border-r border-[#CFB53B]/30 rounded-br-3xl pointer-events-none" />
        </div>
      </div>
    </section>
  );
}
