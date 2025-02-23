import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const Globe = () => {
  const containerRef = useRef<HTMLDivElement>(null);
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
    camera.position.z = 1.8; // Bring camera closer for better visibility

    // Renderer setup with better antialias
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,
    });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setClearColor(0x000000, 0);
    containerRef.current.appendChild(renderer.domElement);

    // Brighter ambient light
    const ambientLight = new THREE.AmbientLight(0xff9933, 5); // Increased intensity
    scene.add(ambientLight);

    // Create sphere with orange wireframe
    const geometry = new THREE.SphereGeometry(1.1, 64, 64); // More segments for smoother appearance
    const material = new THREE.MeshBasicMaterial({
      color: 0xff6600, // Bright orange
      wireframe: true,
      wireframeLinewidth: 3, // Thicker lines
      transparent: true,
      opacity: 0.8, // Slight transparency for depth
    });

    // Create and add globe to scene
    globe.current = new THREE.Mesh(geometry, material);
    scene.add(globe.current);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      if (globe.current) {
        // Slower rotation for better visibility
        globe.current.rotation.y += 0.005;
        globe.current.rotation.x += 0.002;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      if (!containerRef.current) return;

      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 w-full h-full"
      style={{ background: 'transparent', zIndex: 0 }}
    />
  );
};

export default Globe;