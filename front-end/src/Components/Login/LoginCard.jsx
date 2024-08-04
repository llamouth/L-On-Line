import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import './LoginCard.scss';
import image1 from "../../../Images/Lonline.png"

const LoginCard = ({ setToken, setUserId, dist}) => {
    
    const API = import.meta.env.VITE_BASE_URL;

    const [users, setUsers] = useState([]);
    const [current, setCurrent] = useState({
        username: "",
        password: ""
    });

    const handleChange = (e) => {
        setCurrent((prevState) => {
           return  {...prevState,[e.target.name]: e.target.value}
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const foundUser = users.find(user => user.username === current.username && user.password === current.password);

        if (foundUser && dist) {
            setUserId(foundUser.distid)
        } else if(foundUser){
            setUserId(foundUser.consid);
        }else {
            console.error("User not found or password incorrect");
            return;
        }
        setToken(foundUser);
    };

    useEffect(() => {
        fetch(`${API}/${dist ? "distributors" : "consumers"}`)
            .then(res => res.json())
            .then(res => setUsers(res))
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
                <img src={image1} alt="Login" />
            </div>
        </div>
    );
};

LoginCard.propTypes = {
  setToken: PropTypes.func.isRequired,
  setUserId: PropTypes.func.isRequired
}

export default LoginCard;
