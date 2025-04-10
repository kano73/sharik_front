import React, { useState, useEffect } from 'react';

const FiltersUser = ({fetchFilteredData}) => {
    const [filter, setFilter] = useState({
        id : '',
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

    const handlePageChange = (e, newPage) => {
        setFilter(prevFilter => ({
            ...prevFilter,
            page: newPage
        }));
    };

    useEffect(() => {
        fetchFilteredData(filter);
    }, []);

    return (
        <div className="container mt-4">
            <div className="mb-3">
                <label htmlFor="UserId" className="form-label">ID:</label>
                <input
                    type="text"
                    id="UserId"
                    name="id"
                    value={filter.id}
                    onChange={handleFilterChange}
                    placeholder="id"
                    className="form-control"
                />
            </div>

            <div className="mb-3">
                <label htmlFor="nameFilter" className="form-label">Name:</label>
                <input
                    type="text"
                    id="nameFilter"
                    name="firstOrLastName"
                    value={filter.firstOrLastName}
                    onChange={handleFilterChange}
                    placeholder="name"
                    className="form-control"
                />
            </div>

            <div className="mb-3">
                <label htmlFor="emailFilter" className="form-label">Email:</label>
                <input
                    type="email"
                    id="emailFilter"
                    name="email"
                    value={filter.email}
                    onChange={handleFilterChange}
                    placeholder="email"
                    className="form-control"
                />
            </div>

            <div className="d-flex justify-content-between align-items-center mb-3">
                <button
                    onClick={(e) => handlePageChange(e, filter.page - 1)}
                    disabled={filter.page <= 1}
                    className="btn btn-secondary"
                >
                    Previous
                </button>
                <span>Page: {filter.page}</span>
                <button
                    onClick={(e) => handlePageChange(e, filter.page + 1)}
                    className="btn btn-secondary"
                >
                    Next
                </button>
            </div>

            <button
                onClick={() => fetchFilteredData(filter)}
                className="btn btn-primary"
            >
                Apply Filters
            </button>
        </div>
    );
};

export default FiltersUser;
