'use client';

import { useState } from 'react';
import { Title } from '@/src/components/Typography';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function SliderSection() {
  const [current, setCurrent] = useState(0);

  // Static Data
  const images = [
    '/slider/foto-1.jpeg',
    '/slider/foto-2.jpeg',
    '/slider/foto-3.jpeg',
    '/slider/foto-4.jpeg',
    '/slider/foto-5.jpeg',
    '/slider/foto-6.jpeg',
    '/slider/foto-7.jpeg',
    '/slider/foto-8.jpeg',
    '/slider/foto-9.jpeg',
    '/slider/foto-10.jpeg',
    '/slider/foto-11.jpeg',
  ];

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  if (images.length === 0) return null;

  return (
    <section className="py-24 text-center">
      <div className="max-w-3xl mx-auto px-4">
        <Title className="mb-12 italic">Galería</Title>
        <div className="relative flex justify-center items-center">
          <button
            onClick={prevSlide}
            className="absolute left-0 md:-left-12 text-foreground/40 hover:text-foreground/60 transition"
          >
            <ChevronLeft size={32} strokeWidth={1.5} />
          </button>
          <div className="relative w-[280px] md:w-[380px] h-[420px] md:h-[560px] overflow-hidden shadow-lg">
            <img
              src={images[current]}
              alt="Galería"
              className="w-full h-full object-cover"
            />
          </div>
          <button
            onClick={nextSlide}
            className="absolute right-0 md:-right-12 text-foreground/40 hover:text-foreground/60 transition"
          >
            <ChevronRight size={32} strokeWidth={1.5} />
          </button>
        </div>
        <div className="flex justify-center gap-2 mt-8">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                current === index ? 'bg-foreground/60 w-3' : 'bg-foreground/20'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
