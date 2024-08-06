import React from 'react';
import LogoCarousel from '../../Components/LogoCarousel/LogoCarousel';
import Button from 'react-bootstrap/esm/Button';
import "./Home.scss"
import { Link} from 'react-router-dom';

const Home = ({token}) => {

    return (
        <div className='home'>
            <h2>Welcome to L On Line</h2>
            <LogoCarousel/>
            {!token && <Button as={Link} to='/login' className="home__button">Login</Button>}
        </div>
    );
};

export default Home;