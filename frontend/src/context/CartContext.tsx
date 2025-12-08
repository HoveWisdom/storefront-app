import React, { createContext, useContext, useEffect, useState } from 'react';
import { CartDto, AddToCartRequest, UpdateCartRequest } from '../types';
import { cartService } from '../services/cartService';

type CartContextValue = {
  cart: CartDto | null;
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
  addToCart: (payload: AddToCartRequest) => Promise<void>;
  updateCart: (payload: UpdateCartRequest) => Promise<void>;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartDto | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refresh = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await cartService.getCart();
      setCart(data);
    } catch (err: any) {
      setError(err?.message ?? 'Failed to load cart');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // load initial cart
    refresh();
  }, []);

  const addToCart = async (payload: AddToCartRequest) => {
    setLoading(true);
    setError(null);
    try {
      const updated = await cartService.addToCart(payload);
      setCart(updated);
    } catch (err: any) {
      setError(err?.message ?? 'Failed to add to cart');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateCart = async (payload: UpdateCartRequest) => {
    setLoading(true);
    setError(null);
    try {
      const updated = await cartService.updateCart(payload);
      setCart(updated);
    } catch (err: any) {
      setError(err?.message ?? 'Failed to update cart');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return (
    <CartContext.Provider value={{ cart, loading, error, refresh, addToCart, updateCart }}>
      {children}
    </CartContext.Provider>
  );
};

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}