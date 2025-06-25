import React, { useState } from "react";
import { useSelector } from "react-redux";
import { FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const items = useSelector((state) => state.cart.items);
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      {/* HEADER luôn nằm trên cùng */}
      <header className="header">
        <div className="header-container">
          <Link to="/" className="logo">
            MSC Plant
          </Link>

          <nav className="nav-center d-none d-md-flex">
            <Link to="/">Home</Link>
            <Link to="/plants">Plants</Link>
            <Link to="/contact">Contact</Link>
          </nav>

          <div className="right-icons">
            <Link to="/cart" className="cart-icon" aria-label="Cart">
              <FaShoppingCart size={24} />
              {totalQuantity > 0 && (
                <span className="cart-badge">{totalQuantity}</span>
              )}
            </Link>

            <button
              className="menu-toggle d-md-none"
              aria-label="Toggle menu"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer + Overlay phải nằm ngoài <header> */}
      <div className={`mobile-panel ${menuOpen ? "show" : ""}`}>
        <ul className="panel-nav-list">
          <li>
            <Link to="/" className="nav-link" onClick={closeMenu}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/plants" className="nav-link" onClick={closeMenu}>
              Plants
            </Link>
          </li>
          <li>
            <Link to="/contact" className="nav-link" onClick={closeMenu}>
              Contact
            </Link>
          </li>
        </ul>
      </div>

      {menuOpen && <div className="drawer-overlay" onClick={closeMenu}></div>}
    </>
  );
};

export default Header;
