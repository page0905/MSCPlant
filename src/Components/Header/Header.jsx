import React, { useState } from "react";
import { useSelector } from "react-redux";
import { FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const items = useSelector((state) => state.cart.items);
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="header">
      <div className="container d-flex justify-content-between align-items-center py-3">
        <Link to="/" className="logo">
          MSC Plant
        </Link>

        <nav className={`nav-center ${menuOpen ? "open" : ""}`}>
          <Link to="/" onClick={() => setMenuOpen(false)}>
            Home
          </Link>
          <Link to="/plants" onClick={() => setMenuOpen(false)}>
            Plants
          </Link>
          <Link to="/contact" onClick={() => setMenuOpen(false)}>
            Contact
          </Link>
        </nav>

        <div className="right-icons">
          <Link to="/cart" className="cart-icon" aria-label="Cart">
            <FaShoppingCart size={24} />
            {totalQuantity > 0 && (
              <span className="cart-badge">{totalQuantity}</span>
            )}
          </Link>

          <button
            className="menu-toggle"
            aria-label="Toggle menu"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
