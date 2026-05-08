'use client';

import { useRef, useState } from 'react';
import { InvitationData } from '@/providers/invitation';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Music as MusicIcon } from 'lucide-react';

export default function ClassicMusic({ data }: { data: InvitationData }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const { trackTitle, audioUrl } = data.theme.music;

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-100 font-serif">
      {audioUrl ? <audio ref={audioRef} src={audioUrl} loop /> : null}

      <div className="flex flex-col items-end gap-3">
        {/* Track Info Popover */}
        <AnimatePresence>
          {isPlaying && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="bg-white/80 backdrop-blur-md px-4 py-2 border border-stone-100 shadow-sm rounded-sm"
            >
              <div className="flex items-center gap-3">
                <MusicIcon size={12} className="text-stone-400 animate-pulse" />
                <span className="text-[10px] text-stone-500 uppercase tracking-widest whitespace-nowrap">
                  {trackTitle}
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Play/Pause Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={togglePlay}
          className="w-12 h-12 bg-white border border-stone-100 text-stone-800 flex items-center justify-center shadow-lg hover:bg-stone-50 transition-colors"
          aria-label={isPlaying ? 'Pausar música' : 'Reproducir música'}
        >
          {isPlaying ? (
            <Pause size={18} strokeWidth={1.5} />
          ) : (
            <Play size={18} strokeWidth={1.5} className="ml-1" />
          )}
        </motion.button>
      </div>
    </div>
  );
}
