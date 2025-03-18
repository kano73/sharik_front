import React, {useCallback, useState} from "react";
import Filter from './Filter';
import axios from 'axios';
import Amount from './counters/Amount';
import {API_URL} from '../config/config.js';


const Product = () => {
    const [products, setProducts] = useState([]);
    const updateProducts = (newProducts) => {
        setProducts(newProducts);
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
            <Filter updateProducts={updateProducts}/>
            <div className={'products'}>
                {products.map(product => (
                    <div key={product.id} className={'product'}>
                        {product.imageUrl && <img src={product.imageUrl} alt={product.name} style={{width: '100px'}}/>}
                        <h2>{product.name}</h2>
                        <span>Price: ${product.price}</span><br/>
                        <span>Amount Left: {product.amountLeft}</span><br/>
                        <span>Description: {product.description}</span><br/>
                        <span>Categories: {product.categories.join(', ')}</span><br/>
                        <span>Available: {product.available ? 'Yes' : 'No'}</span><br/>
                        <Amount
                            productId={product.id}
                            onCountChange={handleCountChange}/>
                        <button onClick={() => addToCart(product.id)}>Add to cart</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Product;