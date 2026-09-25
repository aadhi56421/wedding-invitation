import { Hero } from './components/Hero';
import { Countdown } from './components/Countdown';
import { Couple } from './components/Couple';
import { Events } from './components/Events';
import { Gallery } from './components/Gallery';
import { Wishes } from './components/Wishes';
import { Footer } from './components/Footer';
import { useEffect, useState } from 'react';
import { EnvelopeIntro } from './components/EnvelopeIntro';
import { MusicToggle } from './components/MusicToggle';

function App() {
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    document.body.style.overflow = opened ? '' : 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [opened]);

  return (
    <main className="bg-cream min-h-screen">
      <EnvelopeIntro onOpen={() => setOpened(true)} />
      <MusicToggle autoStart={opened} />
      <Hero />
      <Countdown />
      <Couple />
      <Events />
      <Gallery />
      <Wishes />
      <Footer />
    </main>
  );
}

export default App;
