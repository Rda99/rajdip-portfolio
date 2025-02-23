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
    }

    // Create more points for denser web
    const points: Point[] = Array.from({ length: 150 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 3 + 2 // Larger points for better visibility
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

            if (distance < 180) { // Increased connection distance
              ctx.beginPath();
              ctx.moveTo(point.x, point.y);
              ctx.lineTo(otherPoint.x, otherPoint.y);

              // Create gradient for lines
              const gradient = ctx.createLinearGradient(
                point.x, point.y,
                otherPoint.x, otherPoint.y
              );
              gradient.addColorStop(0, `rgba(255, 102, 0, ${1 - distance / 180})`); // Orange
              gradient.addColorStop(1, `rgba(255, 140, 0, ${1 - distance / 180})`); // Darker orange

              ctx.strokeStyle = gradient;
              ctx.lineWidth = 0.8; // Slightly thicker lines
              ctx.stroke();
            }
          }
        });

        // Draw points with glow effect
        ctx.beginPath();
        ctx.arc(point.x, point.y, point.radius + 2, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 102, 0, 0.2)'; // Orange glow
        ctx.fill();

        ctx.beginPath();
        ctx.arc(point.x, point.y, point.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 102, 0, 0.8)'; // Solid orange center
        ctx.fill();

        // Move points
        point.x += Math.random() * 2 - 1;
        point.y += Math.random() * 2 - 1;

        // Keep points in bounds
        if (point.x < 0) point.x = canvas.width;
        if (point.x > canvas.width) point.x = 0;
        if (point.y < 0) point.y = canvas.height;
        if (point.y > canvas.height) point.y = 0;
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