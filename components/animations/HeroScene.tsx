'use client';

/**
 * HeroScene — sphère géodésique filaire qui tourne lentement, en fond du hero.
 * Trois couches : maillage filaire violet, cœur diffus, coquille cyan (glow).
 *
 * Jamais dans le bundle initial : importé par HeroBackground3D via
 * next/dynamic (ssr: false). Ne pas l'importer directement.
 */

import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sparkles } from '@react-three/drei';
import { useRef } from 'react';
import { BackSide, type Group } from 'three';

function GeoSphere() {
  const group = useRef<Group>(null);

  useFrame((_, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * 0.07;
    group.current.rotation.x += delta * 0.015;
  });

  return (
    <Float speed={0.9} rotationIntensity={0.2} floatIntensity={0.4}>
      <group ref={group} scale={1.7}>
        {/* Maillage filaire */}
        <mesh>
          <icosahedronGeometry args={[1, 2]} />
          <meshBasicMaterial color="#7b62f8" wireframe transparent opacity={0.42} />
        </mesh>
        {/* Cœur diffus */}
        <mesh scale={0.99}>
          <icosahedronGeometry args={[1, 2]} />
          <meshBasicMaterial color="#5B3DF6" transparent opacity={0.08} />
        </mesh>
        {/* Coquille glow (faces internes) */}
        <mesh scale={1.22}>
          <sphereGeometry args={[1, 40, 40]} />
          <meshBasicMaterial color="#22D3EE" transparent opacity={0.05} side={BackSide} />
        </mesh>
      </group>
    </Float>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }}
      camera={{ position: [0, 0, 8.5], fov: 40 }}
      style={{ pointerEvents: 'none' }}
    >
      <GeoSphere />
      <Sparkles count={40} scale={[10, 9, 5]} size={2.3} speed={0.22} color="#22D3EE" opacity={0.5} />
    </Canvas>
  );
}
