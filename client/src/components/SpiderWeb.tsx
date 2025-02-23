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
        const y = 1 - (i / (count - 1)) * 2; // y goes from 1 to -1
        const radiusAtY = Math.sqrt(1 - y * y); // radius at y

        const theta = phi * i; // Golden angle increment

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

    // Create multiple layers with different radii
    const points = [
      ...createSpherePoints(50, 150, canvas.width / 2, canvas.height / 2),
      ...createSpherePoints(75, 200, canvas.width / 2, canvas.height / 2),
      ...createSpherePoints(100, 250, canvas.width / 2, canvas.height / 2),
    ];

    let rotationX = 0;
    let rotationY = 0;
    let time = 0;

    const project3DTo2D = (x: number, y: number, z: number) => {
      // Simple perspective projection
      const focalLength = 400;
      const scale = focalLength / (focalLength + z);
      return {
        x: x * scale + canvas.width / 2,
        y: y * scale + canvas.height / 2,
        scale: scale
      };
    };

    const rotatePoint = (x: number, y: number, z: number) => {
      // Rotate around Y axis
      const cosY = Math.cos(rotationY);
      const sinY = Math.sin(rotationY);
      const tempX = x * cosY - z * sinY;
      const tempZ = z * cosY + x * sinY;

      // Rotate around X axis
      const cosX = Math.cos(rotationX);
      const sinX = Math.sin(rotationX);
      const tempY = y * cosX - tempZ * sinX;
      z = tempZ * cosX + y * sinX;

      return { x: tempX, y: tempY, z };
    };

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      time += 0.01;
      rotationY += 0.002; // Constant rotation around Y axis
      rotationX = Math.sin(time * 0.2) * 0.3; // Gentle wobble around X axis

      // Update point positions with 3D rotation
      points.forEach(point => {
        const rotated = rotatePoint(point.x3d, point.y3d, point.z3d);
        const projected = project3DTo2D(rotated.x, rotated.y, rotated.z);
        point.x = projected.x;
        point.y = projected.y;
      });

      // Draw connections
      points.forEach((point, i) => {
        points.forEach((otherPoint, j) => {
          if (i < j) {
            const dx = otherPoint.x - point.x;
            const dy = otherPoint.y - point.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 100) {
              const opacity = (1 - distance / 100) * 0.5;

              // Enhanced glow effect
              ctx.beginPath();
              ctx.moveTo(point.x, point.y);
              ctx.lineTo(otherPoint.x, otherPoint.y);
              ctx.strokeStyle = `rgba(64, 196, 255, ${opacity * 0.5})`; // Bright blue color
              ctx.lineWidth = 2;
              ctx.stroke();

              // Main line
              ctx.beginPath();
              ctx.moveTo(point.x, point.y);
              ctx.lineTo(otherPoint.x, otherPoint.y);
              ctx.strokeStyle = `rgba(32, 156, 255, ${opacity})`; // Slightly darker blue
              ctx.lineWidth = 1;
              ctx.stroke();
            }
          }
        });

        // Draw points with glow
        ctx.beginPath();
        ctx.arc(point.x, point.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(64, 196, 255, 0.8)';
        ctx.fill();

        ctx.beginPath();
        ctx.arc(point.x, point.y, 4, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(64, 196, 255, 0.3)';
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