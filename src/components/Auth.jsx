import React, { useState } from 'react';
import axios from 'axios';
import {API_URL} from '../config/config.js';

import LoadingAndError from './LoadingAndError';

const Auth = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const login = async () => {
        setError('');
        try {
            const response = await axios.post(`${API_URL}/login`,
                { email, password },
                { withCredentials: true }
            );
            console.log("response: "+response);
            alert('Login successful');
        } catch (err) {
            const errorMessage = err.response?.data || "Something went wrong";
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        try {
            await axios.post(`${API_URL}/logout`, {}, { withCredentials: true });
            alert('Logout successful');
        } catch (err) {
             setError(err.response);
        }
    };

    return (
        <div>
            <LoadingAndError error={error} setError={setError} loading={loading} setLoading={setLoading} />
            <input type="email" value={email}
                   onChange={e => setEmail(e.target.value)}
                   placeholder="Email" disabled={loading} />
            <input type="password" value={password}
                   onChange={e => setPassword(e.target.value)}
                   placeholder="Password" disabled={loading} />
            <button onClick={login} disabled={loading}>Login</button>
            <button onClick={logout} disabled={loading}>Logout</button>
        </div>
    );
};

export default Auth;