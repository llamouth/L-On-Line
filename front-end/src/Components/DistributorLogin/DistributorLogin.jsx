import React, { useEffect, useState } from 'react';
import LoginCard from '../../Components/Login/LoginCard';
import { useNavigate } from 'react-router-dom';

const DistributorLogin = ({ setToken, token }) => {
    const [distributorId, setDistributorId] = useState();
    const [dist, setDist] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (token && distributorId) {
            navigate(`/distributor/${distributorId}`);
        }
    }, [token, distributorId, navigate]);

    
    return <LoginCard setToken={setToken} setUserId={setDistributorId} dist={dist}/>;
};

export default DistributorLogin;
