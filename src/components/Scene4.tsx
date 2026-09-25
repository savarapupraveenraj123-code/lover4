import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { useEffect, useState } from 'react';
import { config } from '@/config';
import { ParticleField } from './ParticleField';
import { SceneWrapper } from './SceneWrapper';

interface Scene4Props {
  onContinue: () => void;
}

export function Scene4({ onContinue }: Scene4Props) {
  const [lineIndex, setLineIndex] = useState(0);
  const lines = config.scene4.lines;

  useEffect(() => {
    if (lineIndex >= lines.length) return;
    const timer = setTimeout(() => {
      setLineIndex((i) => i + 1);
    }, lineIndex === 0 ? 2500 : 3000);
    return () => clearTimeout(timer);
  }, [lineIndex, lines.length]);

  return (
    <SceneWrapper gradient="bg-gradient-to-b from-ink via-black to-burgundy-900">
      <ParticleField count={25} speed={0.1} color="rgba(196, 30, 58, 0.5)" />

      <div className="relative z-10 flex min-h-[100dvh] flex-col items-center justify-center text-center px-6">
        {/* Glowing pulsing heart */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          className="relative mb-16"
        >
          {/* Outer glow rings */}
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="absolute inset-0 rounded-full bg-crimson-500/20 blur-[40px]"
              animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0.1, 0.3] }}
              transition={{
                duration: 1.4,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.15,
              }}
            />
          ))}
          <motion.div
            animate={{ scale: [1, 1.18, 1, 1.12, 1] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Heart className="h-24 w-24 sm:h-32 sm:w-32 text-crimson-500 fill-crimson-500 drop-shadow-[0_0_30px_rgba(196,30,58,0.7)]" />
          </motion.div>
        </motion.div>

        {/* Sequential lines */}
        <div className="min-h-[120px] flex flex-col gap-4 items-center">
          {lines.map((line, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
              animate={
                i <= lineIndex
                  ? { opacity: 1, y: 0, filter: 'blur(0px)' }
                  : { opacity: 0, y: 20, filter: 'blur(10px)' }
              }
              transition={{ duration: 1.5, ease: 'easeOut' }}
              className={`font-serif text-xl sm:text-2xl md:text-3xl ${
                i === lines.length - 1
                  ? 'text-rose-200 text-glow'
                  : 'text-rose-300/70'
              }`}
            >
              {line}
            </motion.p>
          ))}
        </div>

        {lineIndex >= lines.length && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={onContinue}
            className="mt-16 px-10 py-4 rounded-full bg-gradient-to-r from-crimson-600 to-crimson-500 text-white font-sans text-sm tracking-widest uppercase btn-glow transition-all duration-300"
          >
            {config.scene4.button}
          </motion.button>
        )}
      </div>
    </SceneWrapper>
  );
}
