import React from 'react';
import { useProducts } from '../hooks/useProducts';
import { ProductCard } from './ProductCard';
import './ProductGrid.css';

export const ProductGrid: React.FC = () => {
  const { products, loading, error } = useProducts();

  if (loading) return <div className="center">Loading products…</div>;
  if (error) return <div className="center error">{error}</div>;
  if (!products || products.length === 0) return <div className="center">No products found.</div>;

  return (
    <section className="grid">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </section>
  );
};