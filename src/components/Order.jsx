import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {API_URL , DIGITS_AFTER_COMA} from '../config/config.js';
import LoadingAndError from './LoadingAndError';
import { useNavigate } from 'react-router-dom';

const Order = () => {
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [address, setAddress] = useState('');
    const [summaryPrice, setSummaryPrice] = useState(null);
    const navigate = useNavigate();

    const fetchCart = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await axios.get(`${API_URL}/cart`, {withCredentials: true});
            setCart(response.data);
            console.log(response.data);
            setSummaryPrice(
                response.data.reduce((acc, cur) => acc + cur.product.price * cur.quantity, 0) / (10 ** DIGITS_AFTER_COMA)
            );
        } catch (err) {
            const errorMessage = err.response?.data || "Something went wrong";
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const fetchAddress = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await axios.get(`${API_URL}/profile`, {withCredentials: true});
            setAddress(response.data.address);
        } catch (err) {
            const errorMessage = err.response?.data || "Something went wrong";
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCart();
        fetchAddress();
    }, []);

    const sendRequestOrder = async () => {
        try {
            const response = await axios.post(`${API_URL}/make_order`,
                {customAddress: address},
                {withCredentials: true});
            setCart([])
            setSummaryPrice(0);
            alert(response.data);
        } catch (err) {
            alert("unable to make order");
        }
    }

    const handleAddressChange = (e) => {
        setAddress(e.target.value);
    }

    return (
        <div className="container mt-4">
            <LoadingAndError error={error} setError={setError} loading={loading} setLoading={setLoading} />

            <div className="products">
                {cart.length === 0 ? (
                    <div className="alert alert-warning" role="alert">
                        Cart is empty
                    </div>
                ) : (
                    cart.map(paq => (
                        <div key={paq.product.id} className="product mb-4 p-4 border rounded-lg shadow-sm">
                            <h2 className="h4">{paq.product.name}</h2>
                            <p><strong>Price:</strong> ${paq.product.price / (10 ** DIGITS_AFTER_COMA)}</p>
                            <p><strong>Amount Left:</strong> {paq.product.amountLeft}</p>
                            <p><strong>Description:</strong> {paq.product.description}</p>
                            <p><strong>Categories:</strong> {paq.product.categories.join(', ')}</p>
                            <p><strong>Available:</strong> {paq.product.available ? 'Yes' : 'No'}</p>
                            {paq.product.imageUrl && (
                                <img src={paq.product.imageUrl} alt={paq.product.name} style={{ width: '100px' }} className="img-fluid mb-2" />
                            )}
                            <p><strong>Quantity:</strong> {paq.quantity}</p>
                            <p><strong>Your Address:</strong></p>
                        </div>
                    ))
                )}

                <div className="mb-4">
                    <input
                        type="text"
                        value={address}
                        onChange={handleAddressChange}
                        placeholder="Enter your address"
                        className="form-control"
                    />
                </div>

                <p><strong>Summary Price:</strong> ${summaryPrice}</p>

                <button
                    onClick={sendRequestOrder}
                    disabled={loading || cart.length === 0}
                    className="btn btn-primary"
                >
                    Make Order
                </button>
            </div>

            <button
                onClick={() => navigate("/cart")}
                disabled={loading}
                className="btn btn-secondary mt-3"
            >
                Go Back
            </button>
        </div>
    );
};

export default Order;