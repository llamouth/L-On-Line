import React, { useState, useEffect } from 'react';
import LoginCard from '../../Components/Login/LoginCard';
import { useNavigate } from 'react-router-dom';

const Login = ({ setToken, token }) => {
    const [consumerId, setConsumerId] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        if (token && consumerId) {
            navigate(`/user/${consumerId}`);
        }
    }, [consumerId]);
        
    return <LoginCard setToken={setToken} setConsumerId={setConsumerId} />;
    
};

export default Login;
