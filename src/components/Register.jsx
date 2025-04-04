import React, { useState } from "react";
import {API_URL} from '../config/config.js';
import axios from "axios";

const Register = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        password: "",
        email: "",
        address: ""
    });
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${API_URL}/register`, {...formData});
            setMessage(response.data);
        } catch (err) {
            const errorMessage = err.response?.data || "Something went wrong";
            setMessage(errorMessage);
        }
    };

    return (
        <div className="container p-4">
            <h2 className="text-center mb-4">Register</h2>
            {message && <p className="text-center text-danger mb-2">{message}</p>}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <input
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                        className="form-control"
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <input
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        className="form-control"
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        className="form-control"
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        className="form-control"
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <input
                        type="text"
                        name="address"
                        placeholder="Address (optional)"
                        className="form-control"
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" className="btn btn-primary w-100">Register</button>
            </form>
        </div>
    );
};

export default Register;