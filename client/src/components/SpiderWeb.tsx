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
      vx: number;
      vy: number;
    }

    const points: Point[] = Array.from({ length: 100 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 1.5 + 1,
      vx: (Math.random() * 0.3 - 0.15),
      vy: (Math.random() * 0.3 - 0.15)
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      points.forEach((point, i) => {
        points.forEach((otherPoint, j) => {
          if (i < j) {
            const dx = otherPoint.x - point.x;
            const dy = otherPoint.y - point.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 100) {
              ctx.beginPath();
              ctx.moveTo(point.x, point.y);
              ctx.lineTo(otherPoint.x, otherPoint.y);

              const gradient = ctx.createLinearGradient(
                point.x, point.y,
                otherPoint.x, otherPoint.y
              );
              gradient.addColorStop(0, `rgba(255, 102, 0, ${0.15 - distance / 1000})`);
              gradient.addColorStop(1, `rgba(255, 140, 0, ${0.15 - distance / 1000})`);

              ctx.strokeStyle = gradient;
              ctx.lineWidth = 0.5;
              ctx.stroke();
            }
          }
        });

        ctx.beginPath();
        ctx.arc(point.x, point.y, point.radius + 0.5, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 102, 0, 0.15)';
        ctx.fill();

        ctx.beginPath();
        ctx.arc(point.x, point.y, point.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 102, 0, 0.3)';
        ctx.fill();

        point.x += point.vx;
        point.y += point.vy;

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
      id="spiderWeb"
      className="fixed inset-0 w-full h-full mix-blend-difference"
      style={{ background: 'transparent' }}
    />
  );
};

export default SpiderWeb;