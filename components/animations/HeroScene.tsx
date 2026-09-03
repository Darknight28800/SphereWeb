'use client';

/**
 * HeroScene — élément 3D discret pour le fond du hero (three.js via r3f).
 * Un icosaèdre filaire qui tourne lentement + quelques particules scintillantes.
 * Volontairement très peu contrasté : il complète HeroSphere / ParticleField
 * sans les concurrencer.
 *
 * Ce fichier n'est jamais dans le bundle initial : il est importé par
 * HeroBackground3D via next/dynamic (ssr: false). Ne pas l'importer directement.
 */

import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sparkles } from '@react-three/drei';
import { useRef } from 'react';
import type { Mesh } from 'three';

function WireframeShape() {
  const mesh = useRef<Mesh>(null);
  useFrame((_, delta) => {
    if (!mesh.current) return;
    mesh.current.rotation.x += delta * 0.05;
    mesh.current.rotation.y += delta * 0.08;
  });
  return (
    <Float speed={1.1} rotationIntensity={0.4} floatIntensity={0.6}>
      <mesh ref={mesh} scale={2.6}>
        <icosahedronGeometry args={[1, 1]} />
        <meshBasicMaterial color="#5B3DF6" wireframe transparent opacity={0.22} />
      </mesh>
    </Float>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }}
      camera={{ position: [0, 0, 6], fov: 45 }}
      style={{ pointerEvents: 'none' }}
    >
      <WireframeShape />
      <Sparkles count={26} scale={9} size={2.4} speed={0.3} color="#22D3EE" opacity={0.5} />
    </Canvas>
  );
}
