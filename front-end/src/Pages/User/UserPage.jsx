import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { Link, useParams } from 'react-router-dom';
import './UserPage.scss';
import FourZeroFour from '../../Components/FourZeroFour/FourZeroFour';

const UserPage = ({setUserId, token}) => {

    const { id } = useParams();

    useEffect(() => {
        setUserId(id)
    }, [])

    if(!token){
        return <FourZeroFour/>
    }

    return (
        <div className='user-page'>
            <div className='buttons-container'>
                <Link className='link-in-link' to={`/user/${id}/cart`} >
                    <Button className='buttons-container__button' >View Cart</Button>
                </Link>
                <Link className='link-in-link' to='/products' >
                    <Button className='buttons-container__button' >View Products</Button>
                </Link>
            </div>
        </div>
    );
};

export default UserPage;
