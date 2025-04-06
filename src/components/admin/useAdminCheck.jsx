import { useEffect, useState } from "react";
import axios from "axios";
import {API_URL} from '../../config/config';

const useAdminCheck = () => {
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const fetchIsAdmin = async () => {
            try {
                const response = await axios.get(`${API_URL}/is_user_admin`,
                    {withCredentials: true});
                setIsAdmin(response.data);
            } catch (error) {
                setIsAdmin(false);
            }
        };

        fetchIsAdmin();
    }, []);

    return isAdmin;
};

export default useAdminCheck;
