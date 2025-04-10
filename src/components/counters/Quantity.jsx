import React, {useEffect, useState} from 'react';
import Counter from './Counter';

const Quantity = ({productId, onCountChange, startPoint,maxAmount}) => {
    const [count, setCount] = useState(startPoint);

    useEffect(() => {
        onCountChange(productId, count, maxAmount);
    }, [count, productId, onCountChange]);

    const handleIncrement = () => {
        setCount(prevCount => (prevCount < maxAmount ? prevCount + 1 : prevCount));
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