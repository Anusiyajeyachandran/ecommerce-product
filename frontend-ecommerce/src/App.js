import React from 'react';
import Header from './components/header';
import Navbar from './components/navbar';
import Home from './components/productList';
import Cart from './components/cart';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './App.css';



const App = () => {
  
    return (
      <Router>
      <div>
        <Header />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </div>
      </Router>
    );
}

export default App;
