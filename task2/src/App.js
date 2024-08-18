import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductList from './ProductList';
import ProductDetail from './ProductDetail';

const App = () => {
  const [products, setProducts] = useState([]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProductList setProducts={setProducts} />} />
        <Route path="/product/:productId" element={<ProductDetail products={products} />} />
      </Routes>
    </Router>
  );
};

export default App;
