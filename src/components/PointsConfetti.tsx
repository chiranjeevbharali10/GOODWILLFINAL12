
import React, { useEffect, useState } from 'react';

interface PointsConfettiProps {
  isVisible: boolean;
  onComplete: () => void;
}

export const PointsConfetti: React.FC<PointsConfettiProps> = ({ 
  isVisible, 
  onComplete 
}) => {
  const [particles, setParticles] = useState<Array<{
    id: number;
    x: number;
    y: number;
    size: number;
    color: string;
    rotation: number;
    speed: number;
  }>>([]);

  useEffect(() => {
    if (isVisible) {
      // Create confetti particles
      const colors = ['#FF5252', '#FF4081', '#E040FB', '#7C4DFF', '#536DFE', '#448AFF', '#40C4FF', '#00B0FF'];
      const newParticles = [];
      
      for (let i = 0; i < 100; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * window.innerWidth,
          y: -20 - Math.random() * 100,
          size: 5 + Math.random() * 10,
          color: colors[Math.floor(Math.random() * colors.length)],
          rotation: Math.random() * 360,
          speed: 2 + Math.random() * 4
        });
      }
      
      setParticles(newParticles);
      
      // Set a timeout to hide the confetti after animation completes
      const timer = setTimeout(() => {
        onComplete();
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [isVisible, onComplete]);

  useEffect(() => {
    if (particles.length === 0 || !isVisible) return;
    
    let animationId: number;
    const canvas = document.getElementById('confetti-canvas') as HTMLCanvasElement;
    
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      const updateParticles = () => {
        if (!isVisible) {
          cancelAnimationFrame(animationId);
          return;
        }
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        const updatedParticles = particles.map(particle => {
          const y = particle.y + particle.speed;
          const rotation = particle.rotation + 1;
          
          // Draw the particle
          ctx.save();
          ctx.translate(particle.x, y);
          ctx.rotate((rotation * Math.PI) / 180);
          ctx.fillStyle = particle.color;
          ctx.fillRect(-particle.size / 2, -particle.size / 2, particle.size, particle.size);
          ctx.restore();
          
          return { ...particle, y, rotation };
        });
        
        setParticles(updatedParticles);
        animationId = requestAnimationFrame(updateParticles);
      };
      
      animationId = requestAnimationFrame(updateParticles);
    }
    
    return () => cancelAnimationFrame(animationId);
  }, [particles, isVisible]);

  if (!isVisible) return null;

  return (
    <canvas
      id="confetti-canvas"
      className="fixed inset-0 pointer-events-none z-50"
      width={window.innerWidth}
      height={window.innerHeight}
    />
  );
};
