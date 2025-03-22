import React from 'react';

const Counter = ({ productId, count, onIncrement, onDecrement, name }) => {
    return (
        <div className="d-flex align-items-center justify-content-center">
            <button
                onClick={() => onDecrement(productId)}
                className="btn btn-outline-danger btn-sm mx-2">
                -
            </button>
            <span className="mx-2">{name}: {count}</span>
            <button
                onClick={() => onIncrement(productId)}
                className="btn btn-outline-success btn-sm mx-2">
                +
            </button>
        </div>
    );
};

export default Counter;
