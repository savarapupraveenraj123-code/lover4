import { motion } from 'framer-motion';
import { Calendar, Heart } from 'lucide-react';
import { useRef } from 'react';
import { config } from '@/config';
import { ParticleField } from './ParticleField';
import { SceneWrapper } from './SceneWrapper';
import { RevealText } from './RevealText';

interface Scene2Props {
  onContinue: () => void;
}

export function Scene2({ onContinue }: Scene2Props) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: number) => {
    scrollRef.current?.scrollBy({ left: dir * 320, behavior: 'smooth' });
  };

  return (
    <SceneWrapper gradient="bg-gradient-to-b from-burgundy-800 via-burgundy-900 to-ink">
      <ParticleField count={30} speed={0.15} color="rgba(232, 213, 168, 0.6)" />

      <div className="relative z-10 flex min-h-[100dvh] flex-col items-center justify-center px-4 py-16">
        <RevealText
          text="Our Memories"
          delay={0.3}
          duration={1.5}
          className="font-serif text-4xl sm:text-5xl text-rose-200 text-glow mb-2"
        />
        <RevealText
          text="Swipe through the moments that brought us here →"
          delay={1.2}
          duration={1.5}
          y={15}
          className="font-sans text-sm text-rose-300/50 mb-12"
        />

        {/* Memory cards - horizontal scroll */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4 w-full max-w-5xl px-4"
        >
          {config.memories.map((mem, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * i, duration: 0.8 }}
              className="snap-center flex-shrink-0 w-[280px] sm:w-[320px]"
            >
              <div className="glass-card rounded-2xl overflow-hidden group transition-all duration-500 hover:scale-[1.03] hover:border-rose-400/30">
                {/* Photo area */}
                <div className="relative h-48 overflow-hidden bg-gradient-to-br from-burgundy-700 to-ink">
                  {mem.photo ? (
                    <img
                      src={mem.photo}
                      alt={mem.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Heart className="h-12 w-12 text-rose-400/20" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/80 to-transparent" />
                  <div className="absolute bottom-3 left-4 flex items-center gap-2">
                    <Calendar className="h-3 w-3 text-champagne-300/70" />
                    <span className="font-sans text-xs text-champagne-300/70 tracking-wide">
                      {mem.date}
                    </span>
                  </div>
                </div>

                {/* Text area */}
                <div className="p-6">
                  <h3 className="font-serif text-xl text-rose-200 mb-2">
                    {mem.title}
                  </h3>
                  <p className="font-sans text-sm text-rose-300/60 leading-relaxed">
                    {mem.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Nav arrows (desktop) */}
        <div className="hidden sm:flex gap-4 mt-8">
          <button
            onClick={() => scrollBy(-1)}
            className="glass rounded-full w-10 h-10 flex items-center justify-center text-rose-300/70 hover:text-rose-200 transition-colors"
          >
            ←
          </button>
          <button
            onClick={() => scrollBy(1)}
            className="glass rounded-full w-10 h-10 flex items-center justify-center text-rose-300/70 hover:text-rose-200 transition-colors"
          >
            →
          </button>
        </div>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          onClick={onContinue}
          className="mt-12 px-10 py-4 rounded-full glass-card text-rose-200 font-sans text-sm tracking-widest uppercase hover:text-rose-100 transition-all duration-300 btn-glow"
        >
          Continue ❤️
        </motion.button>
      </div>
    </SceneWrapper>
  );
}
