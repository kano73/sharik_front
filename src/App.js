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
import User from './components/admin/User';
import Register from './components/Register';

function App() {

    const [isAdmin, setIsAdmin] = useState(false);
    const fetchIsAdmin = async () => {
        try {
            const response = await axios.get(`${API_URL}/is_user_admin` , {withCredentials: true});
            setIsAdmin(response.data);
        }catch(error) {
            setIsAdmin(false);
        }

    };

    useEffect(() => {
        fetchIsAdmin();
    }, []);

    return (
        <BrowserRouter>
            <div className="container text-center mt-4" >
                <h1 className="mb-4">Sharik Store</h1>

                <nav className="navbar navbar-expand-lg navbar-light bg-light p-3 rounded shadow-sm">
                    <div className="container-fluid">
                        <div className="navbar-nav">
                            <Link className="nav-link" to="/">Login</Link>
                            <Link className="nav-link" to="/profile">Profile</Link>
                            <Link className="nav-link" to="/products">Products</Link>
                            <Link className="nav-link" to="/cart">Cart</Link>
                            {isAdmin && <Link className="nav-link text-danger" to="/admin/panel">Admin Panel</Link>}
                        </div>
                    </div>
                </nav>

                <div className="mt-4">
                    <Routes>
                        <Route path="/" element={<Auth />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/products" element={<Products />} />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/cart/make_order" element={<Order />} />
                        <Route path="/product" element={<Product />} />
                        <Route path="/register" element={<Register />} />

                        <Route path="/admin/panel" element={<AdminPanel />} />
                        <Route path="/admin/users" element={<Users />} />
                        <Route path="/admin/histories" element={<Histories />} />
                        <Route path="/admin/profile_of" element={<User />} />
                    </Routes>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
