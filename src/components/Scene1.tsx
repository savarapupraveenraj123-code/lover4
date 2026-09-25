import { motion } from 'framer-motion';
import { config } from '@/config';
import { ParticleField } from './ParticleField';
import { SceneWrapper } from './SceneWrapper';
import { RevealText } from './RevealText';

interface Scene1Props {
  onContinue: () => void;
}

export function Scene1({ onContinue }: Scene1Props) {
  return (
    <SceneWrapper gradient="bg-gradient-to-b from-ink via-burgundy-900 to-burgundy-800">
      <ParticleField count={40} speed={0.2} />

      {/* Parallax glow */}
      <motion.div
        animate={{ y: [0, -30, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-crimson-500/8 blur-[100px] pointer-events-none"
      />

      <div className="relative z-10 flex min-h-[100dvh] flex-col items-center justify-center text-center px-6">
        <RevealText
          text={config.scene1.lines[0]}
          delay={0.5}
          duration={2}
          className="font-serif text-3xl sm:text-4xl md:text-5xl text-rose-200/80 italic"
        />

        <RevealText
          text={config.scene1.lines[1]}
          delay={3}
          duration={2}
          className="mt-8 font-serif text-3xl sm:text-4xl md:text-5xl text-rose-200 text-glow"
        />

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 5.5, duration: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          onClick={onContinue}
          className="mt-14 px-10 py-4 rounded-full glass-card text-rose-200 font-sans text-sm sm:text-base tracking-widest uppercase hover:text-rose-100 transition-all duration-300 btn-glow"
        >
          {config.scene1.button}
        </motion.button>
      </div>
    </SceneWrapper>
  );
}
