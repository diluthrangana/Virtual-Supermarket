import React from "react";
import { useGLTF } from "@react-three/drei";

export default function Product({ scale, glbPath, position, name, onAddToCart }) {
  const { scene } = useGLTF(glbPath);

  const handleClick = () => {
    console.log(`Clicked on: ${name}`);
    onAddToCart(name);
  };

  return (
    <primitive
      object={scene.clone()}
      position={position}
      scale={scale}
      onClick={handleClick}
    />
  );
}
