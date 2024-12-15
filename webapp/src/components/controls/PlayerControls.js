import React, { useEffect, useRef, useState } from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Vector3 } from "three"; 

// --- First Person Camera Controls ---
export default function PlayerControls() {
  const { camera } = useThree();
  const moveSpeed = 0.2;
  const sensitivity = 0.002;

  const keys = useRef({
    forward: false,
    backward: false,
    left: false,
    right: false,
  });

  const pointerLocked = useRef(false);
  const yaw = useRef(0);
  const pitch = useRef(0);

  useEffect(() => {
    const togglePointerLock = (e) => {
      if (e.code === "KeyQ") {
        if (pointerLocked.current) {
          document.exitPointerLock();
        } else {
          document.body.requestPointerLock();
        }
      }
    };

    const handlePointerLockChange = () => {
      pointerLocked.current = document.pointerLockElement === document.body;
    };

    const handleMouseMove = (event) => {
      if (pointerLocked.current) {
        yaw.current -= event.movementX * sensitivity;
        pitch.current -= event.movementY * sensitivity;

        pitch.current = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, pitch.current));

        camera.rotation.order = "YXZ";
        camera.rotation.y = yaw.current;
        camera.rotation.x = pitch.current;
      }
    };

    window.addEventListener("keydown", togglePointerLock);
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("pointerlockchange", handlePointerLockChange);

    return () => {
      window.removeEventListener("keydown", togglePointerLock);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("pointerlockchange", handlePointerLockChange);
    };
  }, [camera]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === "KeyW") keys.current.forward = true;
      if (e.code === "KeyS") keys.current.backward = true;
      if (e.code === "KeyA") keys.current.left = true;
      if (e.code === "KeyD") keys.current.right = true;
    };

    const handleKeyUp = (e) => {
      if (e.code === "KeyW") keys.current.forward = false;
      if (e.code === "KeyS") keys.current.backward = false;
      if (e.code === "KeyA") keys.current.left = false;
      if (e.code === "KeyD") keys.current.right = false;
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  useFrame(() => {
    const direction = new Vector3();
    if (keys.current.forward) direction.z -= moveSpeed;
    if (keys.current.backward) direction.z += moveSpeed;
    if (keys.current.left) direction.x -= moveSpeed;
    if (keys.current.right) direction.x += moveSpeed;

    const moveVector = direction.applyQuaternion(camera.quaternion);

    camera.position.x += moveVector.x;
    camera.position.z += moveVector.z;
  });

  return null;
}