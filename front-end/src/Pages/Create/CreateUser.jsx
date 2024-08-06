import React, { useState } from 'react';
import Form from "react-bootstrap/Form"
import Button from 'react-bootstrap/esm/Button';
import { useNavigate } from 'react-router-dom';

const CreateUser = () => {

    const API = import.meta.env.VITE_BASE_URL
    const navigate = useNavigate()
    const [isDist, setisDist] = useState(false)
    const [newUser, setNewUser] = useState({
        username: "",
        password: ""
    })
    const [newConsumer, setNewConsumer] = useState({
        first_name: "",
        last_name: "",
        address: ""
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        if(isDist){
            fetch(`${API}/distributors`, {
                method: "POST",
                body: JSON.stringify(newUser),
                headers:{
                    "Content-type": "application/json"
                }
            })
            .then( res => res.json())
            .then( res => {
                navigate(`/distributor-login`)
            })
            .catch( err => console.error(err) )
        }else {
            fetch(`${API}/consumers`, {
                method: "POST",
                body: JSON.stringify({...newUser, ...newConsumer}),
                headers:{
                    "Content-type": "application/json"
                }
            })
            .then( res => res.json())
            .then( res => {
                navigate(`/login`)
            })
            .catch( err => console.error(err) )
        }
    }

    const handleConsumerChange = (e) => {
        setNewConsumer((prevState) => {
            return {...prevState, [e.target.name]: e.target.value}
        })
    }

    const handleUserChange = (e) => {
        setNewUser((prevState) => {
            return {...prevState, [e.target.name]: e.target.value}
        })
    }
    

    return (
        <div className="form-container">
            <h2>Create New User</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Distributor?" onChange={() => setisDist(!isDist)}/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="Enter a username" onChange={handleUserChange} name='username' required/>
                    <Form.Text className="text-muted">
                        What would you like your username to be?
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="text" placeholder="Enter a password" onChange={handleUserChange} name='password' required/>
                    <Form.Text className="text-muted">
                        Set a password
                    </Form.Text>
                </Form.Group>
                {!isDist &&
                    <>
                        <Form.Group className="mb-3">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type="text" placeholder="First Name" onChange={handleConsumerChange} name='first_name'/>
                            <Form.Text className="text-muted">
                                Set your first name 
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type="text" placeholder="Last Name" onChange={handleConsumerChange} name='last_name'/>
                            <Form.Text className="text-muted">
                                Set your last name 
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Address</Form.Label>
                            <Form.Control type="text" placeholder="Address" onChange={handleConsumerChange} name='address'/>
                            <Form.Text className="text-muted">
                                What is your address? 
                            </Form.Text>
                        </Form.Group>
                    </>
                }
                <Button as="input" type="submit" value="Submit" />
            </Form>
        </div>
    );
};

export default CreateUser;