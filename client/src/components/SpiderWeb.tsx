import { useEffect, useRef } from 'react';

const SpiderWeb = () => {
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

    interface Point {
      x: number;
      y: number;
      radius: number;
      vx: number; // velocity x
      vy: number; // velocity y
    }

    // Create more points for denser web
    const points: Point[] = Array.from({ length: 200 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 2 + 1.5, // Slightly smaller points
      vx: (Math.random() * 0.4 - 0.2), // Slower movement
      vy: (Math.random() * 0.4 - 0.2)  // Slower movement
    }));

    const draw = () => {
      // Semi-transparent black background
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw connections
      points.forEach((point, i) => {
        points.forEach((otherPoint, j) => {
          if (i < j) {
            const dx = otherPoint.x - point.x;
            const dy = otherPoint.y - point.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 120) { // Reduced connection distance
              ctx.beginPath();
              ctx.moveTo(point.x, point.y);
              ctx.lineTo(otherPoint.x, otherPoint.y);

              // Create gradient for lines
              const gradient = ctx.createLinearGradient(
                point.x, point.y,
                otherPoint.x, otherPoint.y
              );
              gradient.addColorStop(0, `rgba(255, 102, 0, ${1 - distance / 120})`); // Orange
              gradient.addColorStop(1, `rgba(255, 140, 0, ${1 - distance / 120})`); // Darker orange

              ctx.strokeStyle = gradient;
              ctx.lineWidth = 0.5; // Thinner lines for less visual noise
              ctx.stroke();
            }
          }
        });

        // Draw points with subtle glow effect
        ctx.beginPath();
        ctx.arc(point.x, point.y, point.radius + 1, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 102, 0, 0.15)'; // Subtle orange glow
        ctx.fill();

        ctx.beginPath();
        ctx.arc(point.x, point.y, point.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 102, 0, 0.6)'; // Solid orange center

        ctx.fill();

        // Move points with velocity
        point.x += point.vx;
        point.y += point.vy;

        // Keep points in bounds with bounce effect
        if (point.x < 0 || point.x > canvas.width) point.vx *= -1;
        if (point.y < 0 || point.y > canvas.height) point.vy *= -1;
      });
    };

    const animate = () => {
      draw();
      requestAnimationFrame(animate);
    };

    animate();

    window.addEventListener('resize', resizeCanvas);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full"
      style={{ background: 'transparent' }}
    />
  );
};

export default SpiderWeb;