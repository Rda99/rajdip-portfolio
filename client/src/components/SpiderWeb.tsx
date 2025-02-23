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

    let nodes: { x: number; y: number; vx: number; vy: number }[] = [];
    const nodeCount = 200; // Increased node count for denser web
    const maxDistance = 200; // Increased connection distance

    // Initialize nodes
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 1.2, // Increased speed
        vy: (Math.random() - 0.5) * 1.2  // Increased speed
      });
    }

    const animate = () => {
      // Clear with very low opacity for longer trails
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw nodes
      nodes.forEach(node => {
        node.x += node.vx;
        node.y += node.vy;

        // Bounce off edges with randomization
        if (node.x <= 0 || node.x >= canvas.width) {
          node.vx *= -1;
          node.vx += (Math.random() - 0.5) * 0.2;
        }
        if (node.y <= 0 || node.y >= canvas.height) {
          node.vy *= -1;
          node.vy += (Math.random() - 0.5) * 0.2;
        }

        // Draw connections with glow effect
        nodes.forEach(otherNode => {
          const dx = otherNode.x - node.x;
          const dy = otherNode.y - node.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < maxDistance) {
            const opacity = (1 - distance / maxDistance);

            // Draw glow effect
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(otherNode.x, otherNode.y);
            ctx.strokeStyle = `rgba(255, 165, 0, ${opacity * 0.3})`;
            ctx.lineWidth = 4;
            ctx.stroke();

            // Draw main line
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(otherNode.x, otherNode.y);
            ctx.strokeStyle = `rgba(255, 165, 0, ${opacity})`;
            ctx.lineWidth = 1.5;
            ctx.stroke();
          }
        });

        // Draw nodes with glow
        ctx.beginPath();
        ctx.arc(node.x, node.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 165, 0, 0.8)';
        ctx.fill();

        // Node glow effect
        ctx.beginPath();
        ctx.arc(node.x, node.y, 4, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 165, 0, 0.3)';
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
      className="fixed top-0 left-0 w-full h-full -z-10 bg-black"
      style={{ backgroundColor: '#000000' }}
    />
  );
};

export default SpiderWeb;