import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import ProductDetails from './Pages/ProductDetails';
import CartPage from './Pages/CartPage';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <CartProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<CartPage />} />
          {/* Future routes: /checkout */}
        </Routes>
      </CartProvider>
    </BrowserRouter>
  );
};

export default App;
