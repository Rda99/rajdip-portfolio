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
      z: number;
      vx: number;
      vy: number;
      vz: number;
    }

    // Create points with smoother movement
    const points: Point[] = Array.from({ length: 100 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      z: Math.random() * 200 - 100,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      vz: (Math.random() - 0.5) * 0.3
    }));

    let mouseX = canvas.width / 2;
    let mouseY = canvas.height / 2;

    canvas.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    const animate = () => {
      // Clear canvas with slight trail effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update points
      points.forEach(point => {
        // Update position
        point.x += point.vx;
        point.y += point.vy;
        point.z += point.vz;

        // Mouse interaction
        const dx = mouseX - point.x;
        const dy = mouseY - point.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 160) {
          point.vx += dx * 0.00015;
          point.vy += dy * 0.00015;
        }

        // Boundary checks
        if (point.x <= 0 || point.x >= canvas.width) {
          point.vx *= -1;
          point.x = Math.max(0, Math.min(canvas.width, point.x));
        }
        if (point.y <= 0 || point.y >= canvas.height) {
          point.vy *= -1;
          point.y = Math.max(0, Math.min(canvas.height, point.y));
        }
        if (point.z <= -100 || point.z >= 100) {
          point.vz *= -1;
        }

        // Apply friction
        point.vx *= 0.99;
        point.vy *= 0.99;
        point.vz *= 0.99;
      });

      // Draw connections
      points.forEach((point, i) => {
        points.forEach((otherPoint, j) => {
          if (i < j) {
            const dx = otherPoint.x - point.x;
            const dy = otherPoint.y - point.y;
            const dz = otherPoint.z - point.z;
            const distance = Math.sqrt(dx * dx + dy * dy);

            // Adjust connection distance based on z-position
            const maxDistance = 150 * (1 + Math.abs(point.z - otherPoint.z) / 200);

            if (distance < maxDistance) {
              const opacity = Math.pow(1 - distance / maxDistance, 2);
              const zFactor = Math.min(1, Math.max(0.2, (200 + point.z + otherPoint.z) / 400));

              // Draw glow effect
              ctx.beginPath();
              ctx.moveTo(point.x, point.y);
              ctx.lineTo(otherPoint.x, otherPoint.y);
              ctx.strokeStyle = `rgba(0, 255, 255, ${opacity * 0.4 * zFactor})`;
              ctx.lineWidth = 3;
              ctx.stroke();

              // Draw core line
              ctx.beginPath();
              ctx.moveTo(point.x, point.y);
              ctx.lineTo(otherPoint.x, otherPoint.y);
              ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.8 * zFactor})`;
              ctx.lineWidth = 1;
              ctx.stroke();
            }
          }
        });

        // Draw point with glow effect
        const zFactor = (point.z + 100) / 200;

        // Outer glow
        ctx.beginPath();
        ctx.arc(point.x, point.y, 5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 255, 255, ${0.3 * zFactor})`;
        ctx.fill();

        // Core
        ctx.beginPath();
        ctx.arc(point.x, point.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${0.9 * zFactor})`;
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
      style={{ backgroundColor: '#000000' }}
    />
  );
};

export default SpiderWeb;