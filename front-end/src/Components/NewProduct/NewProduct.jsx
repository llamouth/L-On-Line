import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

const NewProduct = ({token}) => {

    const API = import.meta.env.VITE_BASE_URL;
    const navigate = useNavigate();
    const [newProduct, setNewProduct] = useState({
        distributor_id: token.distid,
        consumers_id: null,
        product_name: "",
        product_price: "",
        description: "",
        image_url: ""
    })

    const handleChange = (e) => {
        setNewProduct((prevState) => {
            return { ...prevState, [e.target.name]: e.target.value}
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        fetch(`${API}/products`, {
            method: "POST",
            body: JSON.stringify(newProduct),
            headers: {
                "Content-type": "application/json"
            }
        })
        .then( res => res.json() )
        .then( res => {
            navigate("/products")
        })
    }
    
    return (
        <Form onSubmit={handleSubmit} className="form">
            <Form.Group className="form-group">
                <Form.Label>Product Name</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter Product Name"
                    onChange={handleChange}
                    name="product_name"
                    required
                />
                <Form.Text className="text-muted">
                   Name of Product
                </Form.Text>
            </Form.Group>
            <Form.Group className="form-group">
                <Form.Label>Product Price</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter a price"
                    onChange={handleChange}
                    name="product_price"
                    required
                />
                <Form.Text className="text-muted">Set a price</Form.Text>
            </Form.Group>
            <Form.Group className="form-group">
                <Form.Label>Description</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Description"
                    onChange={handleChange}
                    name="description"
                />
            </Form.Group>
            <Form.Group className="form-group">
                <Form.Label>Image URL</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Image URL"
                    onChange={handleChange}
                    name="image_url"
                />
                <Form.Text className="text-muted">
                    Set your first name
                </Form.Text>
            </Form.Group>
            <Button type="submit" className="submit-button">
                Submit
            </Button>
        </Form>
    );
};

export default NewProduct;