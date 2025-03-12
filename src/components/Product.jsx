import React, {useState} from "react";
import Filter from './Filter';

const Product = () => {
    const [products, setProducts] = useState([]);
    const updateProducts = (newProducts) => {
        setProducts(newProducts);
    };

    return (
        <div>
            <Filter updateProducts={updateProducts}/>
            <ul>
                {products.map(product => (
                    <li key={product.id}>{product.name} - ${product.price}</li>
                ))}
            </ul>
        </div>
    );
};

export default Product;