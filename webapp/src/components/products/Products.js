import React from "react";
import Product from "./Product";

export default function Products({ onAddToCart }) {
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
