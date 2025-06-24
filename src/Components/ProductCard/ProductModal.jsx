import React from "react";
import { Modal, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addItem } from "../../redux/cartSlice";
import "./ProductModal.css";

const ProductModal = ({ show, handleClose, product }) => {
  const dispatch = useDispatch();
  if (!product) return null;

  const handleAddToCart = () => {
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
            <strong>Stock:</strong> {stock}
          </p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="success" onClick={handleAddToCart}>
          Add to Cart
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProductModal;
