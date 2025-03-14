import React, {useEffect, useState} from "react";
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
            const response = await axios.get(`${API_URL}/cart`, {withCredentials: true});
            setCart(response.data);
        } catch (err) {
            setError(err.response.data);
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCart();
    }, []);

    const emptyCart = async () => {
        await axios.delete(`${API_URL}/empty_cart`);
        setCart([]);
    };

    return (
        <div>
            <LoadingAndError error={error} setError={setError} loading={loading} setLoading={setLoading} />
            <div className={'products'}>
                {cart.map(paq => (
                    <div key={paq.product.id} className={'product'}>
                        <h2>{paq.product.name}</h2>
                        <span>Price: ${paq.product.price}</span><br/>
                        <span>Amount Left: {paq.product.amountLeft}</span><br/>
                        <span>Description: {paq.product.description}</span><br/>
                        <span>Categories: {paq.product.categories.join(', ')}</span><br/>
                        <span>Available: {paq.product.available ? 'Yes' : 'No'}</span><br/>
                        {paq.product.imageUrl && <img src={paq.product.imageUrl} alt={paq.product.name} style={{width: '100px'}}/>}
                        <span>Quantity: {paq.quantity}</span>
                    </div>
                ))}
            </div>
            <button onClick={emptyCart} disabled={loading}>Empty Cart</button>
        </div>
    );
};

export default Cart;