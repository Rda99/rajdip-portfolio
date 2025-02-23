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

    // Create points around the center
    const createCircularPoints = (count: number, radius: number, centerX: number, centerY: number) => {
      const points = [];
      for (let i = 0; i < count; i++) {
        const angle = (i / count) * Math.PI * 2;
        points.push({
          x: centerX + Math.cos(angle) * radius,
          y: centerY + Math.sin(angle) * radius,
          angle: angle,
          radius: radius,
          speed: 0.001 + Math.random() * 0.002,
          wobble: Math.random() * Math.PI * 2
        });
      }
      return points;
    };

    // Create multiple layers of points with more density
    const layers = [
      createCircularPoints(15, 150, canvas.width / 2, canvas.height / 2),
      createCircularPoints(20, 250, canvas.width / 2, canvas.height / 2),
      createCircularPoints(25, 350, canvas.width / 2, canvas.height / 2),
      createCircularPoints(30, 450, canvas.width / 2, canvas.height / 2)
    ];

    let time = 0;

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.15)'; // Slightly more trail
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      time += 0.01;

      layers.forEach((points, layerIndex) => {
        points.forEach((point, pointIndex) => {
          // Update point position with more complex movement
          point.wobble += 0.02;
          point.angle += point.speed;
          point.x = canvas.width / 2 + 
            Math.cos(point.angle) * (point.radius + Math.sin(point.wobble) * 20);
          point.y = canvas.height / 2 + 
            Math.sin(point.angle) * (point.radius + Math.cos(point.wobble) * 20);

          // Draw connections with enhanced glow
          points.forEach((otherPoint, otherIndex) => {
            if (pointIndex !== otherIndex) {
              const dx = otherPoint.x - point.x;
              const dy = otherPoint.y - point.y;
              const distance = Math.sqrt(dx * dx + dy * dy);

              if (distance < 200) {
                const opacity = (Math.sin(time + pointIndex) * 0.5 + 0.5) * 0.8; // Increased base opacity

                // Enhanced glow effect
                ctx.beginPath();
                ctx.moveTo(point.x, point.y);
                ctx.lineTo(otherPoint.x, otherPoint.y);
                ctx.strokeStyle = `rgba(255, 165, 0, ${opacity * 0.4})`; // Increased glow opacity
                ctx.lineWidth = 6; // Thicker glow
                ctx.stroke();

                // Main line with higher opacity
                ctx.beginPath();
                ctx.moveTo(point.x, point.y);
                ctx.lineTo(otherPoint.x, otherPoint.y);
                ctx.strokeStyle = `rgba(255, 165, 0, ${opacity})`; // Full opacity for main line
                ctx.lineWidth = 2;
                ctx.stroke();
              }
            }
          });

          // Connect to adjacent layers with enhanced effect
          if (layerIndex < layers.length - 1) {
            const nextLayer = layers[layerIndex + 1];
            const closestPoints = nextLayer
              .slice()
              .sort((a, b) => {
                const distA = Math.sqrt(Math.pow(a.x - point.x, 2) + Math.pow(a.y - point.y, 2));
                const distB = Math.sqrt(Math.pow(b.x - point.x, 2) + Math.pow(b.y - point.y, 2));
                return distA - distB;
              })
              .slice(0, 3); // Connect to more points

            closestPoints.forEach(closePoint => {
              const opacity = (Math.sin(time + pointIndex) * 0.5 + 0.5) * 0.8;

              // Enhanced glow effect
              ctx.beginPath();
              ctx.moveTo(point.x, point.y);
              ctx.lineTo(closePoint.x, closePoint.y);
              ctx.strokeStyle = `rgba(255, 165, 0, ${opacity * 0.3})`;
              ctx.lineWidth = 4;
              ctx.stroke();

              // Main line
              ctx.beginPath();
              ctx.moveTo(point.x, point.y);
              ctx.lineTo(closePoint.x, closePoint.y);
              ctx.strokeStyle = `rgba(255, 165, 0, ${opacity * 0.7})`;
              ctx.lineWidth = 1.5;
              ctx.stroke();
            });
          }

          // Enhanced point glow
          ctx.beginPath();
          ctx.arc(point.x, point.y, 4, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(255, 165, 0, 0.9)'; // Brighter points
          ctx.fill();

          ctx.beginPath();
          ctx.arc(point.x, point.y, 8, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(255, 165, 0, 0.4)'; // Enhanced point glow
          ctx.fill();
        });
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
      className="fixed top-0 left-0 w-full h-full -z-10 bg-black"
      style={{ backgroundColor: '#000000' }}
    />
  );
};

export default SpiderWeb;