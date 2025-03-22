import React from "react";
import { Link } from "react-router-dom";
import useAdminCheck from "./admin/useAdminCheck";

const AdminPanel = () => {
    useAdminCheck();

    return (
        <div className="container mt-4">
            <h1 className="mb-3">Admin Panel</h1>
            <div className="list-group">
                <Link to="/admin/users" className="list-group-item list-group-item-action">
                    Users
                </Link>
                <Link to="/admin/histories" className="list-group-item list-group-item-action">
                    Histories of orders
                </Link>
            </div>
        </div>
    );
};

export default AdminPanel;