import React from 'react';
import LogoCarousel from '../../Components/LogoCarousel/LogoCarousel';
import Button from 'react-bootstrap/esm/Button';
import "./Home.scss"
import { Link, useNavigate } from 'react-router-dom';

const Home = () => {

    const navigate = useNavigate()

    return (
        <div className='home'>
            <h2>Welcome to L On Line</h2>
            <LogoCarousel/>
            <Link to='/login'>
                <Button className="home__button">Login</Button>
            </Link>
        </div>
    );
};

export default Home;