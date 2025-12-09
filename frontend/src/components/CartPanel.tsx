import React from 'react';
import { useCart } from '../context/CartContext';
import './CartPanel.css';

export const CartPanel: React.FC = () => {
  const { cart, loading, updateCart } = useCart();

  const onChangeQty = (productId: string, qty: number) => {
    updateCart({ productId, quantity: qty }).catch(() => {});
  };

  if (loading && !cart) {
    return <aside className="cart-panel">Loading cart…</aside>;
  }

  return (
    <aside className="cart-panel" aria-label="Shopping cart">
      <h2>Cart</h2>
      {!cart || cart.items.length === 0 ? (
        <div className="empty">Your cart is empty</div>
      ) : (
        <>
          <ul className="items">
            {cart.items.map((it) => (
              <li key={it.productId} className="item">
                <div className="item-info">
                  <div className="item-name">{it.name}</div>
                  <div className="item-price">${it.unitPrice.toFixed(2)}</div>
                </div>
                <div className="item-actions">
                  <input
                    type="number"
                    min={0}
                    value={it.quantity}
                    onChange={(e) => onChangeQty(it.productId, Math.max(0, Number(e.target.value)))}
                  />
                  <div className="item-total">${it.total.toFixed(2)}</div>
                </div>
              </li>
            ))}
          </ul>
          <div className="summary">
            <div>Items: {cart.totalItems}</div>
            <div>Subtotal: ${cart.subtotal.toFixed(2)}</div>
          </div>
        </>
      )}
    </aside>
  );
};