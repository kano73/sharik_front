import React, {useEffect, useState} from "react";
import axios from 'axios';
import { API_URL } from '../config/config.js';

axios.defaults.adapter = require('axios/lib/adapters/xhr');

// Profile Component
const Profile = () => {
    const [profile, setProfile] = useState(null);

    const fetchProfile = async () => {
        const response = await axios.get(`${API_URL}/profile`);
        setProfile(response.data);
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    return (
        <div>
            {profile && (
                <div>
                    <p>Name: {profile.name}</p>
                    <p>Email: {profile.email}</p>
                </div>
            )}
        </div>
    );
};

export { Profile } ;