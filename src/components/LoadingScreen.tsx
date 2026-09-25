import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { useEffect, useState } from 'react';

interface LoadingScreenProps {
  onComplete: () => void;
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 400);
          return 100;
        }
        return p + 2;
      });
    }, 30);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink"
    >
      <motion.div
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
        className="mb-8"
      >
        <Heart className="h-12 w-12 text-crimson-500 fill-crimson-500 drop-shadow-[0_0_20px_rgba(196,30,58,0.6)]" />
      </motion.div>

      <p className="font-serif text-lg tracking-[0.3em] text-rose-300/70 mb-6">
        PREPARING SOMETHING SPECIAL
      </p>

      <div className="h-px w-48 bg-burgundy-700 overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-crimson-500 to-rose-400"
          style={{ width: `${progress}%` }}
        />
      </div>

      <p className="mt-4 font-sans text-xs tracking-widest text-rose-300/40">
        {progress}%
      </p>
    </motion.div>
  );
}
