import React, { useEffect, useState} from "react";
import axios from 'axios';
import {API_URL} from '../../config/config';
import LoadingAndError from '../LoadingAndError';
import OrderHistory from '../displayData/OrderHistory';
import PageCounter from '../counters/PageCounter';

const Histories = () => {
    const [page, setPage] = useState(1);
    const [histories, setHistories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const fetchHistories = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await axios.get(`${API_URL}/admin/all_histories`,
                {params: { page }, withCredentials: true});
            setHistories(response.data);
        } catch (err) {
            const errorMessage = err.response?.data || "Something went wrong";
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchHistories();
    }, [page]);

    return (
        <div>
            <LoadingAndError error={error} setError={setError} loading={loading} setLoading={setLoading} />
            <PageCounter onCountChange={(count)=>setPage(count)} />
            <OrderHistory data={histories} />
        </div>
    );
};

export default Histories;