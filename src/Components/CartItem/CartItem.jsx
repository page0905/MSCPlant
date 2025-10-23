import { useCallback, useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeItem, updateQuantity } from "../../redux/cartSlice";
import { formatCurrency, parsePriceToNumber } from "../../utils/price";
import "./CartItem.css";

const calculateItemTotal = (item) => {
  const quantity = Number(item?.quantity) || 0;
  const unitPrice = parsePriceToNumber(item?.priceValue ?? item?.cost);
  return quantity * unitPrice;
};

const calculateCartTotal = (cart) =>
  Array.isArray(cart)
    ? cart.reduce((total, item) => total + calculateItemTotal(item), 0)
    : 0;

const CartItem = ({ onContinueShopping }) => {
  const [loading, setLoading] = useState(true);
  const [checkoutRequested, setCheckoutRequested] = useState(false);
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

  useEffect(() => {
    if (!checkoutRequested) return;
    const timeout = window.setTimeout(() => {
      setCheckoutRequested(false);
    }, 4000);
    return () => window.clearTimeout(timeout);
  }, [checkoutRequested]);

  const totals = useMemo(() => {
    const totalValue = calculateCartTotal(cart);
    const totalQuantity = cart.reduce(
      (sum, item) => sum + (Number(item?.quantity) || 0),
      0
    );

    return {
      totalValue,
      formattedTotal: formatCurrency(totalValue),
      totalQuantity,
    };
  }, [cart]);

  const handleQuantityChange = useCallback(
    (item, delta) => {
      if (!item) return;

      const currentQuantity = Number(item.quantity) || 0;
      const maxQuantity = Number.isFinite(item.stock) ? item.stock : Infinity;
      const nextQuantity = Math.min(
        Math.max(currentQuantity + delta, 0),
        maxQuantity
      );

      if (nextQuantity <= 0) {
        dispatch(removeItem(item.name));
        return;
      }

      if (nextQuantity === currentQuantity) return;

      dispatch(updateQuantity({ name: item.name, quantity: nextQuantity }));
    },
    [dispatch]
  );

  const handleRemove = useCallback(
    (item) => {
      if (!item) return;
      const confirmed = window.confirm(`Remove ${item.name} from cart?`);
      if (confirmed) dispatch(removeItem(item.name));
    },
    [dispatch]
  );

  const handleCheckout = useCallback(() => {
    setCheckoutRequested(true);
  }, []);

  const handleContinue = useCallback(
    (event) => {
      if (onContinueShopping) onContinueShopping(event);
    },
    [onContinueShopping]
  );

  const hasItems = cart.length > 0;

  return (
    <div className="cart-container" style={{ color: "var(--color-primary)" }}>
      <div className="cart-summary">
        <h2 className="cart-heading">Your Cart</h2>
        <p className="cart-total-title" aria-live="polite">
          {totals.formattedTotal}
          <span className="cart-total-caption">
            {` • ${totals.totalQuantity} item${
              totals.totalQuantity === 1 ? "" : "s"
            }`}
          </span>
        </p>
      </div>

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-secondary" role="status" />
          <p className="mt-3 text-muted">Loading cart...</p>
        </div>
      ) : !hasItems ? (
        <div className="cart-empty" role="status">
          Your cart is empty.
        </div>
      ) : (
        <>
          <ul className="cart-items-wrapper">
            {cart.map((item) => {
              const unitPrice = parsePriceToNumber(
                item?.priceValue ?? item?.cost
              );
              const formattedUnitPrice =
                item?.cost || formatCurrency(unitPrice);
              const itemTotal = calculateItemTotal(item);
              const formattedItemTotal = formatCurrency(itemTotal);
              const quantity = Number(item?.quantity) || 0;
              const isDecreaseDisabled = quantity <= 1;
              const isIncreaseDisabled = Number.isFinite(item?.stock)
                ? quantity >= item.stock
                : false;
              const remainingStock = Number.isFinite(item?.stock)
                ? item.stock - quantity
                : null;

              return (
                <li className="cart-item" key={item.name}>
                  <img
                    className="cart-item-image"
                    src={process.env.PUBLIC_URL + item.image}
                    alt={item.name}
                  />

                  <div className="cart-item-details">
                    <div>
                      <div className="cart-item-name">{item.name}</div>
                      <div className="cart-item-cost">{formattedUnitPrice}</div>
                    </div>

                    <div
                      className="cart-item-quantity"
                      aria-label={`Quantity of ${item.name}`}
                    >
                      <button
                        className="cart-item-button cart-item-button-dec"
                        onClick={() => handleQuantityChange(item, -1)}
                        disabled={isDecreaseDisabled}
                        aria-label={`Decrease quantity of ${item.name}`}
                      >
                        -
                      </button>
                      <span
                        className="cart-item-quantity-value"
                        aria-live="polite"
                      >
                        {quantity || 1}
                      </span>
                      <button
                        className="cart-item-button cart-item-button-inc"
                        onClick={() => handleQuantityChange(item, 1)}
                        disabled={isIncreaseDisabled}
                        aria-label={`Increase quantity of ${item.name}`}
                      >
                        +
                      </button>
                    </div>

                    <div
                      className="cart-item-total"
                      aria-label={`Item total for ${item.name}`}
                    >
                      {formattedItemTotal}
                    </div>

                    {Number.isFinite(remainingStock) && remainingStock <= 2 && (
                      <p className="cart-item-stock-note" role="status">
                        {remainingStock > 0
                          ? `Only ${remainingStock} left in stock`
                          : "No additional stock available"}
                      </p>
                    )}

                    <button
                      className="cart-item-delete"
                      onClick={() => handleRemove(item)}
                      aria-label={`Remove ${item.name} from cart`}
                    >
                      Remove
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>

          <div className="cart-actions">
            <button className="get-started-button" onClick={handleContinue}>
              Continue Shopping
            </button>
            <button
              className="get-started-button1"
              onClick={handleCheckout}
              disabled={!hasItems}
            >
              Checkout
            </button>
          </div>

          {checkoutRequested && (
            <div
              className="alert alert-info cart-checkout-notice"
              role="status"
            >
              Checkout is coming soon. We will notify you once it is ready!
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CartItem;
