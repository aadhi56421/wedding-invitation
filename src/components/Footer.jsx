import { CrescentDivider } from './Ornament';
import { wedding } from '../data/wedding';

export function Footer() {
  return (
    <footer className="bg-maroon-dark px-6 py-16 text-center text-cream">
      <p className="text-blush-light/90 font-arabic mx-auto max-w-lg text-lg italic sm:text-xl">
        "And among His signs is that He created for you spouses from among
        yourselves so that you may find comfort in them."
      </p>
      <p className="text-gold-light/80 mt-2 text-sm tracking-widest uppercase">
        Qur'an 30:21
      </p>

      <CrescentDivider className="my-8" />

      <p className="font-script text-4xl text-cream sm:text-5xl">
        Fairooza &amp; Adil
      </p>
      <p className="text-blush-light/80 mt-3 text-sm tracking-[0.3em] uppercase">
        {wedding.nikkah.label}
      </p>
    </footer>
  );
}
