import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import "./AddToCart.scss";

const AddToCart = ({ userId, product, setShowPopUp }) => {

    const API = import.meta.env.VITE_BASE_URL;
    const navigate = useNavigate();

    const [newItem, setNewItem] = useState({
        carts_owner: userId,
        products_id: product.id,
        products_quantity: 0,
        ordered: false
    });

    const handleClick = (e) => {
        setNewItem((prevState) => {
            return { ...prevState, products_quantity: e.target.value };
        });
    };

    const handleSubmit = () => {
        if (newItem.products_quantity > 0) {
            fetch(`${API}/carts`, {
                method: "POST",
                body: JSON.stringify(newItem),
                headers: {
                    "Content-type": "application/json"
                }
            })
            .then(res => res.json())
            .then(res => {
                navigate(`/user/${userId}/cart`);
            })
            .catch(err => console.error(err));
        } 
    };

    return (
        <>
            <div className='confirmAdd-overlay' onClick={() => setShowPopUp(false)}></div>
            <div className='confirmAdd'>
                <p>How many would you like to add?</p>
                <input type='number' defaultValue={newItem.products_quantity} onChange={handleClick}/>
                <div className="add-buttons">
                    <Button 
                        style={{
                            background: "#02243D",
                            border: "none"
                        }} 
                        onClick={handleSubmit}>
                            Submit    
                    </Button>
                    <Button 
                        style={{
                            background: "#02243D",
                            border: "none"
                        }} 
                        onClick={() => setShowPopUp(false)}>
                            Cancel
                    </Button>
                </div>
            </div>
        </>
    );
};

export default AddToCart;
