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

    // Create points in a spherical arrangement
    const createSpherePoints = (count: number, radius: number, centerX: number, centerY: number) => {
      const points = [];
      const phi = Math.PI * (3 - Math.sqrt(5)); // Golden angle

      for (let i = 0; i < count; i++) {
        const y = 1 - (i / (count - 1)) * 2;
        const radiusAtY = Math.sqrt(1 - y * y);

        const theta = phi * i;

        const x = Math.cos(theta) * radiusAtY;
        const z = Math.sin(theta) * radiusAtY;

        points.push({
          x3d: x * radius,
          y3d: y * radius,
          z3d: z * radius,
          x: centerX,
          y: centerY,
          angle: theta,
          speed: 0.001 + Math.random() * 0.002,
          wobble: Math.random() * Math.PI * 2
        });
      }
      return points;
    };

    // Create multiple layers with different radii and more points
    const points = [
      ...createSpherePoints(80, 150, canvas.width / 2, canvas.height / 2),
      ...createSpherePoints(100, 200, canvas.width / 2, canvas.height / 2),
      ...createSpherePoints(120, 250, canvas.width / 2, canvas.height / 2),
    ];

    let rotationX = 0;
    let rotationY = 0;
    let time = 0;

    const project3DTo2D = (x: number, y: number, z: number) => {
      const focalLength = 400;
      const scale = focalLength / (focalLength + z);
      return {
        x: x * scale + canvas.width / 2,
        y: y * scale + canvas.height / 2,
        scale: scale
      };
    };

    const rotatePoint = (x: number, y: number, z: number) => {
      const cosY = Math.cos(rotationY);
      const sinY = Math.sin(rotationY);
      const tempX = x * cosY - z * sinY;
      const tempZ = z * cosY + x * sinY;

      const cosX = Math.cos(rotationX);
      const sinX = Math.sin(rotationX);
      const tempY = y * cosX - tempZ * sinX;
      z = tempZ * cosX + y * sinX;

      return { x: tempX, y: tempY, z };
    };

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'; // More trail for better visibility
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      time += 0.01;
      rotationY += 0.001; // Slower rotation for better visibility
      rotationX = Math.sin(time * 0.2) * 0.3;

      points.forEach(point => {
        const rotated = rotatePoint(point.x3d, point.y3d, point.z3d);
        const projected = project3DTo2D(rotated.x, rotated.y, rotated.z);
        point.x = projected.x;
        point.y = projected.y;
      });

      // Draw connections with enhanced visibility
      points.forEach((point, i) => {
        points.forEach((otherPoint, j) => {
          if (i < j) {
            const dx = otherPoint.x - point.x;
            const dy = otherPoint.y - point.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 150) { // Increased connection distance
              const opacity = (1 - distance / 150);

              // Outer glow
              ctx.beginPath();
              ctx.moveTo(point.x, point.y);
              ctx.lineTo(otherPoint.x, otherPoint.y);
              ctx.strokeStyle = `rgba(0, 255, 255, ${opacity * 0.4})`; // Cyan color for better visibility
              ctx.lineWidth = 3;
              ctx.stroke();

              // Inner line
              ctx.beginPath();
              ctx.moveTo(point.x, point.y);
              ctx.lineTo(otherPoint.x, otherPoint.y);
              ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.8})`; // White core for brightness
              ctx.lineWidth = 1;
              ctx.stroke();
            }
          }
        });

        // Enhanced point glow
        // Outer glow
        ctx.beginPath();
        ctx.arc(point.x, point.y, 6, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0, 255, 255, 0.3)';
        ctx.fill();

        // Middle glow
        ctx.beginPath();
        ctx.arc(point.x, point.y, 4, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0, 255, 255, 0.5)';
        ctx.fill();

        // Core
        ctx.beginPath();
        ctx.arc(point.x, point.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
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