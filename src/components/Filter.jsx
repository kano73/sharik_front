import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {API_URL} from '../config/config.js';
import LoadingAndError from './LoadingAndError';
import PageCounter from './counters/PageCounter';

const Filter = ({updateProducts}) => {

    const [page,setPage] = useState(1);
    const handleCountChange = (count) => {
        setPage(count);
        setFilters(prevFilters => ({
            ...prevFilters,
            page: count,
        }));
    };
    
    const [filters,  setFilters] = useState({
        nameAndDescription: '',
        priceFrom: '',
        priceTo: '',
        categories: [],
        sortBy: 'NAME',
        sortDirection: 'ASC',
        page: page
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({
            ...prev,
            [name]: name === 'categories' ? value.split(', ').map(c => c.trim()) : value
        }));
    };

    async function sendRequest() {
        setLoading(true);
        setError('');
        try {
            console.log({...filters});
            const response = await axios.post(`${API_URL}/products`, {...filters}, {withCredentials: true});
            console.log(response);
            updateProducts(response.data);
        } catch (err) {
            const errorMessage = err.response?.data || "Something went wrong";
            console.log(err);
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        sendRequest();
    }, [page]);

    return (
        <div className="container mt-4">
            <LoadingAndError error={error} setError={setError} loading={loading} setLoading={setLoading} />

            <div className="mb-3">
                <input
                    type="text"
                    name="nameAndDescription"
                    value={filters.nameAndDescription}
                    placeholder="Search by name or description"
                    onChange={handleChange}
                    className="form-control"
                />
            </div>

            <div className="mb-3">
                <input
                    type="text"
                    name="priceFrom"
                    value={filters.priceFrom}
                    placeholder="Price From"
                    onChange={handleChange}
                    className="form-control"
                />
            </div>

            <div className="mb-3">
                <input
                    type="text"
                    name="priceTo"
                    value={filters.priceTo || ''}
                    placeholder="Price To"
                    onChange={handleChange}
                    className="form-control"
                />
            </div>

            <div className="mb-3">
                <input
                    type="text"
                    name="categories"
                    value={filters.categories.join(', ')}
                    placeholder="Categories (comma separated)"
                    onChange={handleChange}
                    className="form-control"
                />
            </div>

            <div className="mb-3">
                <select name="sortBy" value={filters.sortBy} onChange={handleChange} className="form-select">
                    <option value="NAME">Sort by Name</option>
                    <option value="PRICE">Sort by Price</option>
                </select>
            </div>

            <div className="mb-3">
                <select name="sortDirection" value={filters.sortDirection} onChange={handleChange} className="form-select">
                    <option value="ASC">Ascending</option>
                    <option value="DESC">Descending</option>
                </select>
            </div>

            <div className="mb-3">
                <button onClick={sendRequest} className="btn btn-primary">
                    Apply Filters
                </button>
            </div>

            <PageCounter onCountChange={handleCountChange} />
        </div>
    );
};

export default Filter;