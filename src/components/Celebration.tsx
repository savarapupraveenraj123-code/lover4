import { useEffect, useRef } from 'react';

interface ConfettiParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  rotation: number;
  rotationSpeed: number;
  type: 'heart' | 'rose' | 'sparkle' | 'circle';
  color: string;
  life: number;
  maxLife: number;
}

interface CelebrationProps {
  active: boolean;
}

const colors = [
  '#c41e3a',
  '#e0354f',
  '#f48fb1',
  '#f8bbd0',
  '#e8d5a8',
  '#fce4ec',
  '#a01428',
];

export function Celebration({ active }: CelebrationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<ConfettiParticle[]>([]);
  const animationRef = useRef<number>(0);
  const burstTimerRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (!active) {
      particlesRef.current = [];
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      return;
    }

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const createBurst = (cx: number, cy: number, count: number) => {
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 8 + 3;
        const types: ConfettiParticle['type'][] = [
          'heart',
          'rose',
          'sparkle',
          'circle',
        ];
        particlesRef.current.push({
          x: cx,
          y: cy,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 2,
          size: Math.random() * 10 + 5,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.2,
          type: types[Math.floor(Math.random() * types.length)],
          color: colors[Math.floor(Math.random() * colors.length)],
          life: 0,
          maxLife: 200 + Math.random() * 100,
        });
      }
    };

    // Initial full-screen burst
    createBurst(canvas.width / 2, canvas.height / 2, 80);
    // Side bursts
    createBurst(canvas.width * 0.2, canvas.height * 0.5, 40);
    createBurst(canvas.width * 0.8, canvas.height * 0.5, 40);

    const drawHeart = (
      x: number,
      y: number,
      size: number,
      color: string,
      alpha: number
    ) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(size / 20, size / 20);
      ctx.globalAlpha = alpha;
      ctx.fillStyle = color;
      ctx.shadowBlur = 10;
      ctx.shadowColor = color;
      ctx.beginPath();
      ctx.moveTo(0, 5);
      ctx.bezierCurveTo(-10, -5, -20, 5, 0, 15);
      ctx.bezierCurveTo(20, 5, 10, -5, 0, 5);
      ctx.fill();
      ctx.restore();
    };

    const drawRose = (
      x: number,
      y: number,
      size: number,
      color: string,
      alpha: number,
      rotation: number
    ) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.globalAlpha = alpha;
      ctx.fillStyle = color;
      ctx.shadowBlur = 8;
      ctx.shadowColor = color;
      for (let i = 0; i < 5; i++) {
        ctx.beginPath();
        ctx.ellipse(0, 0, size * 0.4, size, (i * Math.PI * 2) / 5, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    };

    const drawSparkle = (
      x: number,
      y: number,
      size: number,
      color: string,
      alpha: number
    ) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.globalAlpha = alpha;
      ctx.fillStyle = color;
      ctx.shadowBlur = 15;
      ctx.shadowColor = color;
      ctx.beginPath();
      for (let i = 0; i < 4; i++) {
        const angle = (i * Math.PI) / 2;
        ctx.lineTo(Math.cos(angle) * size, Math.sin(angle) * size);
        ctx.lineTo(
          Math.cos(angle + Math.PI / 4) * size * 0.3,
          Math.sin(angle + Math.PI / 4) * size * 0.3
        );
      }
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Periodic firework bursts
      burstTimerRef.current++;
      if (burstTimerRef.current % 60 === 0) {
        createBurst(
          Math.random() * canvas.width,
          Math.random() * canvas.height * 0.6,
          30
        );
      }

      const particles = particlesRef.current;
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.12; // gravity
        p.vx *= 0.99;
        p.rotation += p.rotationSpeed;
        p.life++;

        const alpha = Math.max(0, 1 - p.life / p.maxLife);

        if (p.life > p.maxLife) {
          particles.splice(i, 1);
          continue;
        }

        if (p.type === 'heart') {
          drawHeart(p.x, p.y, p.size, p.color, alpha);
        } else if (p.type === 'rose') {
          drawRose(p.x, p.y, p.size, p.color, alpha, p.rotation);
        } else if (p.type === 'sparkle') {
          drawSparkle(p.x, p.y, p.size, p.color, alpha);
        } else {
          ctx.save();
          ctx.globalAlpha = alpha;
          ctx.fillStyle = p.color;
          ctx.shadowBlur = 10;
          ctx.shadowColor = p.color;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 0.4, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', resize);
      particlesRef.current = [];
    };
  }, [active]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-50"
    />
  );
}
