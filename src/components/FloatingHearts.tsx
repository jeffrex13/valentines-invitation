import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

type FloatingHeartsProps = {
  count: number;
};

// Avoid impure Math.random() calls
function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function getRandomColor(index: number): THREE.Color {
  const r = 0.8 + seededRandom(index * 0.1) * 0.2;
  const g = 0.2 + seededRandom(index * 0.2) * 0.3;
  const b = 0.4 + seededRandom(index * 0.3) * 0.3;
  return new THREE.Color(r, g, b);
}

function getRandomPosition(index: number): [number, number, number] {
  const x = (seededRandom(index * 0.4) - 0.5) * 10;
  const y = (seededRandom(index * 0.5) - 0.5) * 10;
  const z = (seededRandom(index * 0.6) - 0.5) * 6;
  return [x, y, z];
}

export default function FloatingHearts({ count }: FloatingHeartsProps) {
  const group = useRef<THREE.Group>(null!);
  const hearts = useRef<THREE.Mesh[]>([]);

  // Pre-generate deterministic colors and positions
  const { colors, initialPositions } = useMemo(() => {
    const colors: THREE.Color[] = [];
    const initialPositions: [number, number, number][] = [];

    for (let i = 0; i < count; i++) {
      colors.push(getRandomColor(i));
      initialPositions.push(getRandomPosition(i));
    }

    return { colors, initialPositions };
  }, [count]);

  useFrame((state) => {
    if (!group.current) return;

    hearts.current.forEach((heart, i) => {
      if (!heart) return;

      const time = state.clock.elapsedTime;
      const speed = 0.5 + i * 0.05;
      const radius = 3 + Math.sin(time * 0.5 + i) * 0.5;
      const basePosition = initialPositions[i];

      heart.position.x =
        basePosition[0] + Math.cos(time * speed + i) * radius * 0.3;
      heart.position.y =
        basePosition[1] + Math.sin(time * speed * 1.2 + i) * radius * 0.3;
      heart.position.z = basePosition[2] + Math.sin(time * speed * 0.7 + i) * 1;

      heart.rotation.x = time * 0.5;
      heart.rotation.y = time * 0.3;
      heart.rotation.z = time * 0.4;

      heart.scale.setScalar(0.15 + Math.sin(time + i) * 0.05);
    });
  });

  return (
    <group ref={group}>
      {Array.from({ length: count }).map((_, i) => (
        <mesh
          key={i}
          ref={(el) => {
            if (el) hearts.current[i] = el;
          }}
          geometry={createHeartGeometry()}
          material={
            new THREE.MeshStandardMaterial({
              color: colors[i],
              emissive: colors[i].clone().multiplyScalar(1.5),
              emissiveIntensity: 0.2,
              roughness: 0.3,
              metalness: 0.2,
            })
          }
          position={initialPositions[i]}
        />
      ))}
    </group>
  );
}

// Heart geometry with memoization
function createHeartGeometry() {
  const shape = new THREE.Shape();

  const x = 0,
    y = 0;
  const size = 1;

  shape.moveTo(x, y + size / 4);
  shape.bezierCurveTo(x, y, x - size / 2, y, x - size / 2, y + size / 4);
  shape.bezierCurveTo(
    x - size / 2,
    y + size / 2,
    x,
    y + size * 0.75,
    x,
    y + size
  );
  shape.bezierCurveTo(
    x,
    y + size * 0.75,
    x + size / 2,
    y + size / 2,
    x + size / 2,
    y + size / 4
  );
  shape.bezierCurveTo(x + size / 2, y, x, y, x, y + size / 4);

  const geometry = new THREE.ExtrudeGeometry(shape, {
    depth: 0.1,
    bevelEnabled: true,
    bevelSize: 0.05,
    bevelThickness: 0.05,
  });

  geometry.center();
  return geometry;
}
