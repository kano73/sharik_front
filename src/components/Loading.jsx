import React from 'react';

const Loading = ({ loading}) =>{
    return (
        <div>
            {loading ? <p>Loading...</p> : ''}
        </div>
    );
}

export default Loading;