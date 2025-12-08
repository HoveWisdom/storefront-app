import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Navbar.css';

export const Navbar: React.FC = () => {
  const { cart } = useCart();
  const count = cart?.totalItems ?? 0;

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link to="/" className="brand">Storefront</Link>
        <nav className="nav">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/cart" className="nav-link">Cart <span className="cart-badge">{count}</span></Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;