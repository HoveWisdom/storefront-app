import React from 'react';
import { CartPanel } from '../components/CartPanel';
import './CartPage.css';

const CartPage: React.FC = () => {
  return (
    <div className="cart-page container">
      <h1>Your Cart</h1>
      <div className="cart-page-content">
        <CartPanel />
        <div className="cart-placeholder">
          {/* Here you can add checkout flows, totals breakdown, promotions, etc. */}
        </div>
      </div>
    </div>
  );
};

export default CartPage;