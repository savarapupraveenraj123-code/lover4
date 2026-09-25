import { AnimatePresence, motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { useEffect, useState } from 'react';
import { config } from '@/config';

export function EasterEgg() {
  const [clicks, setClicks] = useState(0);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (clicks >= 5) {
      setShow(true);
      setClicks(0);
      const t = setTimeout(() => setShow(false), 8000);
      return () => clearTimeout(t);
    }
  }, [clicks]);

  return (
    <>
      <button
        onClick={() => setClicks((c) => c + 1)}
        aria-label="Secret"
        className="fixed bottom-4 right-4 z-[200] text-rose-400/30 hover:text-rose-400/60 transition-colors duration-300"
      >
        <Heart className="h-4 w-4 fill-current" />
      </button>

      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0, y: 30, filter: 'blur(15px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: 30, filter: 'blur(15px)' }}
            transition={{ duration: 1 }}
            className="fixed bottom-16 right-4 z-[200] max-w-xs glass-card rounded-2xl p-6 text-right"
          >
            {config.easterEgg.lines.map((line, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 1.5, duration: 1 }}
                className={`font-serif text-sm ${
                  i === config.easterEgg.lines.length - 1
                    ? 'text-champagne-200 italic mt-2'
                    : 'text-rose-200/80'
                }`}
              >
                {line}
              </motion.p>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
