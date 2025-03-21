import React, {useCallback, useState} from "react";
import Filter from './Filter';
import axios from 'axios';
import Amount from './counters/Amount';
import {API_URL, DIGITS_AFTER_COMA} from '../config/config.js';
import {Link } from "react-router-dom";


const Products = () => {
    const [products, setProducts] = useState([]);
    const updateProducts = (newProducts) => {
        setProducts(newProducts);
        console.log(newProducts);
    };
    const [productCounts, setProductCounts] = useState({});
    const handleCountChange = useCallback((productId, count) => {
        setProductCounts(prev => ({
            ...prev,
            [productId]: count,
        }));
    }, []);


    async function addToCart(productId) {
        try {
            const quantity = productCounts[productId] || 1;
            const request = {
                productId : productId,
                quantity : quantity
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

    return (
        <div>
            <Filter updateProducts={updateProducts} />
            <div className="row g-3">
                {products.map(product => (
                    <div key={product.id} className="col-12 col-md-4">
                        <div className="product p-3 border rounded shadow-sm">
                            {product.imageUrl && <img src={product.imageUrl} alt={product.name} className="img-fluid mb-3" />}
                            <Link to={`/product?id=${product.id}`}><h5>{product.name}</h5></Link>
                            <p><strong>Price:</strong> ${product.price / (10 ** DIGITS_AFTER_COMA)}</p>
                            <p><strong>Amount Left:</strong> {product.amountLeft}</p>
                            <p><strong>Description:</strong> {product.description}</p>
                            <p><strong>Categories:</strong> {product.categories.join(', ')}</p>
                            <p><strong>Available:</strong> {product.available ? 'Yes' : 'No'}</p>

                            <Amount
                                productId={product.id}
                                onCountChange={handleCountChange}
                                maxAmount={product.amountLeft}
                            />
                            <button
                                onClick={() => addToCart(product.id)}
                                disabled={!product.available || product.amountLeft === 0}
                                className="btn btn-primary w-100 mt-2"
                            >
                                Add to cart
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Products;