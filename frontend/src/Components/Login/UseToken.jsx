import { useState } from 'react';

export default function useToken() {
    
    const getToken = () => {
        const tokenString = sessionStorage.getItem('token');
        return tokenString ? JSON.parse(tokenString) : null;
    };

    const [token, setToken] = useState(getToken());

    const saveToken = (userToken) => {
        sessionStorage.setItem('token', JSON.stringify(userToken));
        setToken(userToken);
    };

    const removeToken = () => {
        sessionStorage.removeItem('token');
        setToken(null);
    };

    return {
        token,
        setToken: saveToken,
        removeToken
    };
}