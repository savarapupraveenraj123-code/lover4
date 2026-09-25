import { AnimatePresence, motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { useEffect, useState } from 'react';
import { config } from '@/config';
import { ParticleField } from './ParticleField';
import { SceneWrapper } from './SceneWrapper';

interface Scene3Props {
  onContinue: () => void;
}

export function Scene3({ onContinue }: Scene3Props) {
  const [index, setIndex] = useState(0);
  const total = config.reasons.length;
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (index >= total) return;
    const timer = setTimeout(() => {
      if (index < total - 1) {
        setIndex((i) => i + 1);
      } else {
        setDone(true);
      }
    }, 2800);
    return () => clearTimeout(timer);
  }, [index, total]);

  return (
    <SceneWrapper gradient="bg-gradient-to-b from-ink via-burgundy-800 to-burgundy-900">
      <ParticleField count={35} speed={0.2} />

      <div className="relative z-10 flex min-h-[100dvh] flex-col items-center justify-center text-center px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1.5 }}
          className="font-serif text-3xl sm:text-4xl md:text-5xl text-rose-200 text-glow mb-16"
        >
          {config.reasonsTitle}
        </motion.h2>

        <div className="relative h-40 sm:h-48 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8, filter: 'blur(15px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="flex flex-col items-center"
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
                className="mb-6"
              >
                <Heart className="h-8 w-8 text-crimson-500 fill-crimson-500 drop-shadow-[0_0_15px_rgba(196,30,58,0.5)]" />
              </motion.div>
              <p className="font-serif text-2xl sm:text-3xl md:text-4xl text-rose-100 text-glow italic">
                {config.reasons[index]}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Progress indicator */}
        <div className="mt-12 flex items-center gap-3">
          {config.reasons.map((_, i) => (
            <div
              key={i}
              className={`h-1 rounded-full transition-all duration-500 ${
                i <= index ? 'bg-crimson-500 w-8' : 'bg-burgundy-700 w-4'
              }`}
            />
          ))}
          <span className="ml-3 font-sans text-xs tracking-widest text-rose-300/50">
            {Math.min(index + 1, total)} / {total}
          </span>
        </div>

        <AnimatePresence>
          {done && (
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              onClick={onContinue}
              className="mt-16 px-10 py-4 rounded-full glass-card text-rose-200 font-sans text-sm tracking-widest uppercase hover:text-rose-100 transition-all duration-300 btn-glow"
            >
              Continue ❤️
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </SceneWrapper>
  );
}
