import React from 'react';

const Error = ({error}) => {

    return (
        <div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    )
};

export default Error;