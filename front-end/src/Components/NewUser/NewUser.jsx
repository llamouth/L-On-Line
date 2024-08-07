import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import './NewUser.scss';

const NewUser = () => {
    const API = import.meta.env.VITE_BASE_URL;
    const navigate = useNavigate();
    const [isDist, setisDist] = useState(false);
    const [passwordsMatch, setPasswordsMatch] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState('');
    const [newUser, setNewUser] = useState({
        username: '',
        password: ''
    });
    const [newConsumer, setNewConsumer] = useState({
        first_name: '',
        last_name: '',
        address: ''
    });

    const handleConfirmPassword = (e) => {
        setConfirmPassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (newUser.password !== confirmPassword) {
            setPasswordsMatch(false);
            return;
        }
        setPasswordsMatch(true);

        if (isDist) {
            fetch(`${API}/distributors`, {
                method: 'POST',
                body: JSON.stringify(newUser),
                headers: {
                    'Content-type': 'application/json'
                }
            })
                .then((res) => res.json())
                .then(() => {
                    navigate(`/distributor-login`);
                })
                .catch((err) => console.error(err));
        } else {
            fetch(`${API}/consumers`, {
                method: 'POST',
                body: JSON.stringify({ ...newUser, ...newConsumer }),
                headers: {
                    'Content-type': 'application/json'
                }
            })
                .then((res) => res.json())
                .then(() => {
                    navigate(`/login`);
                })
                .catch((err) => console.error(err));
        }
    };

    const handleConsumerChange = (e) => {
        setNewConsumer((prevState) => {
            return { ...prevState, [e.target.name]: e.target.value };
        });
    };

    const handleUserChange = (e) => {
        setNewUser((prevState) => {
            return { ...prevState, [e.target.name]: e.target.value };
        });
    };

    return (
        <Form onSubmit={handleSubmit} className="form">
            <Form.Group className="form-group full-width">
                <Form.Check
                    type="checkbox"
                    label="Distributor?"
                    onChange={() => setisDist(!isDist)}
                />
            </Form.Group>
            <Form.Group className="form-group">
                <Form.Label>Username</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter a username"
                    onChange={handleUserChange}
                    name="username"
                    required
                />
                <Form.Text className="text-muted">
                    What would you like your username to be?
                </Form.Text>
            </Form.Group>
            <Form.Group className="form-group">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter a password"
                    onChange={handleUserChange}
                    name="password"
                    required
                />
                <Form.Text className="text-muted">Set a password</Form.Text>
            </Form.Group>
            <Form.Group className="form-group">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Confirm your password"
                    onChange={handleConfirmPassword}
                    name="confirmPassword"
                    required
                />
                {!passwordsMatch && (
                    <Form.Text className="text-danger">
                        Passwords do not match!
                    </Form.Text>
                )}
            </Form.Group>
            <Form.Group className="form-group">
                <Form.Check
                    type="checkbox"
                    label="Show Password"
                    onChange={() => setShowPassword(!showPassword)}
                />
            </Form.Group>
            {!isDist && (
                <>
                    <Form.Group className="form-group">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="First Name"
                            onChange={handleConsumerChange}
                            name="first_name"
                        />
                        <Form.Text className="text-muted">
                            Set your first name
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="form-group">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Last Name"
                            onChange={handleConsumerChange}
                            name="last_name"
                        />
                        <Form.Text className="text-muted">
                            Set your last name
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="form-group full-width">
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Address"
                            onChange={handleConsumerChange}
                            name="address"
                        />
                        <Form.Text className="text-muted">
                            What is your address?
                        </Form.Text>
                    </Form.Group>
                </>
            )}
            <Button type="submit" className="submit-button">
                Submit
            </Button>
        </Form>
    );
};

export default NewUser;
