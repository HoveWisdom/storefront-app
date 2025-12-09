import React from 'react';
import { useProducts } from '../hooks/useProducts';
import { Product } from '../types';
import { ProductCard } from './ProductCard';
import './ProductGrid.css';

type Props = {
  products?: Product[] | null;
};

export const ProductGrid: React.FC<Props> = ({ products: productsProp }) => {
  const { products: fetched, loading, error } = useProducts();
  const products = productsProp ?? fetched;
  if (loading && !products) return <div className="center">Loading products…</div>;
  if (error && !products) return <div className="center error">{error}</div>;
  if (!products || products.length === 0) return <div className="center">No products found.</div>;

  return (
    <section className="grid">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </section>
  );
};

export default ProductGrid;