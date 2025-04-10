import React from 'react';
import Error from './Error'
import Loading from './Loading'

const LoadingAndError = ({error, setError, loading, setLoading}) => {
    return (
        <div>
            <Loading loading={loading} setLoading={setLoading} />
            <Error error={error} setError={setError} />
        </div>
    );
};

export default LoadingAndError;