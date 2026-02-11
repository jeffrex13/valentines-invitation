import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls, Stars } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import FloatingHearts from "./FloatingHearts";

export default function HeartScene() {
  return (
    <>
      <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
        <color attach="background" args={["#0a0a1a"]} />

        {/* Romantic starry background */}
        <Stars
          radius={100}
          depth={50}
          count={5000}
          factor={4}
          saturation={0}
          fade
        />

        {/* Ambient romantic lighting */}
        <ambientLight intensity={0.5} color="#ffccdd" />
        <directionalLight
          position={[10, 10, 5]}
          intensity={1.5}
          color="#ff99cc"
          castShadow
        />
        <pointLight position={[-5, -3, 2]} intensity={2} color="#ff3366" />

        {/* Additional glowing point lights for romance */}
        <pointLight position={[4, 3, 1]} intensity={1} color="#ff99ff" />

        {/* Floating hearts particles */}
        <FloatingHearts count={15} />

        {/* Environment for reflections */}
        <Environment preset="sunset" />

        {/* Glow effect */}
        <EffectComposer>
          <Bloom
            intensity={2}
            luminanceThreshold={0.1}
            luminanceSmoothing={0.9}
          />
        </EffectComposer>

        <OrbitControls
          enableZoom={true}
          enablePan={false}
          minDistance={3}
          maxDistance={15}
          autoRotate={true}
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </>
  );
}
