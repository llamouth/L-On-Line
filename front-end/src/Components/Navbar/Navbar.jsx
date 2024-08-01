import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Logout from '../LogOut/LogOut';
import { Link } from 'react-router-dom';
import './Navbar.scss'; // Import the SCSS file

function NavDisplay({ token }) {
    return (
        <Navbar key="md" expand="md" className="navbar">
            <Container fluid>
                <Navbar.Brand>
                    <Link to='/' className='link'>L-On-Line</Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-md`} />
                <Navbar.Offcanvas
                    id={`offcanvasNavbar-expand-md`}
                    aria-labelledby={`offcanvasNavbarLabel-expand-md`}
                    placement="end"
                >
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title id={`offcanvasNavbarLabel-expand-md`}>
                        </Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <Nav className="justify-content-end flex-grow-1 pe-3">
                            <Nav.Link>
                                <Link to="/" className='link-in-link'>Home</Link>
                            </Nav.Link>
                            <Nav.Link href="#action2">
                            <Link to="/products" className='link-in-link'> Products</Link>
                            </Nav.Link>
                            <NavDropdown title="Dropdown" id={`offcanvasNavbarDropdown-expand-md`}>
                                <NavDropdown.Item href="#action4">
                                    Another action
                                </NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item>
                                    {token ? (
                                        <Logout />
                                    ) : (
                                        <Link to="/login">
                                            <Button>Log In</Button>
                                        </Link>
                                    )}
                                </NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                        <Form className="d-flex">
                            <Form.Control
                                type="search"
                                placeholder="Search"
                                className="me-2"
                                aria-label="Search"
                            />
                            <Button variant="outline-success">Search</Button>
                        </Form>
                    </Offcanvas.Body>
                </Navbar.Offcanvas>
            </Container>
        </Navbar>
    );
}

export default NavDisplay;
