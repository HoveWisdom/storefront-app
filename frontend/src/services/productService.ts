import { Product } from '../types';
import * as api from './api';

export const productService = {
  getAll: (signal?: AbortSignal) => api.get<Product[]>('/products', signal),
  getById: (id: string) => api.get<Product>(`/products/${id}`)
};