import React, {useState, useEffect} from 'react';
import Counter from './Counter';

const Amount = ({productId, onCountChange}) => {
    const [count, setCount] = useState(1);
    
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
                name={"Amount"}
                count={count}
                
                onIncrement={() => handleIncrement()}
                onDecrement={()=> handleDecrement()}
            />
        </div>
    );
};

export default Amount;