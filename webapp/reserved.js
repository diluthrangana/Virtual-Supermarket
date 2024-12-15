import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import PlayerControls from "./components/controls/PlayerControls";
import Building from "./components/environment/Building";
import Supermarket from "./components/environment/Supermarket";
import Products from "./components/products/Products";
import CartDisplay from "./components/shared/CartDisplay";

export default function App() {
  const [cart, setCart] = useState([]);

  const handleAddToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  return (
    <div style={{ height: "100vh" }}>
      <Canvas camera={{ position: [0, 2, 5], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} />
        <PlayerControls />
        <Building />
        <Supermarket />
        <Products onAddToCart={handleAddToCart} />
      </Canvas>
      <CartDisplay cart={cart} />
    </div>
  );
}
