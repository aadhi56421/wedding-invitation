import { motion } from 'framer-motion';
import { Divider } from './Ornament';
import { wedding } from '../data/wedding';

function Person({ name, father, mother, relation, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.7 }}
      className="flex flex-col items-center px-4 text-center"
    >
      <p className="text-gold-dark text-xs tracking-[0.3em] uppercase">
        {relation}
      </p>
      <h3 className="font-script text-maroon mt-2 text-5xl sm:text-6xl">
        {name}
      </h3>
      <p className="text-maroon/80 mt-3 max-w-xs text-lg sm:text-xl">
        {relation === 'The Bride' ? 'Daughter' : 'Son'} of
      </p>
      <p className="font-display text-maroon mt-1 text-xl font-medium sm:text-2xl">
        {father} &amp; {mother}
      </p>
    </motion.div>
  );
}

export function Couple() {
  return (
    <section
      id="couple"
      className="bg-cream-light relative px-6 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mx-auto mb-14 w-48 overflow-hidden rounded-t-full border-4 border-gold shadow-soft sm:w-64"
        >
          <img
            src={wedding.images.couplePortrait}
            alt="Fairooza and Adil"
            className="aspect-[3/4] w-full object-cover"
          />
        </motion.div>

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-[1fr_auto_1fr] sm:gap-6">
          <Person
            name={wedding.bride.name}
            father={wedding.bride.father}
            mother={wedding.bride.mother}
            relation="The Bride"
            delay={0.1}
          />
          <div className="flex items-center justify-center">
            <span className="font-script text-gold text-6xl">&amp;</span>
          </div>
          <Person
            name={wedding.groom.name}
            father={wedding.groom.father}
            mother={wedding.groom.mother}
            relation="The Groom"
            delay={0.3}
          />
        </div>

        <Divider className="mt-16" />
      </div>
    </section>
  );
}
