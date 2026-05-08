'use client';

import { createPortal } from 'react-dom';
import { useState, useEffect } from 'react';
import { X, MapPin, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import BotonBase from './BotonBase';

// Brand Icons as SVG components
const GoogleCalendarIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" className="shrink-0">
    <path
      fill="#4285F4"
      d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12s4.48 10 10 10 10-4.48 10-10z"
      opacity="0.1"
    />
    <path fill="#4285F4" d="M12 7v5l4.28 2.54.72-1.21-3.5-2.08V7H12z" />
    <path fill="#EA4335" d="M17.83 6.17L12 12l5.83 5.83c3.13-3.13 3.13-8.21 0-11.34l-.01-.32z" />
    <path fill="#FBBC05" d="M6.17 6.17c-3.13 3.13-3.13 8.21 0 11.34L12 12 6.17 6.17z" />
    <path
      fill="#34A853"
      d="M12 22c2.76 0 5.26-1.12 7.07-2.93L12 12l-7.07 7.07A9.96 9.96 0 0012 22z"
    />
    <path fill="#4285F4" d="M12 2C9.24 2 6.74 3.12 4.93 4.93L12 12l7.07-7.07A9.96 9.96 0 0012 2z" />
  </svg>
);

const AppleIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" className="shrink-0">
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
  </svg>
);

// Official Google "G" Logo
const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" className="shrink-0">
    <path
      fill="#4285F4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="#34A853"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="#FBBC05"
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
    />
    <path
      fill="#EA4335"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
    />
  </svg>
);

// Official Waze Logo
const WazeIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" className="shrink-0">
    <path
      fill="#05C8F7"
      d="M12 2C6.48 2 2 6.27 2 11.5c0 2.64 1.12 5.02 2.92 6.72-.08 1.39-.54 2.67-1.36 3.76-.21.28-.04.68.3.72 1.89.22 3.82-.28 5.4-1.36.87.26 1.79.41 2.74.41 5.52 0 10-4.27 10-9.5S17.52 2 12 2z"
    />
    <circle fill="#333" cx="8.5" cy="11" r="1.5" />
    <circle fill="#333" cx="15.5" cy="11" r="1.5" />
    <path
      d="M15.5 14.5c0 0-1.12 2-3.5 2s-3.5-2-3.5-2"
      strokeWidth="1.5"
      stroke="#333"
      strokeLinecap="round"
      fill="none"
    />
  </svg>
);

interface EventHelpersProps {
  title: string;
  date: { start: string; end: string }; // ISO strings
  location: string;
  description: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  googleMapsUrl: string;
}

export default function EventHelpers({
  title,
  date,
  location,
  description,
  coordinates,
  googleMapsUrl,
}: EventHelpersProps) {
  const [activeModal, setActiveModal] = useState<'calendar' | 'maps' | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Calendar Links Generation
  const generateGoogleCalendarUrl = () => {
    const start = date.start.replace(/-|:|\.\d\d\d/g, '');
    const end = date.end.replace(/-|:|\.\d\d\d/g, '');
    return `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${start}/${end}&details=${encodeURIComponent(description)}&location=${encodeURIComponent(location)}`;
  };

  const generateIcsFile = () => {
    // Basic ICS content
    const icsContent = `
BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
SUMMARY:${title}
DTSTART:${date.start.replace(/-|:|\.\d\d\d/g, '')}
DTEND:${date.end.replace(/-|:|\.\d\d\d/g, '')}
DESCRIPTION:${description}
LOCATION:${location}
END:VEVENT
END:VCALENDAR`.trim();

    const blob = new Blob([icsContent], {
      type: 'text/calendar;charset=utf-8',
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'wedding-event.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Map Links
  const wazeUrl = `https://waze.com/ul?ll=${coordinates.lat},${coordinates.lng}&navigate=yes`;
  const appleMapsUrl = `http://maps.apple.com/?daddr=${coordinates.lat},${coordinates.lng}`;

  const closeModal = () => setActiveModal(null);

  return (
    <div className="flex gap-3 justify-center mt-6">
      {/* Action Buttons */}
      <BotonBase variant="secondary" onClick={() => setActiveModal('calendar')}>
        <Calendar size={14} className="btn-icon" />
        <span>Agendar</span>
      </BotonBase>

      <BotonBase variant="primary" onClick={() => setActiveModal('maps')}>
        <MapPin size={14} className="btn-icon" />
        <span>Cómo llegar</span>
      </BotonBase>

      {/* Modal / Action Sheet via Portal */}
      {mounted &&
        typeof document !== 'undefined' &&
        createPortal(
          <div className="portal-container" style={{ zIndex: 9999, position: 'relative' }}>
            <AnimatePresence>
              {activeModal && (
                <>
                  {/* Backdrop */}
                  <motion.div
                    key="backdrop"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={closeModal}
                    className="fixed inset-0 bg-background/60 backdrop-blur-sm z-[100]"
                  />

                  {/* Modal Content - Light theme */}
                  <motion.div
                    key="modal"
                    initial={{ opacity: 0, y: 50, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 50, scale: 0.95 }}
                    className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-sm bg-background rounded-lg p-6 shadow-2xl z-[110] border border-beige/30"
                  >
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="font-serif text-xl text-foreground">
                        {activeModal === 'calendar' ? 'Guardar Fecha' : 'Ver Ruta'}
                      </h3>
                      <button
                        onClick={closeModal}
                        className="p-1 hover:bg-foreground/5 rounded-full transition-colors"
                        aria-label="Cerrar"
                      >
                        <X size={20} className="text-foreground/40" />
                      </button>
                    </div>

                    <div className="flex flex-col gap-2">
                      {activeModal === 'calendar' ? (
                        <>
                          <a
                            href={generateGoogleCalendarUrl()}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-4 p-3 rounded-lg hover:bg-foreground/5 transition-all duration-200 group"
                            aria-label="Agregar a Google Calendar"
                          >
                            <div className="w-10 h-10 rounded-xl bg-foreground/5 flex items-center justify-center group-hover:bg-background transition-colors shadow-sm border border-beige/20">
                              <GoogleCalendarIcon />
                            </div>
                            <span className="font-sans text-sm text-foreground/60 group-hover:text-foreground transition-colors">
                              Google Calendar
                            </span>
                          </a>
                          <button
                            onClick={generateIcsFile}
                            className="flex items-center gap-4 p-3 rounded-lg hover:bg-foreground/5 transition-all duration-200 w-full text-left group"
                            aria-label="Descargar archivo para Apple Calendar u Outlook"
                          >
                            <div className="w-10 h-10 rounded-xl bg-foreground/5 flex items-center justify-center text-foreground group-hover:bg-background transition-colors shadow-sm border border-beige/20">
                              <AppleIcon />
                            </div>
                            <span className="font-sans text-sm text-foreground/60 group-hover:text-foreground transition-colors">
                              Apple / Outlook (.ics)
                            </span>
                          </button>
                        </>
                      ) : (
                        <>
                          <a
                            href={googleMapsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-4 p-3 rounded-lg hover:bg-foreground/5 transition-all duration-200 group"
                            aria-label="Abrir en Google Maps"
                          >
                            <div className="w-10 h-10 rounded-xl bg-foreground/5 flex items-center justify-center group-hover:bg-background transition-colors shadow-sm border border-beige/20">
                              <GoogleIcon />
                            </div>
                            <span className="font-sans text-sm text-foreground/60 group-hover:text-foreground transition-colors">
                              Google Maps
                            </span>
                          </a>
                          <a
                            href={wazeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-4 p-3 rounded-lg hover:bg-stone-50 transition-all duration-200 group"
                            aria-label="Abrir en Waze"
                          >
                            <div className="w-10 h-10 rounded-xl bg-stone-100 flex items-center justify-center group-hover:bg-white transition-colors shadow-sm border border-stone-200">
                              <WazeIcon />
                            </div>
                            <span className="font-sans text-sm text-stone-600 group-hover:text-foreground transition-colors">
                              Waze
                            </span>
                          </a>
                          <a
                            href={appleMapsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-4 p-3 rounded-lg hover:bg-stone-50 transition-all duration-200 group"
                            aria-label="Abrir en Apple Maps"
                          >
                            <div className="w-10 h-10 rounded-xl bg-stone-100 flex items-center justify-center group-hover:bg-white transition-colors shadow-sm border border-stone-200">
                              <AppleIcon />
                            </div>
                            <span className="font-sans text-sm text-stone-600 group-hover:text-foreground transition-colors">
                              Apple Maps
                            </span>
                          </a>
                        </>
                      )}
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>,
          document.body
        )}
    </div>
  );
}
