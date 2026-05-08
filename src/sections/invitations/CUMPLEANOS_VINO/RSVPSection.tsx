'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Title, Subtitle, BodyText } from '@/src/components/Typography';
import { MessageCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function RSVPSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Static Data
  const title = 'Asistencia';
  const subtitle = 'Confirma tu presencia';
  const description = 'Me encantaría que me acompañaras en este día tan especial. Por favor, confirma tu asistencia haciendo clic en el botón de abajo.';
  const phoneNumber = '527711138128'; // Replace with the actual WhatsApp number
  const message = 'Hola si voy a ir a tu fiesta 🎉';
  const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  useGSAP(
    () => {
      gsap.fromTo(
        '.rsvp-content > *',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="py-24 text-center bg-background">
      <div className="max-w-xl mx-auto px-6 rsvp-content">
        <Subtitle className="mb-4 block text-olive tracking-[0.25em]">{subtitle}</Subtitle>
        <Title className="mb-8">{title}</Title>
        <BodyText className="mb-12">{description}</BodyText>

        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 bg-[#25D366] text-white px-8 py-4 rounded-full font-sans hover:bg-[#128C7E] transition-colors shadow-lg"
        >
          <MessageCircle size={24} />
          <span className="font-semibold tracking-wide">Confirmar por WhatsApp</span>
        </a>
      </div>
    </section>
  );
}
