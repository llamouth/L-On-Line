import React, { useEffect, useState } from 'react';
import LoginCard from '../../Components/Login/LoginCard';
import { useNavigate } from 'react-router-dom';

const Login = ({ setToken, token }) => {
    const [consumerId, setConsumerId] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        if (token && consumerId) {
            navigate(`/user/${consumerId}`);
        }
    }, [token, consumerId, navigate]);
    
    return <LoginCard setToken={setToken} setUserId={setConsumerId} />; 
};

export default Login;
