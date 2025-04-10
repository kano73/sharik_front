import React, {useState, useEffect} from "react";
import axios from 'axios';
import {API_URL} from '../config/config.js';
import OrderHistory from "./displayData/OrderHistory"
import LoadingAndError from './LoadingAndError';

const Profile = () => {
    const [profile, setProfile] = useState({});
    const [saveProfile, setSaveProfile] = useState({});
    const [loading, setLoading] = useState(false);
    const [editing, setEditing] = useState(false);
    const [error, setError] = useState('');
    const [history, setHistory] = useState([]);

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

    const fetchHistory = async () => {
        setError('');
        try {
            const response = await axios.get(`${API_URL}/history`,{withCredentials: true});
            setHistory([response.data]);
        } catch (err) {
            const errorMessage = err.response?.data || "Something went wrong";
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    }

    const startEditing = () => {
        setEditing(true);
        setSaveProfile({...profile});
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

        fetchHistory();
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
        <div className="container mt-4">
            <h2 className="text-xl font-bold mb-4">Profile</h2>
            <LoadingAndError error={error} setError={setError} loading={loading} setLoading={setLoading}/>
            {loading ? (
                <p>Loading...</p>
            ) : (
                editing ? (
                    <div>
                        <div className="mb-3">
                            <input
                                type="text"
                                name="email"
                                value={profile.email}
                                placeholder="Email"
                                onChange={handleChange}
                                className="form-control"
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                type="text"
                                name="firstName"
                                value={profile.firstName}
                                placeholder="First Name"
                                onChange={handleChange}
                                className="form-control"
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                type="text"
                                name="lastName"
                                value={profile.lastName}
                                placeholder="Last Name"
                                onChange={handleChange}
                                className="form-control"
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                type="text"
                                name="address"
                                value={profile.address}
                                placeholder="Address"
                                onChange={handleChange}
                                className="form-control"
                            />
                        </div>
                        <button onClick={saveChanges} className="btn btn-primary me-2">Save</button>
                        <button onClick={cancelChanges} className="btn btn-secondary">Cancel</button>
                    </div>
                ) : (
                    <div>
                        <p><strong>Email:</strong> {profile.email}</p>
                        <p><strong>First Name:</strong> {profile.firstName}</p>
                        <p><strong>Last Name:</strong> {profile.lastName}</p>
                        <p><strong>Address:</strong> {profile.address}</p>
                        <button onClick={startEditing} className="btn btn-warning">Edit</button>
                    </div>
                )
            )}
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div>
                    <OrderHistory data={history}/>
                </div>
            )}
        </div>
    );
};

export default Profile;