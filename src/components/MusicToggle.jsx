import { useEffect, useRef, useState } from 'react';
import { Music2, VolumeX } from 'lucide-react';

const VIDEO_ID = 'rH9mDCe83v0'; // Abeer Nehme - Bi Saraha (official, Universal Music MENA)

export function MusicToggle() {
  const containerRef = useRef(null);
  const playerRef = useRef(null);
  const [ready, setReady] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    let cancelled = false;

    function createPlayer() {
      if (cancelled || playerRef.current || !containerRef.current) return;
      if (containerRef.current.tagName !== 'DIV') return; // already replaced by iframe

      playerRef.current = new window.YT.Player(containerRef.current, {
        height: '0',
        width: '0',
        videoId: VIDEO_ID,
        playerVars: {
          loop: 1,
          playlist: VIDEO_ID,
          playsinline: 1,
        },
        events: {
          onReady: () => {
            if (!cancelled) setReady(true);
          },
        },
      });
    }

    if (window.YT && window.YT.Player) {
      createPlayer();
    } else {
      if (!document.querySelector('script[src="https://www.youtube.com/iframe_api"]')) {
        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        document.body.appendChild(tag);
      }
      const previous = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        previous?.();
        createPlayer();
      };
    }

    return () => {
      cancelled = true;
    };
  }, []);

  const toggle = () => {
    if (!ready || !playerRef.current) return;
    if (playing) {
      playerRef.current.pauseVideo();
    } else {
      playerRef.current.setVolume(45);
      playerRef.current.playVideo();
    }
    setPlaying((p) => !p);
  };

  return (
    <>
      <div
        ref={containerRef}
        className="pointer-events-none fixed h-0 w-0 opacity-0"
      />
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? 'Pause music' : 'Play music'}
        disabled={!ready}
        className="border-gold/60 bg-maroon/90 text-cream shadow-soft fixed right-5 bottom-5 z-50 flex h-12 w-12 items-center justify-center rounded-full border backdrop-blur-sm transition-transform hover:scale-105 disabled:opacity-50"
      >
        {playing ? (
          <Music2 size={20} className="animate-spin-slow" />
        ) : (
          <VolumeX size={20} />
        )}
      </button>
    </>
  );
}
