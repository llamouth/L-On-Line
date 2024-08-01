import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const UserPage = () => {

    const API = import.meta.env.VITE_BASE_URL;
    const { id } = useParams()
    const [currentUser, setCurrentUser] = useState({})

    useEffect(() => {
        fetch(`${API}/distributors/${id}`)
        .then( res => res.json() )
        .then( res => setCurrentUser(res))
        .catch( err => console.error(err))
    },[])

    return (
        <div>
            
        </div>
    );
};

export default UserPage;