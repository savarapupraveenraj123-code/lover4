import { Music, Volume2, VolumeX } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { config } from '@/config';

interface MusicControlProps {
  startPlaying: boolean;
}

export function MusicControl({ startPlaying }: MusicControlProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    const audio = new Audio(config.musicUrl);
    audio.loop = true;
    audio.volume = 0.35;
    audioRef.current = audio;

    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!startPlaying || !audioRef.current) return;
    audioRef.current
      .play()
      .then(() => setPlaying(true))
      .catch(() => {
        // Autoplay may be blocked; user can manually start
      });
  }, [startPlaying]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setPlaying(true))
        .catch(() => {});
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    const newMuted = !muted;
    audioRef.current.muted = newMuted;
    setMuted(newMuted);
  };

  return (
    <div className="fixed top-4 right-4 z-[200] flex items-center gap-2">
      <button
        onClick={togglePlay}
        aria-label="Play/pause music"
        className="glass rounded-full w-10 h-10 flex items-center justify-center text-rose-200/80 hover:text-rose-100 transition-colors"
      >
        <Music className="h-4 w-4" />
      </button>
      <button
        onClick={toggleMute}
        aria-label="Mute/unmute"
        className="glass rounded-full w-10 h-10 flex items-center justify-center text-rose-200/80 hover:text-rose-100 transition-colors"
      >
        {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
      </button>
      {playing && !muted && (
        <span className="font-sans text-xs text-rose-300/50 mr-1 hidden sm:inline">
          ♫
        </span>
      )}
    </div>
  );
}
