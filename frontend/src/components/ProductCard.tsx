import React, { useState } from 'react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import './ProductCard.css';
import { Link } from 'react-router-dom';

export const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const { addToCart } = useCart();
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onAdd = async () => {
    setLoading(true);
    setError(null);
    try {
      await addToCart({ productId: product.id, quantity: qty });
    } catch (err: any) {
      setError(err?.message ?? 'Could not add item');
    } finally {
      setLoading(false);
    }
  };

  return (
    <article className="card" aria-labelledby={`product-${product.id}`}>
      <Link to={`/products/${product.id}`} className="card-media-link">
        <img
          src={product.imageUrl ?? '/placeholder.png'}
          alt={product.name}
          className="card-image"
        />
      </Link>
      <div className="card-body">
        <h3 id={`product-${product.id}`} className="card-title">
          <Link to={`/products/${product.id}`} className="card-title-link">{product.name}</Link>
        </h3>
        <p className="card-desc">{product.description}</p>
        <div className="card-meta">
          <strong className="price">${product.price.toFixed(2)}</strong>
          <span className="stock">{product.stock} in stock</span>
        </div>
        <div className="card-actions">
          <input
            aria-label={`Quantity for ${product.name}`}
            type="number"
            min={1}
            max={product.stock}
            value={qty}
            onChange={(e) => setQty(Math.max(1, Number(e.target.value)))}
          />
          <button onClick={onAdd} disabled={loading || product.stock === 0}>
            {loading ? 'Adding...' : 'Add to cart'}
          </button>
        </div>
        {error && <div className="error">{error}</div>}
      </div>
    </article>
  );
};