import React from 'react';

const Error = ({error}) => {

    return (
        <div className="mt-4">
            {error && <div className="alert alert-danger" role="alert">{error}</div>}
        </div>
    );
};

export default Error;