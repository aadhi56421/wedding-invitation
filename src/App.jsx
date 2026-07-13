import { Hero } from './components/Hero';
import { Countdown } from './components/Countdown';
import { Couple } from './components/Couple';
import { Events } from './components/Events';
import { Gallery } from './components/Gallery';
import { Footer } from './components/Footer';
import { MusicToggle } from './components/MusicToggle';

function App() {
  return (
    <main className="bg-cream min-h-screen">
      <MusicToggle />
      <Hero />
      <Countdown />
      <Couple />
      <Events />
      <Gallery />
      <Footer />
    </main>
  );
}

export default App;
