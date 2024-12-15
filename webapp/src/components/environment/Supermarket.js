import React from "react";
import { useGLTF } from "@react-three/drei";

export default function Supermarket() {
  const { scene } = useGLTF("../assets/store_shelves.glb");

  return (
    <>
      <primitive object={scene.clone()} position={[-5, 0, 5]} scale={1.5} />
      <primitive object={scene.clone()} position={[5, 0, 5]} scale={1.5} />
    </>
  );
}
