
// Cart Component
import React, {useEffect, useState} from "react";
import axios from 'axios';
import { API_URL } from '../config/config.js';

axios.defaults.adapter = require('axios/lib/adapters/xhr');

const Cart = () => {
    const [cart, setCart] = useState([]);

    const fetchCart = async () => {
        const response = await axios.get(`${API_URL}/cart`);
        setCart(response.data);
    };

    const emptyCart = async () => {
        await axios.delete(`${API_URL}/empty_cart`);
        setCart([]);
    };

    useEffect(() => {
        fetchCart();
    }, []);

    return (
        <div>
            <ul>
                {cart.map(item => (
                    <li key={item.productId}>{item.productName} - {item.quantity}</li>
                ))}
            </ul>
            <button onClick={emptyCart}>Empty Cart</button>
        </div>
    );
};

export { Cart };