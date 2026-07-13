import { motion } from 'framer-motion';
import { useCountdown } from '../hooks/use-countdown';
import { CrescentDivider } from './Ornament';
import { wedding } from '../data/wedding';

const UNITS = [
  { key: 'days', label: 'Days' },
  { key: 'hours', label: 'Hours' },
  { key: 'minutes', label: 'Minutes' },
  { key: 'seconds', label: 'Seconds' },
];

export function Countdown() {
  const timeLeft = useCountdown(wedding.nikkah.dateISO);
  const isPast = timeLeft.total <= 0;

  return (
    <section
      id="countdown"
      className="relative bg-maroon px-6 py-20 text-cream sm:py-28"
    >
      <div className="mx-auto max-w-3xl text-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-arabic text-gold-light text-xl tracking-widest sm:text-2xl"
        >
          Counting down to our Nikkah
        </motion.p>
        <CrescentDivider className="my-6" />

        {isPast ? (
          <p className="font-script text-5xl text-gold-light sm:text-6xl">
            The day has arrived — Alhamdulillah!
          </p>
        ) : (
          <div className="mt-8 grid grid-cols-4 gap-3 sm:gap-6">
            {UNITS.map((unit, i) => (
              <motion.div
                key={unit.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="border-gold/40 bg-maroon-light/40 rounded-lg border px-2 py-4 shadow-soft backdrop-blur-sm sm:py-6"
              >
                <div className="font-display text-gold-light text-3xl font-semibold tabular-nums sm:text-5xl">
                  {String(timeLeft[unit.key]).padStart(2, '0')}
                </div>
                <div className="text-blush-light/90 mt-1 text-[11px] tracking-[0.2em] uppercase sm:text-sm">
                  {unit.label}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        <p className="text-blush-light/80 mt-10 text-lg sm:text-xl">
          {wedding.nikkah.label} &middot; {wedding.nikkah.time}
        </p>
      </div>
    </section>
  );
}
