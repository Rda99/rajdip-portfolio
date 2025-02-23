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

    // More points for denser web
    const points: Point[] = Array.from({ length: 200 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 4 + 3 // Larger points
    }));

    let mouseX = canvas.width / 2;
    let mouseY = canvas.height / 2;

    const draw = () => {
      // Clear canvas with dark background
      ctx.fillStyle = '#0a0a14';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw connections with increased range
      points.forEach((point, i) => {
        const dxMouse = mouseX - point.x;
        const dyMouse = mouseY - point.y;
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);

        // Increased influence range
        if (distMouse < 300) {
          points.forEach((otherPoint, j) => {
            if (i < j) {
              const dx = otherPoint.x - point.x;
              const dy = otherPoint.y - point.y;
              const distance = Math.sqrt(dx * dx + dy * dy);

              // Increased connection range
              if (distance < 200) {
                const opacity = Math.pow(1 - distance / 200, 2) * 
                             Math.pow(1 - distMouse / 300, 2);

                // Brighter gradient
                const gradient = ctx.createLinearGradient(
                  point.x, point.y,
                  otherPoint.x, otherPoint.y
                );
                gradient.addColorStop(0, `rgba(168, 85, 247, ${opacity * 0.8})`); // More visible
                gradient.addColorStop(1, `rgba(147, 51, 234, ${opacity * 0.8})`);

                ctx.beginPath();
                ctx.moveTo(point.x, point.y);
                ctx.lineTo(otherPoint.x, otherPoint.y);
                ctx.strokeStyle = gradient;
                ctx.lineWidth = 2.5; // Thicker lines
                ctx.stroke();
              }
            }
          });
        }

        // Draw larger points with enhanced glow
        ctx.beginPath();
        ctx.arc(point.x, point.y, point.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(168, 85, 247, 0.9)'; // More opaque
        ctx.fill();

        // Enhanced glow effect
        ctx.beginPath();
        ctx.arc(point.x, point.y, point.radius + 3, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(147, 51, 234, 0.7)';
        ctx.fill();
      });
    };

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
      draw();
    };

    draw();

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', () => {
      resizeCanvas();
      draw();
    });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', resizeCanvas);
    };
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