import React, { useEffect } from 'react';
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
                <Button as={Link} className='buttons-container__button' to={`/user/${id}/cart`} >View Cart</Button>
                <Button as={Link} to='/products' className='buttons-container__button' >View Products</Button>
            </div>
        </div>
    );
};

export default UserPage;