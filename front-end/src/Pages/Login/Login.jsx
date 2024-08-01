import React, { useState, useEffect } from 'react';
import LoginCard from '../../Components/Login/LoginCard';
import { useNavigate } from 'react-router-dom';
import './Login.scss';

const Login = ({ setToken, token }) => {
    const [consumerId, setConsumerId] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        if (token && consumerId) {
            navigate(`/user/${consumerId}`);
        }
    }, [consumerId, token, navigate]);

    return (
        <div className='login'>
            <LoginCard setToken={setToken} setConsumerId={setConsumerId} />
        </div>
    );
};

export default Login;
