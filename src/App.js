import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Auth from './components/Auth';
import Cart from './components/Cart';
import Product from './components/Product';
import Profile from './components/Profile';

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <h1>Online Store</h1>
                <nav>
                    <Link to="/">Login</Link> |
                    <Link to="/profile">Profile</Link> |
                    <Link to="/products">Products</Link> |
                    <Link to="/cart">Cart</Link>
                </nav>
                <Routes>
                    <Route path="/" element={<Auth />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/products" element={<Product />} />
                    <Route path="/cart" element={<Cart />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
