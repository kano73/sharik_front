import React, {useEffect, useState} from 'react';
import Counter from './Counter';

const Quantity = ({productId, onCountChange, startPoint}) => {
    const [count, setCount] = useState(startPoint);

    useEffect(() => {
        onCountChange(productId, count);
    }, [count, productId, onCountChange]);

    const handleIncrement = () => {
        setCount(prevCount => prevCount + 1);
    };

    const handleDecrement = () => {
        setCount(prevCount => (prevCount > 1 ? prevCount - 1 : prevCount));
    };

    return (
        <div>
            <Counter
                productId={productId}
                count={count}
                name={"Quantity"}
                onIncrement={() => handleIncrement()}
                onDecrement={()=> handleDecrement()}
            />
        </div>
    );
};

export default Quantity;