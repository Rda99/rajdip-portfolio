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

    // Create floating points with 3D movement
    const createPoints = (count: number) => {
      const points = [];
      for (let i = 0; i < count; i++) {
        points.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          z: Math.random() * 200 - 100,
          vx: Math.random() * 0.5 - 0.25,
          vy: Math.random() * 0.5 - 0.25,
          vz: Math.random() * 0.5 - 0.25,
          radius: Math.random() * 2 + 1
        });
      }
      return points;
    };

    const points = createPoints(100);
    let mouseX = 0;
    let mouseY = 0;

    canvas.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update points position with smooth floating motion
      points.forEach(point => {
        point.x += point.vx;
        point.y += point.vy;
        point.z += point.vz;

        // Add mouse interaction
        const dx = mouseX - point.x;
        const dy = mouseY - point.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 200) {
          point.vx += dx * 0.0001;
          point.vy += dy * 0.0001;
        }

        // Boundary check with smooth transition
        if (point.x < 0 || point.x > canvas.width) point.vx *= -1;
        if (point.y < 0 || point.y > canvas.height) point.vy *= -1;
        if (point.z < -100 || point.z > 100) point.vz *= -1;

        // Add some randomness to movement
        point.vx += (Math.random() - 0.5) * 0.01;
        point.vy += (Math.random() - 0.5) * 0.01;
        point.vz += (Math.random() - 0.5) * 0.01;

        // Limit velocity
        const maxSpeed = 2;
        const speed = Math.sqrt(point.vx * point.vx + point.vy * point.vy + point.vz * point.vz);
        if (speed > maxSpeed) {
          point.vx = (point.vx / speed) * maxSpeed;
          point.vy = (point.vy / speed) * maxSpeed;
          point.vz = (point.vz / speed) * maxSpeed;
        }
      });

      // Draw connections with enhanced glow effect
      points.forEach((point, i) => {
        points.forEach((otherPoint, j) => {
          if (i < j) {
            const dx = otherPoint.x - point.x;
            const dy = otherPoint.y - point.y;
            const dz = otherPoint.z - point.z;
            const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

            if (distance < 200) {
              const opacity = (1 - distance / 200);
              const zFactor = Math.min(1, Math.max(0.3, (200 + point.z + otherPoint.z) / 400));

              // Outer glow
              ctx.beginPath();
              ctx.moveTo(point.x, point.y);
              ctx.lineTo(otherPoint.x, otherPoint.y);
              ctx.strokeStyle = `rgba(0, 255, 255, ${opacity * 0.3 * zFactor})`;
              ctx.lineWidth = 4;
              ctx.stroke();

              // Inner bright line
              ctx.beginPath();
              ctx.moveTo(point.x, point.y);
              ctx.lineTo(otherPoint.x, otherPoint.y);
              ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * zFactor})`;
              ctx.lineWidth = 1;
              ctx.stroke();
            }
          }
        });

        // Draw points with enhanced glow
        const zFactor = (point.z + 100) / 200;

        // Outer glow
        ctx.beginPath();
        ctx.arc(point.x, point.y, 8 * zFactor, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 255, 255, ${0.2 * zFactor})`;
        ctx.fill();

        // Middle glow
        ctx.beginPath();
        ctx.arc(point.x, point.y, 4 * zFactor, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 255, 255, ${0.4 * zFactor})`;
        ctx.fill();

        // Core
        ctx.beginPath();
        ctx.arc(point.x, point.y, 2 * zFactor, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${0.8 * zFactor})`;
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