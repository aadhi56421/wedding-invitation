import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { Music2, VolumeX } from 'lucide-react';

const VIDEO_ID = 'rH9mDCe83v0'; // Abeer Nehme - Bi Saraha (official, Universal Music MENA)

export const MusicToggle = forwardRef(function MusicToggle(_props, ref) {
  const containerRef = useRef(null);
  const playerRef = useRef(null);
  const [ready, setReady] = useState(false);
  const [playing, setPlaying] = useState(false);
  const wantPlayRef = useRef(false);

  useEffect(() => {
    let cancelled = false;

    function createPlayer() {
      if (cancelled || playerRef.current || !containerRef.current) return;
      if (containerRef.current.tagName !== 'DIV') return; // already replaced by iframe

      playerRef.current = new window.YT.Player(containerRef.current, {
        height: '200',
        width: '200',
        videoId: VIDEO_ID,
        playerVars: {
          loop: 1,
          playlist: VIDEO_ID,
          playsinline: 1,
        },
        events: {
          onReady: () => {
            if (cancelled) return;
            setReady(true);
            // tapped before the player finished loading: start now
            if (wantPlayRef.current) {
              playerRef.current.setVolume(45);
              playerRef.current.playVideo();
              setPlaying(true);
            }
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

  // iOS only allows playback started synchronously inside a tap handler,
  // so the envelope tap calls start() directly instead of via an effect.
  useImperativeHandle(ref, () => ({
    start() {
      const player = playerRef.current;
      wantPlayRef.current = true;
      if (!player || !ready) return;
      player.setVolume(45);
      player.playVideo();
      setPlaying(true);
    },
  }));

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
        className="pointer-events-none fixed top-0 -left-[300px] h-[200px] w-[200px] opacity-0"
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
});
