import React from "react";
import {Link } from "react-router-dom";

const UserDisplay = ({ users }) => {
    return (
        <div className="container mt-4">
            <ul className="list-group">
                {users.map((user) => (
                    <li key={user.id} className="list-group-item p-3 shadow-sm">
                        <p><strong>ID:</strong> <Link to={`/admin/profile_of?id=${user.id}`} className="text-primary">{user.id}</Link></p>
                        <p><strong>First Name:</strong> {user.firstName || "N/A"}</p>
                        <p><strong>Last Name:</strong> {user.lastName || "N/A"}</p>
                        <p><strong>Address:</strong> {user.address || "N/A"}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                        <p><strong>Role:</strong> <span className="badge bg-info text-dark">{user.role}</span></p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserDisplay;
