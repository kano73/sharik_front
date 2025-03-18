import React, {useState} from 'react';
import Counter from './Counter';

const PageCounter = ({onCountChange}) => {
    const [count, setCount] = useState(1);

    const handleIncrement = () => {
        setCount(count + 1);
        onCountChange(count+1);
    };

    const handleDecrement = () => {
        if (count > 1) {
            setCount(count-1);
            onCountChange(count-1);
        }
    };
    
    return (
        <div>
            <Counter
                name={"Page"}
                count={count}
                onIncrement={() => handleIncrement()}
                onDecrement={()=> handleDecrement()}
            />
        </div>
    );
};

export default PageCounter;