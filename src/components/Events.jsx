import { motion } from 'framer-motion';
import { MapPin, Heart, Sparkles, Navigation } from 'lucide-react';
import { Divider } from './Ornament';
import { wedding } from '../data/wedding';

const events = [
  {
    icon: Heart,
    title: 'Nikkah',
    time: wedding.nikkah.time,
    date: wedding.nikkah.label,
  },
  {
    icon: Sparkles,
    title: 'Reception',
    time: wedding.reception.time,
    date: wedding.nikkah.label,
  },
];

export function Events() {
  return (
    <section id="events" className="bg-cream relative px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-4xl text-center">
        <p className="text-gold-dark text-xs tracking-[0.35em] uppercase">
          Save the date
        </p>
        <h2 className="font-script text-maroon mt-2 text-5xl sm:text-6xl">
          Wedding Events
        </h2>
        <Divider className="my-8" />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {events.map((event, i) => (
            <motion.div
              key={event.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              className="border-gold-light/60 shadow-soft flex flex-col items-center rounded-xl border bg-white/60 px-6 py-10"
            >
              <event.icon
                className="text-gold-dark"
                size={30}
                strokeWidth={1.5}
              />
              <h3 className="font-display text-maroon mt-4 text-2xl font-semibold sm:text-3xl">
                {event.title}
              </h3>
              <p className="text-maroon/80 mt-2 text-lg">{event.date}</p>
              <p className="text-gold-dark font-display mt-1 text-xl font-medium">
                {event.time}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="border-gold-light/60 shadow-soft mt-6 flex flex-col items-center rounded-xl border bg-white/60 px-6 py-10"
        >
          <MapPin className="text-gold-dark" size={30} strokeWidth={1.5} />
          <h3 className="font-display text-maroon mt-4 text-2xl font-semibold sm:text-3xl">
            {wedding.venue.name}
          </h3>
          <p className="text-maroon/80 mx-auto mt-2 max-w-md text-lg">
            {wedding.venue.address}
          </p>
          <a
            href={wedding.venue.mapsUrl}
            target="_blank"
            rel="noreferrer"
            className="bg-maroon hover:bg-maroon-light mt-6 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm tracking-widest text-cream uppercase transition-colors"
          >
            <Navigation size={16} />
            Get Directions
          </a>
        </motion.div>
      </div>
    </section>
  );
}
