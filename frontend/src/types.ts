export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl?: string | null;
  stock: number;
  category?: string | null;
}

export interface CartItemDto {
  productId: string;
  name: string;
  unitPrice: number;
  quantity: number;
  total: number;
}

export interface CartDto {
  id: string;
  items: CartItemDto[];
  totalItems: number;
  subtotal: number;
}

export interface AddToCartRequest {
  productId: string;
  quantity: number;
}

export interface UpdateCartRequest {
  productId: string;
  quantity: number;
}