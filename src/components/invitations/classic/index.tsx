'use client';

import { InvitationData } from '@/providers/invitation';

import ClassicHero from './ClassicHero';
import ClassicMaps from './ClassicMaps';
import ClassicMusic from './ClassicMusic';
import ClassicNotes from './ClassicNotes';
import ClassicEvents from './ClassicEvents';
import ClassicGallery from './ClassicGallery';
import ClassicPadrinos from './ClassicPadrinos';
import ClassicCountdown from './ClassicCountdown';
import ClassicItinerary from './ClassicItinerary';
import ClassicDressCode from './ClassicDressCode';

export default function ClassicDesign({ data }: { data: InvitationData }) {
  return (
    <div className="selection:bg-stone-200">
      <ClassicMusic data={data} />
      <ClassicHero data={data} />
      <ClassicCountdown data={data} />
      <ClassicPadrinos data={data} />
      <ClassicEvents data={data} />
      <ClassicItinerary data={data} />
      <ClassicMaps data={data} />
      <ClassicDressCode data={data} />
      <ClassicGallery data={data} />
      <ClassicNotes data={data} />

      {/* Dynamic Footer for the design */}
      <footer className="py-20 bg-stone-50 text-center font-serif border-t border-stone-100">
        <p className="text-stone-400 text-xs tracking-[0.3em] uppercase">
          {data.couple.brideName} & {data.couple.groomName} — 2026
        </p>
      </footer>
    </div>
  );
}
