import React from "react";
import "./ProductCard.css";

const ProductCard = ({ product, highlight, onClick }) => {
  const handleCardClick = () => {
    if (onClick) onClick(product);
  };

  return (
    <div className="product-card" onClick={handleCardClick}>
      <img
        src={process.env.PUBLIC_URL + product.image}
        alt={product.name}
        className="product-image"
      />
      <div className="product-info">
        <h5 className="product-title">
          {highlight ? highlight(product.name) : product.name}
        </h5>
        <p className="product-cost">{product.cost}</p>
      </div>
    </div>
  );
};

export default ProductCard;
