import React from "react";

export default function Building() {
  return (
    <>
      <mesh position={[0, -0.5, 0]}>
        <boxGeometry args={[200, 1, 20]} />
        <meshStandardMaterial color="gray" />
      </mesh>
      <mesh position={[0, 2.5, -10]}>
        <boxGeometry args={[200, 5, 1]} />
        <meshStandardMaterial color="lightblue" />
      </mesh>
      <mesh position={[0, 5, 0]}>
        <boxGeometry args={[200, 1, 20]} />
        <meshStandardMaterial color="lightgray" />
      </mesh>
    </>
  );
}
