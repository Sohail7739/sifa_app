import { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import * as THREE from 'three';

interface ScrollBall3DProps {
  modelPath?: string;
  position?: [number, number, number];
  scale?: number;
}

function BallModel({ modelPath, position = [0, 0, 0], scale = 1 }: ScrollBall3DProps) {
  const meshRef = useRef<THREE.Group>(null);
  const [model, setModel] = useState<THREE.Group | null>(null);
  const [scrollRotation, setScrollRotation] = useState(0);
  const clipPlaneRef = useRef<THREE.Plane | null>(null);

  // Load the 3D model
  useEffect(() => {
    if (!modelPath) {
      // Create a fallback sphere if no model is provided
      const geometry = new THREE.SphereGeometry(1, 32, 32);
      const material = new THREE.MeshStandardMaterial({ 
        color: 0xffffff,
        clippingPlanes: [],
        clipShadows: true
      });
      const sphere = new THREE.Mesh(geometry, material);
      const group = new THREE.Group();
      group.add(sphere);
      setModel(group);
      return;
    }

    const loader = new GLTFLoader();
    
    // Optional: Add DRACO loader for compressed models
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/');
    loader.setDRACOLoader(dracoLoader);

    loader.load(
      modelPath,
      (gltf) => {
        const loadedModel = gltf.scene.clone();
        setModel(loadedModel);
      },
      undefined,
      (error) => {
        console.error('Error loading 3D model:', error);
        // Fallback to sphere
        const geometry = new THREE.SphereGeometry(1, 32, 32);
        const material = new THREE.MeshStandardMaterial({ 
          color: 0xffffff,
          clippingPlanes: [],
          clipShadows: true
        });
        const sphere = new THREE.Mesh(geometry, material);
        const group = new THREE.Group();
        group.add(sphere);
        setModel(group);
      }
    );
  }, [modelPath]);

  // Apply clipping planes to the model after it's loaded
  useEffect(() => {
    if (!model) return;

    // Calculate bounding box in world space
    const box = new THREE.Box3().setFromObject(model);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());

    // Create clipping plane to cut 40% from the right, keeping left 60%
    // Plane normal (1, 0, 0) points right, keeping points where x < constant
    // We want to keep left 60%, so cut at: leftEdge + 0.6 * size.x
    // leftEdge = center.x - size.x/2
    // cutPoint = center.x - size.x/2 + 0.6 * size.x = center.x + 0.1 * size.x
    const clipX = center.x + (size.x * 0.1); // Position at 60% from left edge
    const clipPlane = new THREE.Plane(new THREE.Vector3(1, 0, 0), -clipX);
    clipPlaneRef.current = clipPlane;

    // Apply clipping plane to all meshes
    model.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        const materials = Array.isArray(child.material) 
          ? child.material 
          : [child.material];
        
        materials.forEach((mat) => {
          if (mat instanceof THREE.Material) {
            mat.clippingPlanes = [clipPlane];
            mat.clipShadows = true;
            mat.needsUpdate = true;
          }
        });
      }
    });
  }, [model]);

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollProgress = Math.min(scrollY / Math.max(documentHeight, 1), 1);
      // Rotate based on scroll (360 degrees per full scroll)
      setScrollRotation(scrollProgress * Math.PI * 2);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Apply rotation animation
  useFrame(() => {
    if (meshRef.current) {
      // Rotate around Y axis (horizontal rotation) based on scroll
      meshRef.current.rotation.y = scrollRotation;
    }
  });

  if (!model) return null;

  return (
    <group ref={meshRef} position={position} scale={scale}>
      <primitive object={model} />
    </group>
  );
}

export default function ScrollBall3D({ 
  modelPath, 
  position = [0, 0, 0], 
  scale = 1 
}: ScrollBall3DProps) {
  return (
    <div
      style={{
        position: 'fixed',
        right: 0,
        top: '50%',
        transform: 'translateY(-50%)',
        width: '40vw',
        height: '40vw',
        maxWidth: '600px',
        maxHeight: '600px',
        zIndex: 1,
        pointerEvents: 'none',
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        gl={{ 
          alpha: true,
          antialias: true,
          localClippingEnabled: true // Enable clipping planes
        }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, -10, -5]} intensity={0.5} />
        <BallModel modelPath={modelPath} position={position} scale={scale} />
      </Canvas>
    </div>
  );
}

