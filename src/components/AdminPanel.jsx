import React, {useEffect, useRef} from "react";
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import axios from 'axios';
import {API_URL} from '../config/config.js';


const AdminPanel = () => {
    const navigate = useNavigate();
    const isAdmin = useRef(false);
    const fetchIsAdmin = async () => {
        const response = await axios.get(`${API_URL}/is_user_admin`);
        isAdmin.current = response.data;
        console.log(isAdmin.current, "ai admin");
        if(!isAdmin.current) {
            navigate("/login")
        }
    };

    useEffect(() => {
        fetchIsAdmin();
    }, []);
    
    return (
        <div>
            Admin Panel: <br/>
            <Link to="/admin/users">Users</Link> |
            <Link to="/admin/histories">Histories of orders</Link>
        </div>
    );
};

export default AdminPanel;