import React, {useState, useEffect} from "react";
import axios from 'axios';
import {API_URL} from '../config/config.js';

import LoadingAndError from './LoadingAndError';

const Profile = () => {
    const [profile, setProfile] = useState({});
    const [saveProfile, setSaveProfile] = useState({});
    const [loading, setLoading] = useState(false);
    const [editing, setEditing] = useState(false);
    const [error, setError] = useState('');

    const fetchProfile = async () => {
        setError('');
        try {
            const response = await axios.get(`${API_URL}/profile`,{withCredentials: true});
            setProfile(response.data);
        } catch (err) {
            const errorMessage = err.response?.data || "Something went wrong";
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const startEditing = () => {
        setEditing(true);
        setSaveProfile({...profile});

        console.log("save")
        console.log(saveProfile);
    }

    const saveChanges = async () => {
        const response = await axios.post(`${API_URL}/update_profile`,
            {...profile},
            {withCredentials: true});
        setProfile(response.data);
        setEditing(false)
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    const cancelChanges = () => {
        setProfile({...saveProfile});
        setEditing(false);
        setSaveProfile(null);
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <div>
            <LoadingAndError error={error} setError={setError} loading={loading} setLoading={setLoading} />
            {loading ? (
                <p>Loading...</p>
            ) :( editing ?
                    (
                        <div>
                            <input type="text" name="email" value={profile.email} placeholder="email"
                                   onChange={handleChange}/><br/>
                            <input type="text" name="firstName" value={profile.firstName} placeholder="firstName"
                                   onChange={handleChange}/><br/>
                            <input type="text" name="lastName" value={profile.lastName} placeholder="lastName"
                                   onChange={handleChange}/><br/>
                            <input type="text" name="address" value={profile.address} placeholder="Address"
                                   onChange={handleChange}/><br/>
                            <button onClick={saveChanges}>Save</button>
                            <button onClick={cancelChanges}>Cancel</button>
                        </div>
                    )
                    :
                    (
                        <div>
                            <p>Email: {profile.email}</p>
                            <p>First name: {profile.firstName}</p>
                            <p>Last name: {profile.lastName}</p>
                            <p>Address: {profile.address}</p>
                            <button onClick={startEditing}>Edit</button>
                        </div>
                    )
            )}
        </div>
    );
};

export default Profile;