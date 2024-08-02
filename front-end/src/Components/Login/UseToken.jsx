import { useState } from 'react';

export default function useToken() {
    const getToken = () => {
        const tokenString = sessionStorage.getItem('token');
        try {
            const userToken = JSON.parse(tokenString);
            return userToken?.token || null;
        } catch {
            return null;
        }
    };

    const [token, setToken] = useState(getToken());

    const saveToken = (userToken) => {
        sessionStorage.setItem('token', JSON.stringify(userToken.token));
        setToken({username: userToken.token, consid: userToken.consid});
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
