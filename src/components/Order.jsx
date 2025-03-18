import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {API_URL} from '../config/config.js';
import LoadingAndError from './LoadingAndError';
import { useNavigate } from 'react-router-dom';

const Order = () => {
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [address, setAddress] = useState('');
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
            alert(response.data);
        } catch (err) {
            alert("unable to make order");
        }
    }

    const handleAddressChange = (e) => {
        setAddress(e.target.value);
    }

    return (
        <div>
            <LoadingAndError error={error} setError={setError} loading={loading} setLoading={setLoading}/>
            <div className={'products'}>
                {cart.length === 0 ? (
                    <div>
                        <p>Cart is empty</p>
                    </div>
                ) : cart.map(paq => (
                    <div key={paq.product.id} className={'product'}>
                        <h2>{paq.product.name}</h2>
                        <span>Price: ${paq.product.price}</span><br/>
                        <span>Amount Left: {paq.product.amountLeft}</span><br/>
                        <span>Description: {paq.product.description}</span><br/>
                        <span>Categories: {paq.product.categories.join(', ')}</span><br/>
                        <span>Available: {paq.product.available ? 'Yes' : 'No'}</span><br/>
                        {paq.product.imageUrl &&
                            <img src={paq.product.imageUrl} alt={paq.product.name} style={{width: '100px'}}/>}
                        <br/><span>quantity: {paq.quantity}</span><br/>
                        <span>Your address: </span>
                        <input type="text" value={address} onChange={handleAddressChange} placeholder={"address"}/>
                        <br/>
                        <button onClick={sendRequestOrder} disabled={loading || cart.length === 0}>Make order</button>
                    </div>
                ))}
            </div>

            <button onClick={() => navigate("/cart")} disabled={loading}>Go back</button>

        </div>
    );
};

export default Order;