import React from 'react';

const Loading = ({ loading}) =>{
    return (
        <div className="text-center mt-4">
            {loading && <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>}
        </div>
    );
}

export default Loading;