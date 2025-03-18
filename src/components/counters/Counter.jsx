import React from 'react';

const Counter = ({ productId, count, onIncrement, onDecrement, name }) => {
    return (
        <div className="counter-container">
            <button onClick={()=>onDecrement(productId)}>-</button>
            <span className="numOfItems">{name}: {count}</span>
            <button onClick={()=>onIncrement(productId)}>+</button>
        </div>
    );
};

export default Counter;
