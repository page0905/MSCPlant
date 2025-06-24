import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeItem, updateQuantity } from "../../redux/cartSlice";
import "./CartItem.css";

const formatCost = (cost) => {
  if (!cost) return 0;
  return typeof cost === "string" ? parseFloat(cost.replace("$", "")) : cost;
};

const calculateItemTotal = (item) => {
  const quantity = item.quantity || 0;
  const cost = formatCost(item.cost);
  return quantity * cost;
};

const calculateCartTotal = (cart) =>
  Array.isArray(cart)
    ? cart.reduce((total, item) => total + calculateItemTotal(item), 0)
    : 0;

const CartItem = ({ onContinueShopping }) => {
  const [loading, setLoading] = useState(true);
  const cart = useSelector((state) =>
    Array.isArray(state.cart?.items) ? state.cart.items : []
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      console.log("Updated cart:", cart);
    }
    setLoading(false);
  }, [cart]);

  const handleQuantityChange = (item, delta) => {
    const newQuantity = item.quantity + delta;
    if (newQuantity <= 0) {
      dispatch(removeItem(item.name));
    } else {
      dispatch(updateQuantity({ name: item.name, quantity: newQuantity }));
    }
  };

  const handleRemove = (item) => {
    if (window.confirm(`Remove ${item.name} from cart?`)) {
      dispatch(removeItem(item.name));
    }
  };

  const handleCheckout = () => {
    alert("Checkout functionality coming soon!");
  };

  const handleContinue = (e) => {
    if (onContinueShopping) onContinueShopping(e);
  };

  const total = calculateCartTotal(cart).toFixed(2);

  return (
    <div className="cart-container" style={{ color: "var(--color-primary)" }}>
      <h2 className="cart-total-title">Total: ${total}</h2>

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-secondary" role="status" />
          <p className="mt-3 text-muted">Loading cart...</p>
        </div>
      ) : cart.length === 0 ? (
        <div className="text-center text-muted mt-4">Your cart is empty.</div>
      ) : (
        <>
          {cart.map((item) => (
            <div className="cart-item" key={item.name}>
              <img
                className="cart-item-image"
                src={process.env.PUBLIC_URL + item.image}
                alt={item.name}
              />

              <div className="cart-item-details">
                <div className="cart-item-name">{item.name}</div>
                <div className="cart-item-cost">{item.cost}</div>
                <div className="cart-item-quantity">
                  <button
                    className="cart-item-button cart-item-button-dec"
                    onClick={() => handleQuantityChange(item, -1)}
                    disabled={item.quantity <= 1}
                    aria-label={`Decrease quantity of ${item.name}`}
                  >
                    -
                  </button>
                  <span className="cart-item-quantity-value">
                    {item.quantity ?? 1}
                  </span>
                  <button
                    className="cart-item-button cart-item-button-inc"
                    onClick={() => handleQuantityChange(item, 1)}
                    aria-label={`Increase quantity of ${item.name}`}
                  >
                    +
                  </button>
                </div>
                <div className="cart-item-total">
                  Total: ${calculateItemTotal(item).toFixed(2)}
                </div>
                <button
                  className="cart-item-delete"
                  onClick={() => handleRemove(item)}
                  aria-label={`Remove ${item.name} from cart`}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}

          <div className="continue_shopping_btn">
            <button className="get-started-button" onClick={handleContinue}>
              Continue Shopping
            </button>
            <br />
            <button className="get-started-button1" onClick={handleCheckout}>
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartItem;
