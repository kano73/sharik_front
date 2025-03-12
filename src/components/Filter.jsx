import React, {useState} from 'react';
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

    async function sendRequest() {
        setLoading(true);
        setError('');
        try {
            const response = await axios.post(`${API_URL}/products`, filters);
            updateProducts(response.data);
        } catch (err) {
            setError(err.response?.data?.message || 'Error while loading products');
            console.log(err);
        } finally {
            setLoading(false);
        }
    }
    
    return (
        <div>
            <LoadingAndError error={error} setError={setError} loading={loading} setLoading={setLoading} />
            <input
                type="text"
                name="nameAndDescription"
                value={filters.nameAndDescription}
                onChange={handleFilterChange}
                placeholder="Search by name or description"
            />
            <input
                type="number"
                name="priceFrom"
                value={filters.priceFrom}
                onChange={handleFilterChange}
                placeholder="Price From"
            />
            <input
                type="number"
                name="priceTo"
                value={filters.priceTo || ''}
                onChange={handleFilterChange}
                placeholder="Price To"
            />
            <input
                type="text"
                name="categories"
                value={filters.categories.join(', ')}
                onChange={(e) => handleFilterChange({ target: { name: 'categories', value: e.target.value.split(', ') } })}
                placeholder="Categories (comma separated)"
            />
            <select name="sortBy" value={filters.sortBy} onChange={handleSortChange}>
                <option value="NAME">Sort by Name</option>
                <option value="PRICE">Sort by Price</option>
            </select>
            <select name="sortDirection" value={filters.sortDirection} onChange={handleSortChange}>
                <option value="ASC">Ascending</option>
                <option value="DESC">Descending</option>
            </select>
            <input type="submit" onSubmit={sendRequest()}/>
        </div>
    );
};

export default Filter;