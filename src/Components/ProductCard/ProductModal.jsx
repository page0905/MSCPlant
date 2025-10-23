import React from "react";
import { Modal, Button, Badge } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addItem } from "../../redux/cartSlice";
import "./ProductModal.css";

const ProductModal = ({ show, handleClose, product }) => {
  const dispatch = useDispatch();
  if (!product) return null;

  const numericStock = Number.isFinite(product?.stock) ? product.stock : null;
  const isOutOfStock = numericStock !== null ? numericStock <= 0 : false;
  const isLowStock =
    numericStock !== null && numericStock > 0 && numericStock <= 5;

  const handleAddToCart = () => {
    if (isOutOfStock) {
      return;
    }
    dispatch(addItem(product));
    handleClose();
  };

  const {
    name,
    image,
    cost,
    category,
    subcategory,
    description,
    sunlight,
    watering,
    petFriendly,
    stock,
  } = product;

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="modal-body-content">
          <img
            src={process.env.PUBLIC_URL + product.image}
            alt={product.name}
            className="img-fluid rounded modal-image mb-3"
          />
          <div className="modal-badges">
            <Badge bg={isOutOfStock ? "danger" : "success"} className="me-2">
              {isOutOfStock
                ? "Out of stock"
                : numericStock !== null
                ? `In stock: ${numericStock}`
                : "In stock"}
            </Badge>
            <Badge bg={petFriendly ? "success" : "secondary"}>
              {petFriendly ? "Pet friendly" : "Pet caution"}
            </Badge>
          </div>
          <p>
            <strong>Category:</strong> {category}
          </p>
          <p>
            <strong>Subcategory:</strong> {subcategory}
          </p>
          <p>
            <strong>Price:</strong> {cost}
          </p>
          <p>
            <strong>Description:</strong> {description}
          </p>
          <p>
            <strong>Sunlight:</strong> {sunlight}
          </p>
          <p>
            <strong>Watering:</strong> {watering}
          </p>
          <p>
            <strong>Pet Friendly:</strong> {petFriendly ? "Yes 🐾" : "No ❌"}
          </p>
          <p>
            <strong>Stock:</strong>{" "}
            {numericStock !== null ? numericStock : "Available"}
          </p>
          {isLowStock && (
            <p className="modal-low-stock" role="status">
              Only {numericStock} left — order soon!
            </p>
          )}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button
          variant="success"
          onClick={handleAddToCart}
          disabled={isOutOfStock}
        >
          Add to Cart
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProductModal;
