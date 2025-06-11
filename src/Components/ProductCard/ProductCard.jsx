import React from "react";
import { useDispatch } from "react-redux";
import { addItem } from "../../redux/cartSlice";
import "./ProductCard.css";

const ProductCard = ({ product, highlight }) => {
  const dispatch = useDispatch();

  return (
    <div className="product-card" onClick={() => dispatch(addItem(product))}>
      <img src={product.image} alt={product.name} className="product-image" />
      <div className="product-info">
        <h5 className="product-title">
          {highlight ? highlight(product.name) : product.name}
        </h5>
        <p className="product-cost">{product.cost}</p>
      </div>
      <button className="add-to-cart-btn">Add to Cart</button>
    </div>
  );
};

export default ProductCard;
