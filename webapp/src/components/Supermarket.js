import React, { useEffect, useRef, useState } from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment } from "@react-three/drei";
import { ACESFilmicToneMapping, LinearSRGBColorSpace, Vector3 } from "three";
import products from "../data/Products";

//Camera Controls
function PlayerControls({ cartRef }) {
  const { camera } = useThree();
  const moveSpeed = 0.3; 
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
      cartRef.current.position.x = camera.position.x;
      cartRef.current.position.z = camera.position.z - 0.5;
    }
  });

  return null;
}

//Building
function Building() {
  const { scene } = useGLTF("../../assets/store.glb");
  return <primitive object={scene} position={[0, 0, 0]} scale={[1, 1, 1]} />;
}

//Cart Component
function Cart({ cartRef }) {
  const { scene } = useGLTF("../../assets/shopping_cart.glb");
  return <primitive object={scene} ref={cartRef} scale={[0.1, 0.1, 0.1]} />;
}

//Checkout Component
function Checkout({ onProceedToCheckout }) {
  const { scene } = useGLTF("../../assets/checkout.glb");
  return (
    <primitive
      object={scene}
      position={[0, 0, 0]}
      scale={[1, 1, 1]}
      onClick={onProceedToCheckout}
    />
  );
}

//Product Component
function Product({ scale, glbPath, position, name, price, onAddToCart }) {
  const { scene } = useGLTF(glbPath);

  const handleClick = () => {
    console.log(`Clicked on: ${name}`);
    onAddToCart({ name, price });
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

//Products Component
function Products({ onAddToCart }) {
  return (
    <>
      {products.map((product, index) =>
        product.positions.map((position, subIndex) => (
          <Product
            key={`${index}-${subIndex}`}
            glbPath={product.glbPath}
            position={position}
            name={product.name}
            price={product.price}
            onAddToCart={onAddToCart}
            scale={product.scale}
          />
        ))
      )}
    </>
  );
}

//Main Supermarket Component
export default function Supermarket() {
  const [cart, setCart] = useState([]);
  const [showCheckout, setShowCheckout] = useState(false);
  const cartRef = useRef();

  const handleAddToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  const handleRemoveFromCart = (index) => {
    setCart((prevCart) => prevCart.filter((_, i) => i !== index));
  };

  const handleProceedToCheckout = () => {
    setShowCheckout(true);
  };

  const closeCheckout = () => {
    setShowCheckout(false);
  };

  const checkoutHandler = () => {
    alert("Checkout process initiated");
    setShowCheckout(false);
  };

  const totalPrice = cart.reduce((total, item) => total + item.price, 0);

  return (
    <div style={{ height: "100vh" }}>
      <Canvas
        camera={{ position: [0, 2.5, 5], fov: 75 }}
        gl={{
          toneMapping: ACESFilmicToneMapping,
          outputColorSpace: LinearSRGBColorSpace,
        }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} />
        <Environment preset="warehouse" background />
        <PlayerControls cartRef={cartRef} />
        <Building />
        <Checkout onProceedToCheckout={handleProceedToCheckout} />
        <Cart cartRef={cartRef} />
        <Products onAddToCart={handleAddToCart} />
      </Canvas>
      <div
        style={{
          position: "absolute",
          top: 20,
          left: 20,
          padding: "15px",
          background: "rgba(0, 0, 0, 0.3)",
          borderRadius: "10px",
          color: "white",
          fontSize: "14px",
          backdropFilter: "blur(10px)",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
          minWidth: "350px",
        }}
      >
        <h3 style={{ margin: "0 0 10px 0", fontSize: "18px" }}>🛒 Cart</h3>
        {cart.length === 0 ? (
          <p style={{ fontSize: "14px", opacity: 0.7 }}>No items yet</p>
        ) : (
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {cart.map((item, index) => (
              <li
                key={index}
                style={{
                  fontSize: "14px",
                  padding: "5px 0",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                {item.name} - Rs {item.price.toFixed(2)}
                <button
                  onClick={() => handleRemoveFromCart(index)}
                  style={{
                    background: "none",
                    border: "1px solid white",
                    borderRadius: "12px",
                    color: "white",
                    cursor: "pointer",
                    fontSize: "12px",
                    padding: "4px 8px",
                  }}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
        <div style={{ marginTop: "10px", fontSize: "16px" }}>
          <strong>Total: Rs {totalPrice.toFixed(2)}</strong>
        </div>
      </div>
      {showCheckout && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            padding: "20px",
            background: "white",
            borderRadius: "10px",
            boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)",
            textAlign: "center",
            minWidth: "250px",
          }}
        >
          <h3>Proceed to Checkout</h3>
          <p>Your cart total: Rs {totalPrice.toFixed(2)}</p>
          <button
            onClick={checkoutHandler}
            style={{
              background: "#28a745",
              color: "white",
              border: "none",
              padding: "10px 20px",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "16px",
              marginTop: "10px",
            }}
          >
            Checkout
          </button>
          <button
            onClick={closeCheckout}
            style={{
              background: "#dc3545",
              color: "white",
              border: "none",
              padding: "10px 20px",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "16px",
              marginTop: "10px",
              marginLeft: "10px",
            }}
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}
