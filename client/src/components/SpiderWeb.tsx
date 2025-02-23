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
      vx: number;
      vy: number;
      radius: number;
    }

    // Increase number of points for better visibility
    const points: Point[] = Array.from({ length: 200 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      radius: Math.random() * 2.5 + 1.5 // Slightly larger particles
    }));

    let mouseX = canvas.width / 2;
    let mouseY = canvas.height / 2;

    canvas.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    const animate = () => {
      // Less transparent trail effect
      ctx.fillStyle = 'rgba(10, 10, 20, 0.3)'; // Increased opacity
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update points
      points.forEach(point => {
        point.x += point.vx;
        point.y += point.vy;

        const dx = mouseX - point.x;
        const dy = mouseY - point.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 120) {
          point.vx -= dx * 0.0002;
          point.vy -= dy * 0.0002;
        }

        if (point.x <= 0 || point.x >= canvas.width) {
          point.vx *= -0.8;
          point.x = Math.max(0, Math.min(canvas.width, point.x));
        }
        if (point.y <= 0 || point.y >= canvas.height) {
          point.vy *= -0.8;
          point.y = Math.max(0, Math.min(canvas.height, point.y));
        }

        point.vx *= 0.99;
        point.vy *= 0.99;

        point.vx += (Math.random() - 0.5) * 0.01;
        point.vy += (Math.random() - 0.5) * 0.01;
      });

      // Draw connections with higher opacity
      points.forEach((point, i) => {
        points.forEach((otherPoint, j) => {
          if (i < j) {
            const dx = otherPoint.x - point.x;
            const dy = otherPoint.y - point.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            const maxDistance = 100;

            if (distance < maxDistance) {
              const opacity = Math.pow(1 - distance / maxDistance, 2);

              // More visible connections
              const gradient = ctx.createLinearGradient(
                point.x, point.y,
                otherPoint.x, otherPoint.y
              );
              gradient.addColorStop(0, `rgba(147, 51, 234, ${opacity * 0.8})`); // Increased opacity
              gradient.addColorStop(1, `rgba(168, 85, 247, ${opacity * 0.8})`); // Increased opacity

              ctx.beginPath();
              ctx.moveTo(point.x, point.y);
              ctx.lineTo(otherPoint.x, otherPoint.y);
              ctx.strokeStyle = gradient;
              ctx.lineWidth = 1.5; // Slightly thicker lines
              ctx.stroke();
            }
          }
        });

        // More visible points
        ctx.beginPath();
        ctx.arc(point.x, point.y, point.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(168, 85, 247, 0.9)'; // Increased opacity
        ctx.fill();

        // Enhanced glow effect
        ctx.beginPath();
        ctx.arc(point.x, point.y, point.radius + 2, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(147, 51, 234, 0.5)'; // Increased opacity
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    animate();

    window.addEventListener('resize', resizeCanvas);
    return () => window.removeEventListener('resize', resizeCanvas);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10"
      style={{ backgroundColor: '#0a0a14' }} // Darker background
    />
  );
};

export default SpiderWeb;