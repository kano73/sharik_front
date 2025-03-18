import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

import {API_URL} from '../config/config.js';

const Product = () => {
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const location = useLocation();

    const queryParams = new URLSearchParams(location.search);
    const productId = queryParams.get('id');


    const fetchIsAdmin = async () => {
        const response = await axios.get(`${API_URL}/is_user_admin`);
        setIsAdmin(response.data);
    };

    useEffect(() => {
        if (productId) {
            axios.get(`${API_URL}/product?id=${productId}`)
                .then(response => {
                    setProduct(response.data);
                    setLoading(false);
                })
                .catch(error => {
                    setError('Error fetching product');
                    setLoading(false);
                });
        }
        fetchIsAdmin();
    }, [productId]);


    const toggleAvailability = () => {
        const updatedStatus = !product.available;

        const dto = {
            productId: product.id,
            status: updatedStatus,
        };

        axios.post(`${API_URL}/admin/set_product_status`, dto)
            .then(response => {
                setProduct(prevProduct => ({
                    ...prevProduct,
                    available: updatedStatus,
                }));
            })
            .catch(error => {
                setError('Error updating product status: ', error.data);
            });
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            {product && (
                <div>
                    <h2>{product.name}</h2>
                    <img src={product.imageUrl} alt={product.name} />
                    <p>{product.description}</p>
                    <p>Price: ${product.price}</p>
                    <p>Amount Left: {product.amountLeft}</p>
                    <p>{product.available ? 'Available' : 'Out of stock'}</p>

                    {isAdmin && (
                        <button onClick={toggleAvailability}>
                            {product.available ? 'Set as Out of Stock' : 'Set as Available'}
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};

export default Product;
