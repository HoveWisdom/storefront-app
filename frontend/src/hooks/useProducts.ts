import { useEffect, useState } from 'react';
import { Product } from '../types';
import { productService } from '../services/productService';

export function useProducts() {
  const [products, setProducts] = useState<Product[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    productService.getAll(controller.signal)
      .then((data) => setProducts(data))
      .catch((err) => {
        if (err.name !== 'AbortError') setError(err.message || 'Failed to load products');
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, []);

  return { products, loading, error };
}
 