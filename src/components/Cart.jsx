import React, {useState} from "react";
import axios from 'axios';
import {API_URL} from '../config/config.js';
import LoadingAndError from './LoadingAndError';

const Cart = () => {
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const fetchCart = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await axios.get(`${API_URL}/cart`);
            setCart(response.data);
        } catch (err) {
            setError(err.response?.data?.message || 'Error while loading cart');
            console.log(err);
        } finally {
            setLoading(false);
        }
    };
    
    fetchCart();

    const emptyCart = async () => {
        await axios.delete(`${API_URL}/empty_cart`);
        setCart([]);
    };

    return (
        <div>
            <LoadingAndError error={error} setError={setError} loading={loading} setLoading={setLoading} />
            <ul>
                {cart.map(item => (
                    <li key={item.Product.productId}>{item.Product.productName} - {item.quantity}</li>
                ))}
            </ul>
            <button onClick={emptyCart} disabled={loading}>Empty Cart</button>
        </div>
    );
};

export default Cart;