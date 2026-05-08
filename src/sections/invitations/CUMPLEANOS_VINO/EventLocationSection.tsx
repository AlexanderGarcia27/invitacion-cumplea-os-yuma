'use client';

import gsap from 'gsap';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import BotanicalSVG from '@/src/components/BotanicalSVG';
import EventHelpers from '@/src/components/EventHelpers';
import { Title, Subtitle, BodyText } from '@/src/components/Typography';

gsap.registerPlugin(ScrollTrigger);

export default function EventLocationSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Static Data mapping
  const closingLine = 'Los espero para celebrar a lo grande';
  const events = [
    {
      title: 'Fiesta',
      venueName: 'Ven a mi casa a celebrar',
      description: 'Celebraremos todos juntos con música, comida y mucha diversión.',
      time: '14:30',
      mapUrl: `https://www.google.com/maps/place/20%C2%B002'58.6%22N+98%C2%B048'33.4%22W/@20.049614,-98.809271,779m/data=!3m2!1e3!4b1!4m4!3m3!8m2!3d20.049614!4d-98.809271?entry=ttu&g_ep=EgoyMDI2MDUwMi4wIKXMDSoASAFQAw%3D%3D`,
      embedUrl: 'https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3391.762696122956!2d-98.809271!3d20.049614000000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjDCsDAyJzU4LjYiTiA5OMKwNDgnMzMuNCJX!5e1!3m2!1ses!2smx!4v1778200192929!5m2!1ses!2smx',
      latitude: 20.049614,
      longitude: -98.809271,
      dateObject: {
        start: '20261206T180000Z',
        end: '20261206T193000Z'
      }
    }
  ];

  useGSAP(
    () => {
      // Guided Line Animation
      gsap.fromTo(
        '.guided-line',
        { height: 0 },
        {
          height: '100%',
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 20%',
            end: 'bottom 80%',
            scrub: true,
          },
        }
      );

      // Cards Animation
      const cards = gsap.utils.toArray<HTMLElement>('.event-location-card');
      cards.forEach((card) => {
        gsap.fromTo(
          card,
          {
            y: 100,
            opacity: 0,
            scale: 0.95,
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top bottom-=100',
              toggleActions: 'play none none reverse',
            },
          }
        );

        // Content Stagger
        const elements = card.querySelectorAll('.animate-content');
        gsap.fromTo(
          elements,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.1,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top bottom-=50',
              toggleActions: 'play none none reverse',
            },
            delay: 0.4,
          }
        );
      });

      // Botanical Parallax
      gsap.from('.deco-item', {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top center',
          scrub: 1.5,
        },
        y: 80,
        opacity: 0,
        rotate: 10,
      });

      // Header animation
      gsap.from('.section-header > *', {
        y: 30,
        opacity: 0,
        stagger: 0.2,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.section-header',
          start: 'top 85%',
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="relative w-full py-32 px-4 md:px-12 overflow-hidden">
      <div className="guided-line absolute top-0 left-1/2 -translate-x-1/2 w-px bg-gradient-to-b from-transparent via-olive/30 to-transparent h-full z-0 opacity-50" />

      <div className="deco-item absolute -left-12 top-40 w-48 md:w-80 opacity-40 pointer-events-none z-0">
        <BotanicalSVG type="eucalyptus" delay={0.2} />
      </div>
      <div className="deco-item absolute -right-8 top-[30%] w-32 md:w-48 opacity-30 pointer-events-none z-0">
        <BotanicalSVG type="white-rose" delay={0.5} flip />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="section-header text-center mb-24">
          <Subtitle className="mb-4 text-warm-gray uppercase tracking-[0.4em] text-[10px] md:text-xs font-bold">
            Cuándo y Dónde
          </Subtitle>
          <Title className="text-foreground italic font-light drop-shadow-sm">
            Acompáñanos a celebrar
          </Title>
          <div className="w-12 h-px bg-olive/40 mx-auto mt-8" />
        </div>

        <div className="flex flex-col gap-32 z-10">
          {events.map((ev, i) => (
            <div
              key={i}
              className="event-location-card w-full max-w-2xl mx-auto bg-background p-8 md:p-16 shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-beige/30 rounded-2xl relative group"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-olive/10 to-transparent rounded-t-2xl" />

              <div className="text-center mb-12">
                <Subtitle className="animate-content mb-4 block text-olive font-bold tracking-[0.2em] text-sm md:text-base italic">
                  {ev.time}
                </Subtitle>
                <Title className="animate-content text-4xl md:text-6xl mb-8 text-foreground font-light tracking-wide">
                  {ev.title}
                </Title>

                <h3 className="animate-content font-serif text-2xl md:text-3xl mb-4 text-foreground/80 italic">
                  {ev.venueName}
                </h3>
                <BodyText className="animate-content mb-12 text-foreground/60 max-w-md mx-auto leading-relaxed">
                  {ev.description}
                </BodyText>
              </div>

              <div className="animate-content mb-12 w-full h-72 md:h-96 bg-foreground/5 rounded-xl overflow-hidden shadow-inner border border-beige/20 relative group-hover:shadow-md transition-shadow duration-700">
                <iframe
                  src={ev.embedUrl}
                  width="100%"
                  height="100%"
                  loading="lazy"
                  className="opacity-90 hover:opacity-100 transition-opacity duration-1000 grayscale-[0.3] hover:grayscale-0"
                  title="Mapa Location"
                />
              </div>
              <div className="animate-content flex justify-center">
                <EventHelpers
                  title={`${ev.title} - Cumpleaños de Yuma`}
                  location={ev.venueName}
                  date={ev.dateObject}
                  description={ev.description}
                  coordinates={{ lat: ev.latitude, lng: ev.longitude }}
                  googleMapsUrl={ev.mapUrl}
                />
              </div>
            </div>
          ))}
        </div>
        
        {closingLine && (
          <div className="text-center mt-32 animate-content">
            <div className="w-12 h-px bg-beige/20 mx-auto mb-8 opacity-60" />
            <span className="font-serif italic text-warm-gray/70 text-xl md:text-2xl px-8 block max-w-2xl mx-auto">
              "{closingLine}"
            </span>
          </div>
        )}
      </div>
      
      <div className="deco-item absolute -right-8 bottom-40 w-56 md:w-96 opacity-35 pointer-events-none rotate-12 z-0">
        <BotanicalSVG type="babys-breath" delay={0.7} />
      </div>
      <div className="deco-item absolute -left-10 bottom-20 w-32 md:w-48 opacity-25 pointer-events-none -rotate-12 z-0">
        <BotanicalSVG type="white-rose" delay={0.9} />
      </div>
    </section>
  );
}
