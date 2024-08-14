import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import './FourZeroFour.scss';

const FourZeroFour = () => {

    const navigate = useNavigate()

    return (
        <div className="not-found">
            <h1>404</h1>
            <p>Oops! The page you're looking for doesn't exist or you need to <span className='login-button' onClick={() => navigate("/login")}>Log in</span></p>
            <Button as={Link} to="/" className="home-button">Go Home</Button>
        </div>
    );
};

export default FourZeroFour;
