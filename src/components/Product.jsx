import React, {useEffect, useState} from "react";
import axios from 'axios';
import { API_URL } from '../config/config.js';


axios.defaults.adapter = require('axios/lib/adapters/xhr');
// Product Component
const Product = () => {
    const [products, setProducts] = useState([]);

    const fetchProducts = async () => {
        const response = await axios.post(`${API_URL}/products`, {});
        setProducts(response.data);
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div>
            <ul>
                {products.map(product => (
                    <li key={product.id}>{product.name} - ${product.price}</li>
                ))}
            </ul>
        </div>
    );
};

export { Product } ;