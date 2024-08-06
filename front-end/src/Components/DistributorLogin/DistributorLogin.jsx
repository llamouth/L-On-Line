import React, { useEffect, useState } from 'react';
import LoginCard from '../../Components/Login/LoginCard';
import { useNavigate } from 'react-router-dom';
import "./DistributorLogin.scss"

const DistributorLogin = ({ setToken, token }) => {
    const [distributorId, setDistributorId] = useState();
    const [dist, setDist] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (token && distributorId) {
            navigate(`/distributor/${distributorId}`);
        }
    }, [token, distributorId, navigate]);

    
    return (
        <>
            <h3 className='dist_header'>Distributor Login</h3>
            <LoginCard setToken={setToken} setUserId={setDistributorId} dist={dist}/>
        </>
    );
};

export default DistributorLogin;
