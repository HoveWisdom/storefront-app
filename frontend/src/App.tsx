import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './Pages/Home';
import { CartProvider } from './context/CartContext';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <CartProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* Future routes: /products/:id, /checkout, /search */}
        </Routes>
      </CartProvider>
    </BrowserRouter>
  );
};

export default App;
