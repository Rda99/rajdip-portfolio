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

    // Static points with larger radius
    const points: Point[] = Array.from({ length: 150 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 3 + 2 // Larger radius for better visibility
    }));

    let mouseX = canvas.width / 2;
    let mouseY = canvas.height / 2;

    const draw = () => {
      // Clear canvas completely for crisp rendering
      ctx.fillStyle = '#0a0a14';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw connections only near mouse
      points.forEach((point, i) => {
        // Calculate distance to mouse
        const dxMouse = mouseX - point.x;
        const dyMouse = mouseY - point.y;
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);

        // Only process points within mouse influence
        if (distMouse < 200) {
          points.forEach((otherPoint, j) => {
            if (i < j) {
              const dx = otherPoint.x - point.x;
              const dy = otherPoint.y - point.y;
              const distance = Math.sqrt(dx * dx + dy * dy);

              if (distance < 150) {
                const opacity = Math.pow(1 - distance / 150, 2) * 
                              Math.pow(1 - distMouse / 200, 2);

                // Enhanced connections
                const gradient = ctx.createLinearGradient(
                  point.x, point.y,
                  otherPoint.x, otherPoint.y
                );
                gradient.addColorStop(0, `rgba(147, 51, 234, ${opacity})`);
                gradient.addColorStop(1, `rgba(168, 85, 247, ${opacity})`);

                ctx.beginPath();
                ctx.moveTo(point.x, point.y);
                ctx.lineTo(otherPoint.x, otherPoint.y);
                ctx.strokeStyle = gradient;
                ctx.lineWidth = 2;
                ctx.stroke();
              }
            }
          });
        }

        // Draw points with enhanced visibility
        ctx.beginPath();
        ctx.arc(point.x, point.y, point.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(168, 85, 247, 0.9)';
        ctx.fill();

        // Add glow effect
        ctx.beginPath();
        ctx.arc(point.x, point.y, point.radius + 2, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(147, 51, 234, 0.6)';
        ctx.fill();
      });
    };

    // Handle mouse movement
    const handleMouseMove = (event: MouseEvent) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
      draw(); // Redraw only on mouse movement
    };

    // Initial draw
    draw();

    // Event listeners
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