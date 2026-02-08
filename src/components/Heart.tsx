import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function Heart() {
  const mesh = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    if (!mesh.current) return;
    mesh.current.rotation.y = state.clock.elapsedTime * 0.3;
  });

  const geometry = useMemo(() => {
    // Create vertices for a simple heart
    const vertices = [];

    // Generate heart vertices
    for (let i = 0; i < Math.PI * 2; i += 0.1) {
      const t = i;
      const x = 16 * Math.pow(Math.sin(t), 3);
      const y =
        13 * Math.cos(t) -
        5 * Math.cos(2 * t) -
        2 * Math.cos(3 * t) -
        Math.cos(4 * t);
      vertices.push(new THREE.Vector2(x * 0.03, y * 0.03));
    }

    const shape = new THREE.Shape(vertices);

    const geo = new THREE.ExtrudeGeometry(shape, {
      depth: 0.2,
      bevelEnabled: true,
      bevelSize: 0.05,
      bevelThickness: 0.1,
    });

    geo.center();

    // // Flip it upright
    // geo.rotateX(Math.PI);

    return geo;
  }, []);

  return (
    <mesh ref={mesh} geometry={geometry}>
      <meshPhysicalMaterial
        color="#ff3366"
        roughness={0.1}
        metalness={0.8}
        clearcoat={1}
        clearcoatRoughness={0}
        emissive="#ff3366"
        emissiveIntensity={0.3}
      />
    </mesh>
  );
}
