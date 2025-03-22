import React, {useEffect, useState} from 'react';
import { useLocation } from 'react-router-dom';
import UserDisplay from './displayData/UserDisplay';
import OrderHistory from './displayData/OrderHistory';
import axios from 'axios';
import useAdminCheck from "./admin/useAdminCheck";
import LoadingAndError from "./LoadingAndError"
import {API_URL} from '../config/config.js';

const User = () => {
    useAdminCheck();
    const [user, setUser] = useState([]);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const location = useLocation();  // Используем useLocation вместо location
    const queryParams = new URLSearchParams(location.search);
    const userId = queryParams.get('id');

    useEffect(() => {
        if (userId) {
            axios.get(`${API_URL}/admin/profile_of?id=${userId}`, {withCredentials: true})
                .then(response => {
                    setUser([response.data]);
                    setLoading(false);
                })
                .catch(error => {
                    setError('Error fetching product');
                    setLoading(false);
                });
        }
    }, [userId]);

    const fetchOrders = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await axios.get(`${API_URL}/admin/history_of?id=${userId}`,
                {withCredentials: true});
            setOrders([response.data]);
            console.log(response.data);
        } catch (err) {
            const errorMessage = err.response?.data || "Something went wrong";
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">User</h2>
            <LoadingAndError error={error} setError={setError} loading={loading} setLoading={setLoading}/>
            <UserDisplay users={user}/>
            <OrderHistory data={orders}/>
        </div>
    );
};

export default User;