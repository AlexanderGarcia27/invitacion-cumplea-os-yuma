'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Title, Subtitle, BodyText } from '@/src/components/Typography';
import { Banknote, Mail } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function GiftsSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        '.gifts-content > *',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="py-32 text-center relative overflow-hidden bg-background">
      {/* Decorative header line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-16 bg-gradient-to-b from-transparent to-olive/20" />
      
      <div className="max-w-2xl mx-auto px-6 gifts-content relative z-10">
        <Subtitle className="mb-6 block text-olive tracking-[0.4em] uppercase text-[10px] md:text-xs font-bold">
          Sugerencia de Regalo
        </Subtitle>
        
        <Title className="mb-12 italic font-light">Mesa de Regalos</Title>
        
        <div className="mb-16 flex flex-col items-center">
          <div className="relative mb-10">
            <div className="w-20 h-20 rounded-full border border-olive/10 flex items-center justify-center relative bg-white shadow-sm">
              <Mail size={32} className="text-olive/40 absolute -top-2 -right-2 rotate-12" strokeWidth={1} />
              <Banknote size={36} className="text-olive/70" strokeWidth={1} />
            </div>
          </div>
          
          <BodyText className="mb-12 text-foreground/60 max-w-md italic leading-relaxed text-lg">
            "Tu presencia es mi mayor regalo, pero si deseabas obsequiarme algo, no te preocupes por qué elegir; agradecería que fuese en efectivo para poder seguir cumpliendo mis sueños."
          </BodyText>
          
          <div className="w-full max-w-sm mx-auto overflow-hidden rounded-3xl border border-olive/10 bg-white/50 backdrop-blur-sm p-8 shadow-[0_10px_40px_rgba(0,0,0,0.02)]">
            <div className="flex flex-col gap-6">
              <div className="text-center">
                <p className="font-sans text-foreground/50 text-sm mb-6 tracking-wide uppercase">
                  Agradezco cualquier detalle en efectivo
                </p>
                <div className="flex justify-center gap-3">
                  {['$100', '$200', '$300', '...'].map((amount, i) => (
                    <div 
                      key={i} 
                      className="px-4 py-2 rounded-full border border-olive/10 text-olive/60 font-serif italic text-lg"
                    >
                      {amount}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-12 h-px bg-olive/20 mx-auto mt-4" />
      </div>
    </section>
  );
}
