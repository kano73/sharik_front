import React, { useState } from 'react';

const FiltersUser = (fetchFilteredData) => {
    const [filter, setFilter] = useState({
        firstOrLastName: '',
        email: '',
        page: 1
    });

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilter(prevFilter => ({
            ...prevFilter,
            [name]: value
        }));
    };

    const handlePageChange = (newPage) => {
        setFilter(prevFilter => ({
            ...prevFilter,
            page: newPage
        }));
        fetchFilteredData(filter);
    };

    return (
        <div>
            <div>
                <label htmlFor="nameFilter">Name:</label>
                <input
                    type="text"
                    id="nameFilter"
                    name="firstOrLastName"
                    value={filter.firstOrLastName}
                    onChange={handleFilterChange}
                    placeholder="Enter name"
                />
            </div>

            <div>
                <label htmlFor="emailFilter">Email:</label>
                <input
                    type="email"
                    id="emailFilter"
                    name="email"
                    value={filter.email}
                    onChange={handleFilterChange}
                    placeholder="Enter email"
                />
            </div>

            <div>
                <button onClick={() => handlePageChange(filter.page - 1)} disabled={filter.page <= 1}>
                    Previous
                </button>
                <span>Page: {filter.page}</span>
                <button onClick={() => handlePageChange(filter.page + 1)}>Next</button>
            </div>
            <button onClick={fetchFilteredData}>Apply Filters</button>
        </div>
    );
};

export default FiltersUser;
