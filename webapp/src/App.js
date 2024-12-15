import React, { useEffect, useRef, useState } from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Vector3 } from "three";

// --- First Person Camera Controls ---
function PlayerControls({ cartRef }) {
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

    if (cartRef.current) {
      cartRef.current.position.x = camera.position.x; // Align with player's X position
      cartRef.current.position.z = camera.position.z - 0.5; // Move closer to the player on the Z-axis
    }
  });

  return null;
}

// --- Building (Static Elements) ---
function Building() {
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

// --- Supermarket Area ---
function Supermarket() {
  const { scene } = useGLTF("../assets/store_shelves.glb"); // Replace with the actual path to your .glb file

  return (
    <>
      <primitive object={scene.clone()} position={[-5, 0, 5]} scale={1.5} />
      <primitive object={scene.clone()} position={[5, 0, 5]} scale={1.5} />
    </>
  );
}

// --- Cart Component ---
function Cart({ cartRef }) {
  const { scene } = useGLTF("../assets/shopping_cart.glb"); // Replace with the actual path to your cart.glb file

  return <primitive object={scene} ref={cartRef} scale={[0.5, 0.5, 0.5]} />;
}

// --- Product Component ---
function Product({ scale, glbPath, position, name, onAddToCart }) {
  const { scene } = useGLTF(glbPath);

  const handleClick = () => {
    console.log(`Clicked on: ${name}`);
    onAddToCart(name);
  };

  return (
    <primitive
      object={scene.clone()} // Clone the scene to create a new instance
      position={position}
      scale={scale}
      onClick={handleClick}
    />
  );
}

// --- Products Component ---
function Products({ onAddToCart }) {
  const products = [
    {
      name: "Milk",
      glbPath: "../assets/a.glb",
      positions: [
        [-5.3, 1.9, 5],
        [-1, 1, 5],
      ],
      scale: [0.5, 0.5, 0.5],
    },
  ];

  return (
    <>
      {products.map((product, index) =>
        product.positions.map((position, subIndex) => (
          <Product
            key={`${index}-${subIndex}`}
            glbPath={product.glbPath}
            position={position}
            name={product.name}
            onAddToCart={onAddToCart}
            scale={product.scale}
          />
        ))
      )}
    </>
  );
}

export default function App() {
  const [cart, setCart] = useState([]);
  const cartRef = useRef();

  const handleAddToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  return (
    <div style={{ height: "100vh" }}>
      <Canvas camera={{ position: [0, 2, 5], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} />
        <PlayerControls cartRef={cartRef} />
        <Building />
        <Supermarket />
        <Cart cartRef={cartRef} />
        <Products onAddToCart={handleAddToCart} />
      </Canvas>
      <div
        style={{
          position: "absolute",
          top: 10,
          left: 10,
          color: "white",
          fontSize: "16px",
        }}
      >
        Cart: {cart.join(", ")}
      </div>
    </div>
  );
}
