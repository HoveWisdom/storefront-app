import React, { useMemo, useState } from 'react';
import { ProductGrid } from '../components/ProductGrid';
import { CartPanel } from '../components/CartPanel';
import { useProducts } from '../hooks/useProducts';
import FilterBar from '../components/FilterBar';
import './Home.css';

export const Home: React.FC = () => {
  const { products, loading, error } = useProducts();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<string | undefined>(undefined);

  const categories = useMemo(() => {
    if (!products) return [];
    const set = new Set(products.map((p) => p.category ?? 'Uncategorized'));
    return Array.from(set);
  }, [products]);

  const filtered = useMemo(() => {
    if (!products) return null;
    return products.filter((p) => {
      const matchesCategory = category ? (p.category ?? 'Uncategorized') === category : true;
      const matchesSearch = search
        ? (p.name + ' ' + p.description + ' ' + (p.category ?? '')).toLowerCase().includes(search.toLowerCase())
        : true;
      return matchesCategory && matchesSearch;
    });
  }, [products, category, search]);

  return (
    <div className="layout">
      <main className="main">
        <header className="hero">
          <h1>Storefront</h1>
          <p>Simple storefront demo — browse products and add to cart</p>
        </header>

        <FilterBar
          categories={categories}
          selectedCategory={category}
          searchTerm={search}
          onCategoryChange={(c) => setCategory(c)}
          onSearchChange={(s) => setSearch(s)}
        />

        <ProductGrid products={filtered} />
      </main>
      <CartPanel />
    </div>
  );
};

export default Home;