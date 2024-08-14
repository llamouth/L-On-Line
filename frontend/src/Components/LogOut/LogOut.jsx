import React from 'react';
import { useNavigate } from 'react-router-dom';
import useToken from '../../Components/Login/UseToken';
import Button from 'react-bootstrap/Button';

const Logout = () => {
    const { token, removeToken } = useToken();
    const navigate = useNavigate();

    const handleLogout = () => {
        removeToken();
        if(token.distid){
            navigate('/distributor-login')
        }else{
            navigate('/login');
        }
    };

    return (
        <Button onClick={handleLogout} className='logout-button'>
            Logout
        </Button>
    );
};

export default Logout;
