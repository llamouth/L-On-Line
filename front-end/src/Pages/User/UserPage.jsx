import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { Link, useParams } from 'react-router-dom';
import './UserPage.scss';

const UserPage = () => {
    const API = import.meta.env.VITE_BASE_URL;
    const { id } = useParams();
    const [currentUser, setCurrentUser] = useState({});

    useEffect(() => {
        fetch(`${API}/consumers/${id}`)
            .then(res => res.json())
            .then(res => setCurrentUser(res))
            .catch(err => console.error(err));
    }, [API, id]);

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
