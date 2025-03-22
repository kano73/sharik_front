import React, {useCallback, useEffect, useState, useRef } from "react";
import axios from 'axios';
import {API_URL , DIGITS_AFTER_COMA} from '../config/config.js';
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

            await axios.post(`${API_URL}/change_amount`,
                {...request},
                {withCredentials: true});
        } catch (err) {
            alert("unable to add to cart");
        }
    }

    return (
        <div className="container mt-5">
            <LoadingAndError error={error} setError={setError} loading={loading} setLoading={setLoading} />
            <div className="row">
                {cart.map(paq => (
                    <div key={paq.product.id} className="col-md-4 mb-4">
                        <div className="card shadow-sm">
                            <img
                                src={paq.product.imageUrl || "default-image.jpg"}
                                alt={paq.product.name}
                                className="card-img-top"
                                style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                            />
                            <div className="card-body">
                                <h5 className="card-title">{paq.product.name}</h5>
                                <p className="card-text">
                                    <strong>Price:</strong> ${paq.product.price / (10 ** DIGITS_AFTER_COMA)}<br />
                                    <strong>Amount Left:</strong> {paq.product.amountLeft}<br />
                                    <strong>Description:</strong> {paq.product.description}<br />
                                    <strong>Categories:</strong> {paq.product.categories.join(', ')}<br />
                                    <strong>Available:</strong> {paq.product.available ? 'Yes' : 'No'}
                                </p>
                                <Quantity
                                    startPoint={paq.quantity}
                                    productId={paq.product.id}
                                    onCountChange={handleCountChange}
                                    maxAmount={paq.product.amountLeft}
                                />
                                <button
                                    onClick={() => removeFromCart(paq.product.id)}
                                    className="btn btn-danger btn-sm mt-2"
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="d-flex justify-content-between mt-4">
                <button
                    onClick={emptyCart}
                    className="btn btn-warning"
                    disabled={loading}
                >
                    Empty Cart
                </button>
                <button
                    onClick={() => navigate("make_order")}
                    className="btn btn-success"
                    disabled={loading}
                >
                    Order
                </button>
            </div>
        </div>
    );
};

export default Cart;