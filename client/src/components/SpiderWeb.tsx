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

    // Create more points with varied sizes
    const points: Point[] = Array.from({ length: 150 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      radius: Math.random() * 2 + 1
    }));

    let mouseX = canvas.width / 2;
    let mouseY = canvas.height / 2;

    canvas.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    const animate = () => {
      // Clear canvas with stronger trail effect
      ctx.fillStyle = 'rgba(10, 10, 20, 0.2)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update points
      points.forEach(point => {
        // Update position with smoother movement
        point.x += point.vx;
        point.y += point.vy;

        // Mouse attraction/repulsion
        const dx = mouseX - point.x;
        const dy = mouseY - point.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 120) {
          point.vx -= dx * 0.0002;
          point.vy -= dy * 0.0002;
        }

        // Boundary checks with smoother transitions
        if (point.x <= 0 || point.x >= canvas.width) {
          point.vx *= -0.8;
          point.x = Math.max(0, Math.min(canvas.width, point.x));
        }
        if (point.y <= 0 || point.y >= canvas.height) {
          point.vy *= -0.8;
          point.y = Math.max(0, Math.min(canvas.height, point.y));
        }

        // Apply friction and randomness
        point.vx *= 0.99;
        point.vy *= 0.99;

        // Add slight randomness to movement
        point.vx += (Math.random() - 0.5) * 0.01;
        point.vy += (Math.random() - 0.5) * 0.01;
      });

      // Draw connections
      points.forEach((point, i) => {
        points.forEach((otherPoint, j) => {
          if (i < j) {
            const dx = otherPoint.x - point.x;
            const dy = otherPoint.y - point.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            const maxDistance = 100;

            if (distance < maxDistance) {
              const opacity = Math.pow(1 - distance / maxDistance, 2);

              // Draw connection with purple gradient
              const gradient = ctx.createLinearGradient(
                point.x, point.y,
                otherPoint.x, otherPoint.y
              );
              gradient.addColorStop(0, `rgba(147, 51, 234, ${opacity * 0.5})`);
              gradient.addColorStop(1, `rgba(168, 85, 247, ${opacity * 0.5})`);

              ctx.beginPath();
              ctx.moveTo(point.x, point.y);
              ctx.lineTo(otherPoint.x, otherPoint.y);
              ctx.strokeStyle = gradient;
              ctx.lineWidth = 1;
              ctx.stroke();
            }
          }
        });

        // Draw point with purple glow
        ctx.beginPath();
        ctx.arc(point.x, point.y, point.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(168, 85, 247, 0.8)';
        ctx.fill();

        // Add glow effect
        ctx.beginPath();
        ctx.arc(point.x, point.y, point.radius + 2, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(147, 51, 234, 0.3)';
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
      style={{ backgroundColor: '#0a0a14' }}
    />
  );
};

export default SpiderWeb;