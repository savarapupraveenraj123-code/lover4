import { motion } from 'framer-motion';
import { config } from '@/config';
import { ParticleField } from './ParticleField';
import { RevealText } from './RevealText';

interface IntroScreenProps {
  onBegin: () => void;
}

export function IntroScreen({ onBegin }: IntroScreenProps) {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 1, ease: 'easeInOut' }}
      className="relative min-h-[100dvh] w-full flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-ink via-burgundy-900 to-ink"
    >
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] h-[120vw] max-w-[800px] max-h-[800px] rounded-full bg-crimson-500/10 blur-[120px] pointer-events-none" />
      <ParticleField count={50} />

      <div className="relative z-10 flex flex-col items-center text-center px-6">
        <RevealText
          text={config.intro.greeting}
          delay={0.3}
          duration={1.5}
          className="font-serif text-5xl sm:text-6xl md:text-7xl text-rose-200 text-glow"
        />

        <RevealText
          text={config.intro.subtitle}
          delay={1.5}
          duration={1.5}
          y={20}
          className="mt-6 font-sans text-base sm:text-lg text-rose-300/60 tracking-wide"
        />

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.8, duration: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          onClick={onBegin}
          className="mt-12 px-10 py-4 rounded-full bg-gradient-to-r from-crimson-600 to-crimson-500 text-white font-sans text-sm sm:text-base tracking-widest uppercase btn-glow transition-all duration-300"
        >
          {config.intro.button}
        </motion.button>
      </div>
    </motion.section>
  );
}
