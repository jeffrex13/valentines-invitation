import { Canvas } from "@react-three/fiber";
import Heart from "./Heart";

type HeartSceneProps = {
  showMessage: boolean;
};

export default function HeartScene({ showMessage }: HeartSceneProps) {
  return (
    <>
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={0.8} />
        <pointLight position={[5, 5, 5]} />
        <Heart />
      </Canvas>

      {showMessage && (
        <div className="message">Will you be my Valentine? 🌹</div>
      )}
    </>
  );
}
