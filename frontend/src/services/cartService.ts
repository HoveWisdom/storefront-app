import { AddToCartRequest, CartDto, UpdateCartRequest } from '../types';
import * as api from './api';

export const cartService = {
  getCart: () => api.get<CartDto>('/cart'),
  addToCart: (payload: AddToCartRequest) => api.post<CartDto>('/cart', payload),
  updateCart: (payload: UpdateCartRequest) => api.patch<CartDto>('/cart', payload)
};