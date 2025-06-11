import React from "react";
import CartItem from "../../Components/CartItem/CartItem.jsx";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();

  const handleContinueShopping = () => {
    navigate("/plants");
  };

  return (
    <div>
      <h1 style={{ textAlign: "center", margin: "20px 0" }}>
        Your Shopping Cart
      </h1>
      <CartItem onContinueShopping={handleContinueShopping} />
    </div>
  );
};

export default Cart;
