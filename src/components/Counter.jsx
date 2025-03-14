import React, { useState } from 'react';

const Counter = ({ productId, onCountChange }) => {
    const [count, setCount] = useState(1);

    const increment = () => {
        const newCount = count + 1;
        setCount(newCount);
        onCountChange(productId, newCount);
    };

    const decrement = () => {
        if (count > 1) {
            const newCount = count - 1;
            setCount(newCount);
            onCountChange(productId, newCount);
        }
    };

    return (
        <div className="counter-container">
            <button onClick={decrement}>-</button>
            <span className="numOfItems">Amount: {count}</span>
            <button onClick={increment}>+</button>
        </div>
    );
};

export default Counter;
