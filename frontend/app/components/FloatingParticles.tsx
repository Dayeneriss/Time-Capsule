'use client';

import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  color: string;
  glowIntensity: number;
  glowDirection: number;
  glowSize: number;
}

const FloatingParticles = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const particles: Particle[] = [];
    const particleCount = 60;
    const colors = [
      '#FF3366', // Rose vif
      '#FFD700', // Or pur
      '#FF8C00', // Orange intense
      '#FFA6C9', // Rose clair lumineux
    ];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2.5 + 1.5,
        speedX: (Math.random() - 0.5) * 0.4,
        speedY: (Math.random() - 0.5) * 0.4,
        opacity: Math.random() * 0.7 + 0.3, // Plus d'opacité
        color: colors[Math.floor(Math.random() * colors.length)],
        glowIntensity: Math.random() * 0.6 + 0.4,
        glowDirection: Math.random() < 0.5 ? -1 : 1,
        glowSize: Math.random() * 4 + 3, // Taille de la lueur variable
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(particle => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        particle.glowIntensity += 0.03 * particle.glowDirection;

        if (particle.glowIntensity >= 1 || particle.glowIntensity <= 0.4) {
          particle.glowDirection *= -1;
        }

        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;

        // Effet de lueur plus intense
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.size * particle.glowSize
        );
        gradient.addColorStop(0, particle.color);
        gradient.addColorStop(0.4, particle.color + '80'); // Semi-transparent
        gradient.addColorStop(1, 'transparent');

        // Lueur externe
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * particle.glowSize, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.globalAlpha = particle.opacity * particle.glowIntensity;
        ctx.fill();

        // Particule centrale plus brillante
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.globalAlpha = particle.opacity * 1.2; // Plus brillant au centre
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ mixBlendMode: 'screen' }}
    />
  );
};

export default FloatingParticles;
