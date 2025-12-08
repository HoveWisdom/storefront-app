import React from 'react';
import { ProductGrid } from '../components/ProductGrid';
import { CartPanel } from '../components/CartPanel';
import './Home.css';

export const Home: React.FC = () => {
  return (
    <div className="layout">
      <main className="main">
        <header className="hero">
          <h1>Storefront</h1>
          <p>Simple storefront demo — browse products and add to cart</p>
        </header>
        <ProductGrid />
      </main>
      <CartPanel />
    </div>
  );
};