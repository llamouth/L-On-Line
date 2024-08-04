import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './Navbar.scss';

function NavDisplay({ token, userId, logout }) {

    const navigate = useNavigate()

    const handleClick = () => {
        navigate("/login")
        logout()
    }

    return (
        <Navbar expand="md" className="navbar">
            <Navbar.Brand>
                <Link to='/' className='link'>L-On-Line</Link>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="navbar-nav" />
            <Navbar.Collapse id="navbar-nav">
                <Nav className="navbar-nav">
                    <Nav.Link as={Link} to="/">Home</Nav.Link>
                    <Nav.Link as={Link} to="/products">Products</Nav.Link>
                    {token && (
                        <>
                            {token.consid &&
                                <Nav.Link as={Link} to={`/user/${userId}/cart`}>My Cart</Nav.Link>
                            }
                            <Button onClick={handleClick} className='logout-button'>Logout</Button>
                        </>
                    )}
                    {!token && (
                        <>
                            <Nav.Link as={Link} to="/login">
                                <Button>Log In</Button>
                            </Nav.Link>
                            <Nav.Link as={Link} to="/distributor-login">
                                <Button> Distributor Log In</Button>
                            </Nav.Link>
                        </>
                    )}

                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default NavDisplay;
