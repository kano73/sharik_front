import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {API_URL} from '../config/config.js';
import LoadingAndError from './LoadingAndError';

const Filter = ({updateProducts}) => {
    const [filters,  setFilters] = useState({
        nameAndDescription: '',
        priceFrom: '',
        priceTo: '',
        categories: [],
        page: 1,
        sortBy: 'NAME',
        sortDirection: 'ASC'
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({
            ...prev,
            [name]: name === 'categories' ? value.split(',').map(c => c.trim()) : value
        }));
    };

    async function sendRequest() {
        setLoading(true);
        setError('');
        try {
            console.log(filters);
            const response = await axios.post(`${API_URL}/products`, {...filters}, {withCredentials: true});
            console.log(response);
            updateProducts(response.data);
        } catch (err) {
            setError(err.response.data);
            console.log("eroor");
            console.log(err);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        sendRequest();
    }, []);
    
    return (
        <div>
            <LoadingAndError error={error} setError={setError} loading={loading} setLoading={setLoading} />
            <input
                type="text"
                name="nameAndDescription"
                value={filters.nameAndDescription}
                placeholder="Search by name or description"
                onChange={handleChange}
            />
            <input
                type="number"
                name="priceFrom"
                value={filters.priceFrom}
                placeholder="Price From"
                onChange={handleChange}
            />
            <input
                type="number"
                name="priceTo"
                value={filters.priceTo || ''}
                placeholder="Price To"
                onChange={handleChange}
            />
            <input
                type="text"
                name="categories"
                value={filters.categories.join(', ')}
                placeholder="Categories (comma separated)"
                onChange={handleChange}
            />
            <select name="sortBy" value={filters.sortBy} onChange={handleChange}>
                <option value="NAME">Sort by Name</option>
                <option value="PRICE">Sort by Price</option>
            </select>
            <select name="sortDirection" value={filters.sortDirection} onChange={handleChange}>
                <option value="ASC">Ascending</option>
                <option value="DESC">Descending</option>
            </select>
            <input type="submit" onClick={sendRequest}/>
        </div>
    );
};

export default Filter;