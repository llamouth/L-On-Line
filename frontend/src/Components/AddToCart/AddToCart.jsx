import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import "./AddToCart.scss";

const AddToCart = ({ userId, product, setShowPopUp, showPopUp }) => {

    const API = import.meta.env.VITE_BASE_URL;
    const navigate = useNavigate();

    const [updateCart, setUpdateCart] = useState(false)
    const [newItem, setNewItem] = useState({
        carts_owner: +userId,
        products_id: product.id,
        products_quantity: 1,
        ordered: false
    });

    const handleSubmit = async () => {
        setUpdateCart(!updateCart)
        if (updateCart) {
            await fetch(`${API}/carts`, {
                method: "POST",
                body: JSON.stringify(newItem),
                headers: {
                    "Content-type": "application/json"
                }
            })
            .then(res => res.json() )
            .then(res => {
                setUpdateCart(!updateCart)
                navigate(`/user/${userId}/cart`);
            })
            .catch(err => console.error(err));
        } 
    };

    const handlePopUp = () => {
        
    }

    return (
        <>
            <div className='confirmAdd-overlay' onClick={() => setShowPopUp(false)}></div>
            <div className='confirmAdd'>
                <p>Are you sure you ant to add to cart?</p>
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
