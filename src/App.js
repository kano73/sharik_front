import React, {useEffect, useState} from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Auth from './components/Auth';
import Cart from './components/Cart';
import Products from './components/Products';
import Product from './components/Product';
import Profile from './components/Profile';
import Order from './components/Order';
import AdminPanel from './components/AdminPanel';
import axios from 'axios';
import {API_URL} from './config/config.js';
import Users from './components/admin/Users';
import Histories from './components/admin/Histories';

function App() {

    const [isAdmin, setIsAdmin] = useState(false);
    const fetchIsAdmin = async () => {
        const response = await axios.get(`${API_URL}/is_user_admin`);
        setIsAdmin(response.data);
    };

    useEffect(() => {
        fetchIsAdmin();
    }, []);

    return (
        <BrowserRouter>
            <div className="App">
                <h1>Online Store</h1>
                <nav>
                    <Link to="/">Login</Link> |
                    <Link to="/profile">Profile</Link> |
                    <Link to="/products">Products</Link> |
                    <Link to="/cart">Cart</Link>
                    {isAdmin ? (<span> |<Link to="/admin/panel">Admin Panel</Link></span>) : null}
                </nav>
                <Routes>
                    <Route path="/" element={<Auth />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/cart/make_order" element={<Order/>} />
                    <Route path="/product" element={<Product />} />

                    <Route path="/admin/panel" element={<AdminPanel/>}/>
                    <Route path="/admin/users" element={<Users />} />
                    <Route path="/admin/histories" element={<Histories />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
