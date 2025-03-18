import React, {useCallback, useEffect, useState, useRef } from "react";
import axios from 'axios';
import {API_URL} from '../config/config.js';
import LoadingAndError from './LoadingAndError';
import Quantity from './counters/Quantity';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const fetchCart = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await axios.get(`${API_URL}/cart`, {withCredentials: true});
            setCart(response.data);
        } catch (err) {
            const errorMessage = err.response?.data || "Something went wrong";
            setError(errorMessage);
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

    const removeFromCart = async (productId) => {
        try {
            await sendRequest(productId, 0);
            setCart(prevCart => prevCart.filter(paq => paq.product.id !== productId));
        } catch (err) {
            alert("Unable to remove item from cart");
        }
    };

    const isNotFirstRender = useRef(true);
    const handleCountChange = useCallback((productId, count) => {
        if(isNotFirstRender.current) {
            isNotFirstRender.current = false;
            return;
        }
        console.log("count",count);

        if (window.countChangeTimeout) {
            clearTimeout(window.countChangeTimeout);
        }

        window.countChangeTimeout = setTimeout(() => {
            sendRequest(productId, count);
        }, 500);
    }, []);

    const sendRequest = async (productId, quantity) => {
        try {
            const request = {
                productId : productId,
                quantity : quantity
            };
            console.log(request);

            const response = await axios.post(`${API_URL}/change_amount`,
                {...request},
                {withCredentials: true});
            console.log(response);
            console.log("yuio");
            alert(response.data);
        } catch (err) {
            alert("unable to add to cart");
        }
    }

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
                        <Quantity
                            startPoint={paq.quantity}
                            productId={paq.product.id}
                            onCountChange={handleCountChange}
                        />
                        <button onClick={()=>removeFromCart(paq.product.id)} >Remove</button>
                    </div>
                ))}
            </div>
            <button onClick={emptyCart} disabled={loading}>Empty Cart</button>
            <button onClick={()=>navigate("make_order")} disabled={loading}>Order</button>
        </div>
    );
};

export default Cart;