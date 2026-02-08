import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function Heart() {
  const mesh = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    mesh.current.rotation.y += 0.01;
    mesh.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.2;
  });

  const geometry = useMemo(() => {
    const shape = new THREE.Shape();

    shape.moveTo(0, 0);
    shape.bezierCurveTo(0, 0, -1.2, -1.2, -1.2, 0.5);
    shape.bezierCurveTo(-1.2, 1.6, 0, 2.2, 0, 3);
    shape.bezierCurveTo(0, 2.2, 1.2, 1.6, 1.2, 0.5);
    shape.bezierCurveTo(1.2, -1.2, 0, 0, 0, 0);

    const geo = new THREE.ExtrudeGeometry(shape, {
      depth: 0.6,
      bevelEnabled: true,
      bevelSize: 0.2,
      bevelThickness: 0.2,
    });

    geo.center();
    return geo;
  }, []);

  return (
    <mesh ref={mesh} geometry={geometry}>
      <meshStandardMaterial color="#ff3366" />
    </mesh>
  );
}
