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
    // Move camera closer to make globe bigger
    camera.position.z = 2;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,
    });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setClearColor(0x000000, 0);
    containerRef.current.appendChild(renderer.domElement);

    // Enhanced lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 3); // Increased intensity
    scene.add(ambientLight);

    // Create larger sphere geometry with more segments
    const geometry = new THREE.SphereGeometry(1.2, 48, 48); // Increased size and detail
    const material = new THREE.MeshBasicMaterial({
      color: 0xa855f7, // Bright purple color
      wireframe: true,
      wireframeLinewidth: 2,
      opacity: 1, // Full opacity
      transparent: true,
    });

    // Create globe
    globe.current = new THREE.Mesh(geometry, material);
    scene.add(globe.current);

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);

      if (globe.current) {
        // Faster rotation for more visible movement
        globe.current.rotation.y += 0.008;
        globe.current.rotation.x += 0.004;
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
      className="fixed top-0 left-0 w-full h-full -z-20"
      style={{ background: 'transparent' }}
    />
  );
};

export default Globe;