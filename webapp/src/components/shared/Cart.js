import React from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { Vector3 } from "three"; // Import Vector3 from three.js

export default function Cart() {
  const { camera } = useThree();
  const { scene } = useGLTF("../assets/a.glb"); // Ensure the model is in the public folder.

  const cartRef = React.useRef();

  useFrame(() => {
    if (cartRef.current) {
      // Position the cart relative to the camera
      const offset = new Vector3(0, -0.5, -1); // [x, y, z] offset
      const direction = new Vector3();
      camera.getWorldDirection(direction);
      
      const cartPosition = camera.position.clone().add(direction.multiplyScalar(offset.z));
      cartPosition.y += offset.y;
      cartPosition.x += offset.x;

      cartRef.current.position.copy(cartPosition);
      cartRef.current.rotation.copy(camera.rotation); // Align the cart with the camera's rotation
    }
  });

  return <primitive ref={cartRef} object={scene} />;
}
