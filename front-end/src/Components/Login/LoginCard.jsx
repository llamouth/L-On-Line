import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import './LoginCard.scss';

const LoginCard = ({ setToken, setConsumerId }) => {
    const API = import.meta.env.VITE_BASE_URL;

    const [consumers, setConsumers] = useState([]);
    const [current, setCurrent] = useState({
        username: "",
        password: ""
    });

    const handleChange = (e) => {
        setCurrent((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const foundUser = consumers.find(user =>
            user.username === current.username && user.password === current.password
        );

        if (foundUser) {
            const token = { token: current.username, consid: foundUser.consid }; 
            setConsumerId(foundUser.consid);
            setToken(token);
        } else {
            console.error("User not found or password incorrect");
        }
    };

    useEffect(() => {
        fetch(`${API}/consumers`)
            .then(res => res.json())
            .then(res => setConsumers(res))
            .catch(err => console.error(err));
    }, [API]);

    return (
        <div className='login-card'>
            <div className='form-container'>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder='Username' name="username" onChange={handleChange} />
                    <input type="password" placeholder='Password' name="password" onChange={handleChange} />
                    <Button type='submit'>Log in</Button>
                </form>
            </div>
            <div className='image-container'>
                <img src='../../../Images/Lonline.png' alt="Login" />
            </div>
        </div>
    );
};

LoginCard.propTypes = {
  setToken: PropTypes.func.isRequired,
  setConsumerId: PropTypes.func.isRequired
}

export default LoginCard;
