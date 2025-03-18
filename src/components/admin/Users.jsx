import React, { useEffect, useState} from "react";
import axios from 'axios';
import {API_URL} from '../../config/config';
import LoadingAndError from '../LoadingAndError';
import OrderHistory from '../displayData/OrderHistory';
import { useNavigate } from 'react-router-dom';
import PageCounter from '../counters/PageCounter';
import FiltersUser from '../FiltersUser';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const fetchUsers = async (filters) => {
        setLoading(true);
        setError('');
        try {
            const response = await axios.post(`${API_URL}/admin/all_users`,
                {...filters},
                {withCredentials: true});
            setUsers(response.data);
            console.log(response.data);
        } catch (err) {
            const errorMessage = err.response?.data || "Something went wrong";
            setError(errorMessage);
            console.log(err);
        } finally {

            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div>
            <LoadingAndError error={error} setError={setError} loading={loading} setLoading={setLoading} />
            <FiltersUser fetchFilteredData={(filters)=>fetchUsers(filters)} />
        </div>
    );
};

export default Users;