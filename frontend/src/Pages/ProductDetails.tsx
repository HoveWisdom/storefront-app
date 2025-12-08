import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Product } from '../types';
import { productService } from '../services/productService';
import { useCart } from '../context/CartContext';
import './ProductDetails.css';
import { Link } from 'react-router-dom';

export const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const { addToCart } = useCart();

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    productService.getById(id)
      .then((p) => setProduct(p))
      .catch((e) => setError(e.message || 'Product not found'))
      .finally(() => setLoading(false));
  }, [id]);

  const onAdd = async () => {
    if (!product) return;
    try {
      await addToCart({ productId: product.id, quantity: qty });
    } catch (e: any) {
      setError(e?.message ?? 'Failed to add to cart');
    }
  };

  if (loading) return <div className="container">Loading…</div>;
  if (error) return <div className="container error">{error}</div>;
  if (!product) return <div className="container">Product not found</div>;

  return (
    <div className="container details">
      <div className="back-row"><Link to="/">← Back to products</Link></div>
      <div className="details-grid">
        <div className="media">
          <img src={product.imageUrl ?? '/placeholder.png'} alt={product.name} />
        </div>
        <div className="meta">
          <h1>{product.name}</h1>
          <p className="desc">{product.description}</p>
          <div className="price-stock">
            <div className="price">${product.price.toFixed(2)}</div>
            <div className="stock">{product.stock} in stock</div>
          </div>
          <div className="actions">
            <input type="number" min={1} max={product.stock} value={qty} onChange={(e) => setQty(Math.max(1, Number(e.target.value)))} />
            <button onClick={onAdd} disabled={product.stock === 0}>Add to cart</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;