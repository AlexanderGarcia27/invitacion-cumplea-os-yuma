'use client';

import { InvitationData } from '@/providers/invitation';

import DarkHero from './DarkHero';
import DarkMaps from './DarkMaps';
import DarkNotes from './DarkNotes';
import DarkEvents from './DarkEvents';
import DarkGallery from './DarkGallery';
import DarkPadrinos from './DarkPadrinos';
import DarkCountdown from './DarkCountdown';
import DarkItinerary from './DarkItinerary';
import DarkDressCode from './DarkDressCode';

export default function DarkDesign({ data }: { data: InvitationData }) {
  return (
    <div className="selection:bg-[#CFB53B]/30 bg-[#0a0a0a]">
      <DarkHero data={data} />
      <DarkCountdown data={data} />
      <DarkPadrinos data={data} />
      <DarkEvents data={data} />
      <DarkItinerary data={data} />
      <DarkMaps data={data} />
      <DarkDressCode data={data} />
      <DarkGallery data={data} />
      <DarkNotes data={data} />

      {/* Dynamic Footer - Midnight Luxe */}
      <footer className="py-24 bg-[#080808] text-center font-serif relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#CFB53B]/20 to-transparent" />
        <p className="text-[#CFB53B] text-[11px] tracking-[1em] uppercase font-bold mb-4 ml-[1em]">
          {data.couple.brideName} & {data.couple.groomName}
        </p>
        <div className="text-white/20 text-xs italic font-light">
          Para siempre, bajo las estrellas
        </div>
      </footer>
    </div>
  );
}
