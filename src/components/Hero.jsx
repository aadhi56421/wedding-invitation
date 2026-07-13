import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { wedding } from '../data/wedding';

export function Hero() {
  return (
    <section className="bg-maroon-dark relative flex min-h-[100svh] w-full items-center justify-center overflow-hidden">
      {/* blurred ambient fill so the full (uncropped) photo can float on mobile without empty margins */}
      <div
        className="absolute inset-0 scale-110 bg-cover bg-center blur-2xl sm:hidden"
        style={{ backgroundImage: `url(${wedding.images.heroBg})` }}
      />
      <div
        className="absolute inset-0 bg-contain bg-center bg-no-repeat sm:bg-cover sm:bg-[center_35%]"
        style={{ backgroundImage: `url(${wedding.images.heroBg})` }}
      />
      <div className="from-maroon-dark/85 via-maroon-dark/70 to-maroon-dark/90 absolute inset-0 bg-gradient-to-b" />
      <div className="border-gold/50 pointer-events-none absolute inset-4 border sm:inset-8" />

      <div className="relative z-10 flex flex-col items-center px-6 py-6 text-center text-cream">
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="font-arabic text-gold-light text-shadow-soft text-lg sm:text-2xl"
        >
          بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-3 text-[11px] tracking-[0.35em] text-cream/90 uppercase sm:text-base"
        >
          Together with their families
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.9 }}
          className="font-script mt-2 text-6xl leading-none font-bold text-cream sm:text-8xl md:text-9xl"
          style={{
            textShadow:
              '0 2px 6px rgba(0,0,0,0.55), 0 8px 30px rgba(0,0,0,0.5)',
          }}
        >
          Fairooza &amp; Adil
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-3 flex items-center gap-4"
        >
          <span className="bg-gold h-px w-8 sm:w-10" />
          <span className="text-[10px] tracking-[0.3em] text-cream/90 uppercase sm:text-base">
            request the honour of your presence
          </span>
          <span className="bg-gold h-px w-8 sm:w-10" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.8 }}
          className="font-display text-gold-light mt-4 text-lg sm:text-3xl"
        >
          {wedding.nikkah.label}
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 6 }}
        transition={{
          delay: 1.8,
          duration: 1.4,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
        className="absolute bottom-8 z-10 text-cream/80"
      >
        <ChevronDown size={28} strokeWidth={1.5} />
      </motion.div>
    </section>
  );
}
