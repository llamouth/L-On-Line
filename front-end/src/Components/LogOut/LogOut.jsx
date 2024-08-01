import React from 'react';
import { useNavigate } from 'react-router-dom';
import useToken from '../../Components/Login/UseToken';
import Button from 'react-bootstrap/esm/Button';

const Logout = () => {
    const { removeToken } = useToken();
    const navigate = useNavigate();

    const handleLogout = () => {
        removeToken();
        navigate('/login');
    };

    return (
        <Button onClick={handleLogout} className='logout-button'>Logout</Button>
    );
};

export default Logout;
