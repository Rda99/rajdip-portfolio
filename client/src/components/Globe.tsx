import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { motion } from 'framer-motion';

const Globe = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mousePosition = useRef({ x: 0, y: 0 });
  const targetRotation = useRef({ x: 0, y: 0 });
  const globe = useRef<THREE.Mesh | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 2.5;

    // Renderer setup with transparency
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setClearColor(0x000000, 0); // Transparent background
    containerRef.current.appendChild(renderer.domElement);

    // Enhanced lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 2);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xa855f7, 2); // Purple light matching spider web
    pointLight.position.set(5, 3, 5);
    scene.add(pointLight);

    // Create sphere geometry with more detail
    const geometry = new THREE.SphereGeometry(1, 64, 64);

    // Create wireframe material with glow effect
    const material = new THREE.MeshPhongMaterial({
      color: 0xa855f7, // Match spider web color
      wireframe: true,
      transparent: true,
      opacity: 0.3,
      shininess: 100,
    });

    // Create main globe
    globe.current = new THREE.Mesh(geometry, material);
    scene.add(globe.current);

    // Add outer glow sphere
    const glowGeometry = new THREE.SphereGeometry(1.1, 64, 64);
    const glowMaterial = new THREE.MeshPhongMaterial({
      color: 0x9333ea,
      transparent: true,
      opacity: 0.1,
      side: THREE.BackSide,
    });
    const glowSphere = new THREE.Mesh(glowGeometry, glowMaterial);
    scene.add(glowSphere);

    // Handle mouse movement
    const handleMouseMove = (event: MouseEvent) => {
      mousePosition.current = {
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1
      };
    };

    // Handle window resize
    const handleResize = () => {
      if (!containerRef.current) return;

      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    };

    // Floating animation
    let time = 0;
    const animate = () => {
      requestAnimationFrame(animate);

      time += 0.005;

      if (globe.current) {
        // Smooth rotation towards target
        targetRotation.current.x += (mousePosition.current.x * 0.05 - targetRotation.current.x) * 0.1;
        targetRotation.current.y += (mousePosition.current.y * 0.05 - targetRotation.current.y) * 0.1;

        // Base rotation
        globe.current.rotation.y += 0.002;

        // Floating effect
        globe.current.position.y = Math.sin(time) * 0.1;
        glowSphere.position.y = globe.current.position.y;

        // Mouse interaction
        globe.current.rotation.x += targetRotation.current.y * 0.02;
        globe.current.rotation.y += targetRotation.current.x * 0.02;

        glowSphere.rotation.copy(globe.current.rotation);
      }

      renderer.render(scene, camera);
    };

    // Start animation
    animate();

    // Add event listeners
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <motion.div 
      ref={containerRef} 
      className="fixed top-0 left-0 w-full h-full -z-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      style={{ background: 'transparent' }}
    />
  );
};

export default Globe;