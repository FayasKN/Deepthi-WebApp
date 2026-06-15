"use client";

import { useRef, useCallback } from "react";

// Safe dynamic import for Howler (avoids SSR crash)
let Howl: typeof import("howler").Howl | null = null;
if (typeof window !== "undefined") {
  import("howler").then((m) => { Howl = m.Howl; });
}

export function useAudio() {
  const currentRef = useRef<InstanceType<typeof import("howler").Howl> | null>(null);

  const play = useCallback((src: string, onEnd?: () => void) => {
    if (!Howl) return;

    // Stop any currently playing audio
    if (currentRef.current) {
      currentRef.current.stop();
    }

    const sound = new Howl({
      src: [src],
      html5: true,          // stream from file — best for large audio
      volume: 1.0,
      onend: onEnd,
      onloaderror: () => {
        // Gracefully handle missing audio files in dev
        console.warn(`[Deepthi] Audio not found: ${src}`);
        onEnd?.();
      },
    });

    currentRef.current = sound;
    sound.play();
  }, []);

  const stop = useCallback(() => {
    currentRef.current?.stop();
  }, []);

  return { play, stop };
}
