import { useEffect, useRef, useState } from 'react';
import { Music2, VolumeX } from 'lucide-react';

const VIDEO_ID = 'rH9mDCe83v0'; // Abeer Nehme - Bi Saraha (official, Universal Music MENA)

export function MusicToggle() {
  const containerRef = useRef(null);
  const playerRef = useRef(null);
  const readyRef = useRef(false);
  const playingRef = useRef(false);
  const [ready, setReady] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    readyRef.current = ready;
  }, [ready]);
  useEffect(() => {
    playingRef.current = playing;
  }, [playing]);

  const startPlayback = () => {
    if (!readyRef.current || !playerRef.current || playingRef.current) return;
    playerRef.current.setVolume(45);
    playerRef.current.playVideo();
    setPlaying(true);
  };

  const pausePlayback = () => {
    if (!playerRef.current) return;
    playerRef.current.pauseVideo();
    setPlaying(false);
  };

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
            if (cancelled) return;
            setReady(true);
            readyRef.current = true;
            // Best-effort autoplay — succeeds in some contexts (e.g. WhatsApp's
            // in-app browser), otherwise the browser blocks it silently and
            // playback starts on the visitor's first tap instead (see below).
            startPlayback();
          },
        },
      });
    }

    if (window.YT && window.YT.Player) {
      createPlayer();
    } else {
      if (
        !document.querySelector('script[src="https://www.youtube.com/iframe_api"]')
      ) {
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

  // Browsers block unmuted autoplay without a user gesture, so fall back to
  // starting music on the visitor's very first tap/scroll/keypress anywhere
  // on the page — feels close to "plays on load" in practice.
  useEffect(() => {
    const events = ['pointerdown', 'keydown', 'touchstart', 'scroll'];
    const handleFirstInteraction = () => startPlayback();
    events.forEach((event) =>
      window.addEventListener(event, handleFirstInteraction, {
        passive: true,
      })
    );
    return () => {
      events.forEach((event) =>
        window.removeEventListener(event, handleFirstInteraction)
      );
    };
  }, []);

  const toggle = () => {
    if (playingRef.current) {
      pausePlayback();
    } else {
      startPlayback();
    }
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
        aria-label={playing ? 'Mute music' : 'Play music'}
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
