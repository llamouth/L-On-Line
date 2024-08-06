import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './Navbar.scss';

function NavDisplay({ token, userId, logout }) {
    const navigate = useNavigate();
    const [showDropdown, setShowDropdown] = useState(false);

    const handleClick = () => {
        navigate("/login");
        logout();
    };

    const handleToggle = (isOpen) => {
        setShowDropdown(isOpen);
    };

    const handleSelect = () => {
        setShowDropdown(false);
    };

    return (
        <Navbar expand="md" className="navbar">
            <Navbar.Brand as={Link} to='/' className='link'>L-On-Line</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbar-nav" />
            <Navbar.Collapse id="navbar-nav">
                <Nav className="navbar-nav">
                    <Nav.Link as={Link} to="/">Home</Nav.Link>
                    <Nav.Link as={Link} to="/products">Products</Nav.Link>
                    {!token && (
                        <NavDropdown title="Login" id="basic-nav-dropdown" className="nav-dropdown" show={showDropdown} onToggle={handleToggle} onSelect={handleSelect}>
                            <NavDropdown.Item as={Link} to="/login">User Log In</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/distributor-login">Distributor Log In</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item as={Link} to="/create/user">Create user</NavDropdown.Item>
                        </NavDropdown>
                    )}
                    {token && (
                        <>
                            {token.consid && <Nav.Link as={Link} to={`/user/${userId}/cart`}>My Cart</Nav.Link>}
                            {token.distid && <Nav.Link as={Link} to={`/distributor/${userId}`}>Orders</Nav.Link>}
                            <Button onClick={handleClick} className="logout-button">Logout</Button>
                        </>
                    )}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default NavDisplay;
