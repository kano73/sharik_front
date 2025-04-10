import React, { useEffect, useState} from "react";
import axios from 'axios';
import {API_URL} from '../../config/config';
import LoadingAndError from '../LoadingAndError';
import FiltersUser from '../FiltersUser';
import UserDisplay from '../displayData/UserDisplay';
import useAdminCheck from "./useAdminCheck";

const Users = () => {
    useAdminCheck();
    
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const fetchUsers = async (filters) => {
        setLoading(true);
        setError('');
        try {
            const response = await axios.post(`${API_URL}/admin/all_users`,
                {...filters},
                {withCredentials: true});
            setUsers(response.data);
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
            <h2 className="h2 mb-4 text-center font-weight-bold">User List</h2>
            <LoadingAndError error={error} setError={setError} loading={loading} setLoading={setLoading}/>
            <FiltersUser fetchFilteredData={(filters) => fetchUsers(filters)}/>
            <UserDisplay users={users}/>
        </div>
    );
};

export default Users;