import React, {useState} from "react";
import axios from 'axios';
import {API_URL} from '../config/config.js';

import LoadingAndError from './LoadingAndError';

const Profile = () => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const fetchProfile = async () => {
        setError('');
        try {
            const response = await axios.get(`${API_URL}/profile`);
            setProfile(response.data);
            alert('Login successful');
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    fetchProfile();

    return (
        <div>

            <LoadingAndError error={error} setError={setError} loading={loading} setLoading={setLoading} />
            <div>
                <p>Email: {profile.email}</p>
                <p>First name: {profile.firstName}</p>
                <p>Last name: {profile.lastName}</p>
                <p>Address: {profile.Address}</p>
            </div>
        </div>
    );
};

export default Profile ;