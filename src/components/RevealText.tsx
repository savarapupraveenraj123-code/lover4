import { motion } from 'framer-motion';

interface RevealTextProps {
  text: string;
  delay?: number;
  duration?: number;
  className?: string;
  y?: number;
  blur?: boolean;
}

export function RevealText({
  text,
  delay = 0,
  duration = 1.5,
  className = '',
  y = 30,
  blur = true,
}: RevealTextProps) {
  return (
    <motion.p
      initial={{ opacity: 0, y, filter: blur ? 'blur(10px)' : 'blur(0px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{ duration, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {text}
    </motion.p>
  );
}
