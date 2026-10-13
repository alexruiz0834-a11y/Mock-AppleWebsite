import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckOutPage';

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Navbar />
        <main className="page">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/product/:id" component={ProductPage} />
            <Route path="/cart" component={CartPage} />
            <Route path="/checkout" component={CheckoutPage} />
          </Switch>
        </main>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App; 