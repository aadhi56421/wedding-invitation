import { Hero } from './components/Hero';
import { Countdown } from './components/Countdown';
import { Couple } from './components/Couple';
import { Events } from './components/Events';
import { Wishes } from './components/Wishes';
import { Footer } from './components/Footer';
import { useEffect, useRef, useState } from 'react';
import { EnvelopeIntro } from './components/EnvelopeIntro';
import { MusicToggle } from './components/MusicToggle';

function App() {
  const [opened, setOpened] = useState(false);
  const musicRef = useRef(null);

  useEffect(() => {
    document.body.style.overflow = opened ? '' : 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [opened]);

  return (
    <main className="bg-cream min-h-screen">
      <EnvelopeIntro
        onOpen={() => {
          musicRef.current?.start();
          setOpened(true);
        }}
      />
      <MusicToggle ref={musicRef} />
      <Hero />
      <Countdown />
      <Couple />
      <Events />
      <Wishes />
      <Footer />
    </main>
  );
}

export default App;
