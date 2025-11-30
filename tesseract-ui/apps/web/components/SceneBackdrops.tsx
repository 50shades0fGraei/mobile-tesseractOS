'use client';
import { Canvas } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import { useCore } from '@tesseract/core-state';

export function SceneBackdrops() {
  const { layer } = useCore();

  return (
    <div className="absolute inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 7], fov: 60 }}>
        {layer === 'PoP' && <Stars radius={80} depth={60} count={4000} factor={4} fade />}
        {layer === 'PeP' && <Stars radius={100} depth={80} count={8000} factor={2} saturation={0.4} fade />}
        {layer === 'PiP' && (
          <mesh>
            <planeGeometry args={[50, 50, 40, 40]} />
            <meshBasicMaterial wireframe color="#87f5ff" />
          </mesh>
        )}
      </Canvas>
    </div>
  );
}

