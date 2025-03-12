import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../config/config.js';

axios.defaults.adapter = require('axios/lib/adapters/xhr');

// Auth Component
const Auth = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const login = async () => {
        const response = await axios.post(`${API_URL}/login`, { email, password });
        localStorage.setItem('token', response.data.token);
    };

    const logout = async () => {
        await axios.post(`${API_URL}/logout`);
        localStorage.removeItem('token');
    };

    return (
        <div>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
            <button onClick={login}>Login</button>
            <button onClick={logout}>Logout</button>
        </div>
    );
};

export { Auth } from './Auth';