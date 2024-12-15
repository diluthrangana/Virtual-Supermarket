import React from "react";

export default function CartDisplay({ cart }) {
  return (
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
  );
}
