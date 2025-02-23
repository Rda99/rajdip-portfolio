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

    // Create circular points around the center
    const createCircularPoints = (count: number, radius: number, centerX: number, centerY: number) => {
      const points = [];
      for (let i = 0; i < count; i++) {
        const angle = (i / count) * Math.PI * 2;
        points.push({
          x: centerX + Math.cos(angle) * radius,
          y: centerY + Math.sin(angle) * radius,
          angle: angle,
          radius: radius,
          speed: 0.001 + Math.random() * 0.002
        });
      }
      return points;
    };

    // Create multiple layers of points
    const layers = [
      createCircularPoints(12, 150, canvas.width / 2, canvas.height / 2),
      createCircularPoints(18, 250, canvas.width / 2, canvas.height / 2),
      createCircularPoints(24, 350, canvas.width / 2, canvas.height / 2)
    ];

    let time = 0;

    const animate = () => {
      // Clear canvas with slight trail effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      time += 0.01;

      // Update and draw each layer
      layers.forEach((points, layerIndex) => {
        points.forEach((point, pointIndex) => {
          // Update point position with oscillating movement
          point.angle += point.speed;
          point.x = canvas.width / 2 + Math.cos(point.angle) * point.radius;
          point.y = canvas.height / 2 + Math.sin(point.angle) * point.radius * Math.sin(time * 0.5);

          // Draw connections to nearby points in same layer
          points.forEach((otherPoint, otherIndex) => {
            if (pointIndex !== otherIndex) {
              const dx = otherPoint.x - point.x;
              const dy = otherPoint.y - point.y;
              const distance = Math.sqrt(dx * dx + dy * dy);

              if (distance < 200) {
                const opacity = Math.sin(time + pointIndex) * 0.5 + 0.5;

                // Draw glow effect
                ctx.beginPath();
                ctx.moveTo(point.x, point.y);
                ctx.lineTo(otherPoint.x, otherPoint.y);
                ctx.strokeStyle = `rgba(255, 165, 0, ${opacity * 0.3})`;
                ctx.lineWidth = 4;
                ctx.stroke();

                // Draw main line
                ctx.beginPath();
                ctx.moveTo(point.x, point.y);
                ctx.lineTo(otherPoint.x, otherPoint.y);
                ctx.strokeStyle = `rgba(255, 165, 0, ${opacity * 0.8})`;
                ctx.lineWidth = 2;
                ctx.stroke();
              }
            }
          });

          // Connect to closest points in adjacent layers
          if (layerIndex < layers.length - 1) {
            const nextLayer = layers[layerIndex + 1];
            const closestPoints = nextLayer
              .slice()
              .sort((a, b) => {
                const distA = Math.sqrt(Math.pow(a.x - point.x, 2) + Math.pow(a.y - point.y, 2));
                const distB = Math.sqrt(Math.pow(b.x - point.x, 2) + Math.pow(b.y - point.y, 2));
                return distA - distB;
              })
              .slice(0, 2);

            closestPoints.forEach(closePoint => {
              const opacity = Math.sin(time + pointIndex) * 0.5 + 0.5;

              // Draw glow effect
              ctx.beginPath();
              ctx.moveTo(point.x, point.y);
              ctx.lineTo(closePoint.x, closePoint.y);
              ctx.strokeStyle = `rgba(255, 165, 0, ${opacity * 0.2})`;
              ctx.lineWidth = 3;
              ctx.stroke();

              // Draw main line
              ctx.beginPath();
              ctx.moveTo(point.x, point.y);
              ctx.lineTo(closePoint.x, closePoint.y);
              ctx.strokeStyle = `rgba(255, 165, 0, ${opacity * 0.6})`;
              ctx.lineWidth = 1.5;
              ctx.stroke();
            });
          }

          // Draw point with glow
          ctx.beginPath();
          ctx.arc(point.x, point.y, 3, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(255, 165, 0, 0.8)';
          ctx.fill();

          // Add point glow
          ctx.beginPath();
          ctx.arc(point.x, point.y, 6, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(255, 165, 0, 0.3)';
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