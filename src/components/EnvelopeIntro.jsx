import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { wedding } from '../data/wedding';

function RibbonKnot() {
  return (
    <svg viewBox="0 0 220 170" className="h-full w-full drop-shadow-[0_6px_10px_rgba(0,0,0,0.45)]">
      <defs>
        <linearGradient id="ribbon" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#F3DA9E" />
          <stop offset="0.5" stopColor="#C6963B" />
          <stop offset="1" stopColor="#8A6220" />
        </linearGradient>
        <radialGradient id="knot" cx="0.35" cy="0.3" r="0.8">
          <stop offset="0" stopColor="#F3DA9E" />
          <stop offset="0.6" stopColor="#C6963B" />
          <stop offset="1" stopColor="#7C561B" />
        </radialGradient>
      </defs>

      {/* tails */}
      <path d="M104 88 C96 115 78 138 58 160 L82 158 L100 132 Z" fill="url(#ribbon)" />
      <path d="M116 88 C124 115 142 138 162 160 L138 158 L120 132 Z" fill="url(#ribbon)" />

      {/* loops */}
      <path
        d="M110 84 C80 20 12 22 14 66 C16 108 80 104 110 84 Z"
        fill="url(#ribbon)"
        stroke="#7C561B"
        strokeWidth="1.5"
      />
      <path
        d="M110 84 C140 20 208 22 206 66 C204 108 140 104 110 84 Z"
        fill="url(#ribbon)"
        stroke="#7C561B"
        strokeWidth="1.5"
      />
      <path d="M104 80 C80 50 44 44 34 62" fill="none" stroke="#F8E7B8" strokeOpacity="0.7" strokeWidth="2" />
      <path d="M116 80 C140 50 176 44 186 62" fill="none" stroke="#F8E7B8" strokeOpacity="0.7" strokeWidth="2" />

      {/* knot */}
      <ellipse cx="110" cy="86" rx="20" ry="22" fill="url(#knot)" stroke="#7C561B" strokeWidth="1.5" />
      <path d="M99 78 C106 72 114 72 121 78" fill="none" stroke="#F8E7B8" strokeOpacity="0.8" strokeWidth="2" />
    </svg>
  );
}

export function EnvelopeIntro({ onOpen }) {
  const [phase, setPhase] = useState('closed'); // closed -> opening -> done

  const open = () => {
    if (phase !== 'closed') return;
    setPhase('opening');
    onOpen();
    setTimeout(() => setPhase('done'), 2100);
  };

  const opening = phase === 'opening';

  return (
    <AnimatePresence>
      {phase !== 'done' && (
        <motion.div
          key="envelope"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-[100] overflow-hidden bg-maroon-dark"
        >
          {/* envelope back with soft vignette */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#7B2D3F_0%,#5C1A2B_55%,#3A0F1B_100%)]" />
          <div className="border-gold/40 pointer-events-none absolute inset-4 border sm:inset-8" />

          {/* front pocket: two side triangles + bottom triangle */}
          <motion.div
            animate={opening ? { y: '12%', opacity: 0 } : { y: 0, opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.9, ease: 'easeInOut' }}
            className="absolute inset-0"
          >
            <div
              className="absolute inset-0 bg-maroon"
              style={{ clipPath: 'polygon(0 0, 50% 55%, 0 100%)' }}
            />
            <div
              className="absolute inset-0 bg-maroon"
              style={{ clipPath: 'polygon(100% 0, 50% 55%, 100% 100%)' }}
            />
            <div
              className="bg-maroon-light absolute inset-0"
              style={{ clipPath: 'polygon(0 100%, 50% 52%, 100% 100%)' }}
            />
            <div className="absolute inset-x-0 bottom-[14%] text-center text-cream">
              <p className="font-script text-gold-light text-5xl sm:text-6xl">
                {wedding.bride.name.split(' ')[0]} &amp; {wedding.groom.name.split(' ')[0]}
              </p>
              <p className="mt-2 text-[11px] tracking-[0.35em] text-cream/80 uppercase sm:text-sm">
                Nikkah Invitation
              </p>
            </div>
          </motion.div>

          {/* top flap */}
          <motion.div
            animate={opening ? { rotateX: 180 } : { rotateX: 0 }}
            transition={{ delay: 0.35, duration: 0.9, ease: 'easeInOut' }}
            style={{ transformOrigin: 'top', transformPerspective: 1200, backfaceVisibility: 'hidden' }}
            className="absolute inset-x-0 top-0 h-[55%]"
          >
            <div
              className="from-maroon-light to-maroon h-full w-full bg-gradient-to-b"
              style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }}
            />
          </motion.div>

          {/* ribbon knot on the flap tip */}
          <motion.button
            type="button"
            onClick={open}
            aria-label="Tap to open the invitation"
            animate={
              opening
                ? { scale: 1.6, opacity: 0 }
                : { scale: [1, 1.06, 1] }
            }
            transition={
              opening
                ? { duration: 0.5 }
                : { duration: 2.4, repeat: Infinity, ease: 'easeInOut' }
            }
            className="absolute top-[55%] left-1/2 h-32 w-40 -translate-x-1/2 -translate-y-1/2 cursor-pointer sm:h-40 sm:w-52"
          >
            <RibbonKnot />
          </motion.button>

          <motion.p
            animate={opening ? { opacity: 0 } : { opacity: [0.5, 1, 0.5] }}
            transition={opening ? { duration: 0.3 } : { duration: 2.4, repeat: Infinity }}
            className="text-gold-light pointer-events-none absolute top-[55%] left-1/2 mt-24 -translate-x-1/2 text-xs tracking-[0.4em] uppercase sm:mt-28 sm:text-sm"
          >
            Tap to open
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
