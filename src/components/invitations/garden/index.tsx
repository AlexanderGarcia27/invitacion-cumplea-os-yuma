'use client';

import { InvitationData } from '@/providers/invitation';

import GardenHero from './GardenHero';
import GardenMaps from './GardenMaps';
import GardenNotes from './GardenNotes';
import GardenEvents from './GardenEvents';
import GardenGallery from './GardenGallery';
import GardenPadrinos from './GardenPadrinos';
import GardenCountdown from './GardenCountdown';
import GardenItinerary from './GardenItinerary';
import GardenDressCode from './GardenDressCode';

export default function GardenDesign({ data }: { data: InvitationData }) {
  return (
    <div className="selection:bg-[#86a789]/20 font-sans">
      <GardenHero data={data} />
      <GardenCountdown data={data} />
      <GardenPadrinos data={data} />
      <GardenEvents data={data} />
      <GardenItinerary data={data} />
      <GardenMaps data={data} />
      <GardenDressCode data={data} />
      <GardenGallery data={data} />
      <GardenNotes data={data} />

      {/* Dynamic Footer for the design */}
      <footer className="py-24 bg-[#f1f5f1] text-center font-serif relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-px bg-gradient-to-r from-transparent via-[#86a789]/30 to-transparent" />
        <p className="text-[#86a789] text-[10px] tracking-[0.5em] uppercase font-bold">
          {data.couple.brideName} & {data.couple.groomName}
        </p>
        <div className="mt-4 text-[#d4af37] text-xs opacity-50 italic">
          Caminando juntos siempre
        </div>
      </footer>
    </div>
  );
}
