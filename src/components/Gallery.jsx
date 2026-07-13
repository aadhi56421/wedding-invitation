import { motion } from 'framer-motion';
import { Divider } from './Ornament';
import { wedding } from '../data/wedding';

const photos = [
  wedding.images.brideSolo,
  wedding.images.collage,
  wedding.images.coupleClose,
];

export function Gallery() {
  return (
    <section
      id="gallery"
      className="bg-cream-light relative px-6 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-5xl text-center">
        <p className="text-gold-dark text-xs tracking-[0.35em] uppercase">
          Our moments
        </p>
        <h2 className="font-script text-maroon mt-2 text-5xl sm:text-6xl">
          Better Together
        </h2>
        <Divider className="my-8" />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {photos.map((src, i) => (
            <motion.div
              key={src}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.6 }}
              className="border-gold-light/60 shadow-soft overflow-hidden rounded-lg border"
            >
              <img
                src={src}
                alt="Wedding memory"
                className="aspect-[4/5] w-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
