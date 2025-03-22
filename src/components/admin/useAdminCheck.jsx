import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {API_URL} from '../../config/config';

const useAdminCheck = () => {
    const isAdmin = useRef(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchIsAdmin = async () => {
            try {
                const response = await axios.get(`${API_URL}/is_user_admin`, {withCredentials: true});
                isAdmin.current = response.data;
                console.log(isAdmin.current, "is admin");
                if (!isAdmin.current) {
                    navigate("/login");
                }
            } catch (error) {
                console.error("Error checking admin status:", error);
                navigate("/login");
            }
        };

        fetchIsAdmin();
    }, [navigate]);

    return isAdmin.current;
};

export default useAdminCheck;
