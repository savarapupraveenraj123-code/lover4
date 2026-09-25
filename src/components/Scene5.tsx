import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { config } from '@/config';
import { Celebration } from './Celebration';
import { ParticleField } from './ParticleField';
import { RevealText } from './RevealText';

interface Scene5Props {
  onRestart: () => void;
}

export function Scene5({ onRestart: _onRestart }: Scene5Props) {
  const [phase, setPhase] = useState<'name' | 'lines' | 'ask' | 'question' | 'celebration'>('name');
  const [lineIndex, setLineIndex] = useState(0);

  // Phase: name -> after 2.5s show lines
  useEffect(() => {
    if (phase !== 'name') return;
    const t = setTimeout(() => setPhase('lines'), 3000);
    return () => clearTimeout(t);
  }, [phase]);

  // Phase: lines -> reveal each line, then show "So..."
  useEffect(() => {
    if (phase !== 'lines') return;
    if (lineIndex < config.proposal.lines.length) {
      const t = setTimeout(() => setLineIndex((i) => i + 1), 2500);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setPhase('ask'), 2000);
    return () => clearTimeout(t);
  }, [phase, lineIndex]);

  // Phase: ask -> after 2s show question
  useEffect(() => {
    if (phase !== 'ask') return;
    const t = setTimeout(() => setPhase('question'), 2500);
    return () => clearTimeout(t);
  }, [phase]);

  const handleYes = () => {
    setPhase('celebration');
  };

  if (phase === 'celebration') {
    return (
      <>
        <Celebration active />
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative min-h-[100dvh] w-full flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-burgundy-900 via-ink to-burgundy-900 px-6 text-center"
        >
          <ParticleField count={60} speed={0.3} color="rgba(244, 143, 177, 0.7)" />

          <div className="relative z-10 flex flex-col items-center gap-8">
            <RevealText
              text={config.proposal.celebrationLines[0]}
              delay={0.5}
              duration={1.5}
              className="font-serif text-3xl sm:text-4xl md:text-5xl text-rose-100 text-glow"
            />
            <RevealText
              text={config.proposal.celebrationLines[1]}
              delay={2.5}
              duration={1.5}
              y={20}
              className="font-serif text-xl sm:text-2xl text-rose-200/80 italic"
            />
            <RevealText
              text={config.proposal.celebrationLines[2]}
              delay={4.5}
              duration={1.5}
              y={20}
              className="font-script text-3xl sm:text-4xl text-champagne-200 text-glow-gold"
            />

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 7, duration: 1 }}
              className="mt-8 font-sans text-xs tracking-widest text-rose-300/40"
            >
              {config.footer}
            </motion.p>
          </div>
        </motion.section>
      </>
    );
  }

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="relative min-h-[100dvh] w-full flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-burgundy-900 via-ink to-burgundy-800 px-6 text-center"
    >
      {/* Light rays */}
      <motion.div
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[2px] h-full bg-gradient-to-b from-champagne-200/40 via-rose-300/10 to-transparent blur-[2px] pointer-events-none"
        style={{ boxShadow: '0 0 100px 50px rgba(232, 213, 168, 0.15)' }}
      />
      <ParticleField count={50} speed={0.25} color="rgba(244, 143, 177, 0.6)" />

      <div className="relative z-10 flex flex-col items-center">
        {/* Phase: Name */}
        {phase === 'name' && (
          <motion.h1
            initial={{ opacity: 0, scale: 0.8, filter: 'blur(20px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 2, ease: 'easeOut' }}
            className="font-serif text-6xl sm:text-7xl md:text-8xl text-rose-100 text-glow tracking-wide"
          >
            {config.proposal.name}
          </motion.h1>
        )}

        {/* Phase: Lines */}
        {phase === 'lines' && (
          <div className="flex flex-col items-center gap-6 min-h-[200px] justify-center">
            {config.proposal.lines.map((line, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
                animate={
                  i < lineIndex
                    ? { opacity: 1, y: 0, filter: 'blur(0px)' }
                    : { opacity: 0 }
                }
                transition={{ duration: 1.5, ease: 'easeOut' }}
                className="font-serif text-2xl sm:text-3xl md:text-4xl text-rose-200 italic"
              >
                {line}
              </motion.p>
            ))}
            {/* "So..." */}
            <AnimatePresence>
              {lineIndex >= config.proposal.lines.length && (
                <motion.p
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="mt-8 font-serif text-3xl sm:text-4xl text-champagne-200 text-glow-gold"
                >
                  {config.proposal.askWord}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* Phase: Ask (brief pause showing "So...") */}
        {phase === 'ask' && (
          <motion.p
            initial={{ opacity: 0.6, scale: 1 }}
            animate={{ opacity: 1, scale: 1.05 }}
            transition={{ duration: 2, ease: 'easeInOut' }}
            className="font-serif text-4xl sm:text-5xl text-champagne-200 text-glow-gold"
          >
            {config.proposal.askWord}
          </motion.p>
        )}

        {/* Phase: Question + Buttons */}
        {phase === 'question' && (
          <motion.div
            initial={{ opacity: 0, y: 30, filter: 'blur(15px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            className="flex flex-col items-center"
          >
            <motion.h2
              animate={{ scale: [1, 1.03, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="font-serif text-4xl sm:text-5xl md:text-6xl text-rose-100 text-glow text-center mb-12"
            >
              {config.proposal.question}
            </motion.h2>

            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
              {config.proposal.buttons.map((btn, i) => (
                <motion.button
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.2, duration: 0.8 }}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleYes}
                  className={`px-10 py-5 rounded-full font-sans text-base sm:text-lg tracking-widest uppercase transition-all duration-300 btn-glow ${
                    i === 0
                      ? 'bg-gradient-to-r from-crimson-600 to-crimson-500 text-white'
                      : 'bg-gradient-to-r from-rose-400 to-rose-300 text-burgundy-900'
                  }`}
                >
                  {btn}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </motion.section>
  );
}
