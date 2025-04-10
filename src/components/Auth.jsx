import React, { useState } from 'react';
import axios from 'axios';
import {API_URL} from '../config/config.js';
import {Link, useNavigate} from "react-router-dom";
import {GoogleLogin} from "@react-oauth/google";

const Auth = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const login = async () => {
        setError('');
        try {
            await axios.post(`${API_URL}/login`,
                { email,  password},
                { withCredentials: true }
            );
            navigate("/products");
        } catch (err) {
            console.log(err);
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

    const handleGoogleLogin = (token) => {
        axios.post(`${API_URL}/auth/google`,
            {token: token},
            { withCredentials: true })
            .then(() => alert('Login successful'))
            .catch(err => setError(err.response));
    };

    const handleLoginError = () => {
        setError("Error on login");
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Login</h2>

            {error && <div className="alert alert-danger">{error}</div>}

            <p className="text-center">Do not have an account? <Link to="/register" className="text-primary">Register now</Link></p>

            <div className="mb-3">
                <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Email"
                    disabled={loading}
                />
            </div>

            <div className="mb-3">
                <input
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Password"
                    disabled={loading}
                />
            </div>

            <div className="d-flex justify-content-between">
                <button
                    onClick={login}
                    className="btn btn-primary"
                    disabled={loading}
                >
                    Login
                </button>
                <button
                    onClick={logout}
                    className="btn btn-secondary"
                    disabled={loading}
                >
                    Logout
                </button>
            </div>
            <GoogleLogin
                onSuccess={credentialResponse => {
                    handleGoogleLogin(credentialResponse.credential);
                }}
                onError={handleLoginError}
            />
        </div>
    );
};

export default Auth;