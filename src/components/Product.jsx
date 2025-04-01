import React, {useCallback, useEffect, useState} from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import Amount from './counters/Amount';
import {API_URL, DIGITS_AFTER_COMA} from '../config/config.js';

const Product = () => {
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const location = useLocation();

    const queryParams = new URLSearchParams(location.search);
    const productId = queryParams.get('id');


    const fetchIsAdmin = async () => {
        try {
            const response = await axios.get(`${API_URL}/is_user_admin` , {withCredentials: true});
            setIsAdmin(response.data);
        }catch(error) {
            setIsAdmin(false);
        }
    };

    useEffect(() => {
        if (productId) {
            axios.get(`${API_URL}/product?id=${productId}` , {withCredentials: true})
                .then(response => {
                    response.data.price=response.data.price/ (10 ** DIGITS_AFTER_COMA)
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

    const [productCount, setProductCount] = useState(1);
    const handleCountChange = useCallback((productId, count) => {
        setProductCount(count);
    }, []);


    async function addToCart(productId, amountLeft) {
        try {
            const request = {
                productId : productId,
                quantity : productCount,
                productAmountLeft : amountLeft
            };
            console.log(request);

            const response = await axios.post(`${API_URL}/add`,
                {...request},
                {withCredentials: true});
            console.log(response);
            alert(response.data);
        } catch (err) {
            alert("unable to add to cart");
        }
    }

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="container mt-4">
            {product && (
                <div className="product-detail p-4 border rounded-lg shadow-sm">
                    <h2 className="h3 mb-3">{product.name}</h2>
                    <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="img-fluid mb-3"
                        style={{ maxWidth: '300px' }}
                    />
                    <p><strong>Description:</strong> {product.description}</p>
                    <p><strong>Price:</strong> ${product.price}</p>
                    <p><strong>Amount Left:</strong> {product.amountLeft}</p>
                    <p><strong>Status:</strong> {product.available ? 'Available' : 'Out of stock'}</p>

                    <Amount
                        productId={product.id}
                        onCountChange={handleCountChange}
                        maxAmount={product.amountLeft}
                    />
                    <button
                        onClick={() => addToCart(product.id, product.amountLeft)}
                        disabled={!product.available || product.amountLeft === 0}
                        className="btn btn-primary mt-3"
                    >
                        Add to Cart
                    </button><br/>

                    {isAdmin && (
                        <button
                            onClick={toggleAvailability}
                            className={`btn mt-3 ${product.available ? 'btn-warning' : 'btn-success'}`}
                        >
                            {product.available ? 'Set as Out of Stock' : 'Set as Available'}
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};

export default Product;
