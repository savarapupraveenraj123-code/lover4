import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface SceneWrapperProps {
  children: ReactNode;
  className?: string;
  gradient?: string;
}

export function SceneWrapper({
  children,
  className = '',
  gradient = 'bg-gradient-to-b from-ink via-burgundy-900 to-ink',
}: SceneWrapperProps) {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.2, ease: 'easeInOut' }}
      className={`relative min-h-[100dvh] w-full overflow-hidden ${gradient} ${className}`}
    >
      {children}
    </motion.section>
  );
}
