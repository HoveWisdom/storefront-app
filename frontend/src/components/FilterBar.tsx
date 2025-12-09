import React from 'react';
import './FilterBar.css';

type Props = {
  categories: string[];
  selectedCategory?: string;
  searchTerm?: string;
  onCategoryChange: (category?: string) => void;
  onSearchChange: (value: string) => void;
};

export const FilterBar: React.FC<Props> = ({ categories, selectedCategory, searchTerm, onCategoryChange, onSearchChange }) => {
  return (
    <div className="filter-bar container">
      <div className="filter-left">
        <input
          className="search"
          aria-label="Search products"
          placeholder="Search products..."
          value={searchTerm ?? ''}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <div className="filter-right">
        <select
          aria-label="Filter by category"
          value={selectedCategory ?? ''}
          onChange={(e) => onCategoryChange(e.target.value || undefined)}
        >
          <option value="">All categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default FilterBar;