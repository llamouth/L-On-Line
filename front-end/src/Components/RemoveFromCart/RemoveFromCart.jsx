import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

const RemoveFromCart = ({ setShowPopUp, userId, product }) => {
    const API = import.meta.env.VITE_BASE_URL;
    const navigate = useNavigate();

    const [currentProduct, setCurrentProduct] = useState({
        carts_owner: userId,
        products_id: product.id,
        products_quantity: product.quantity,
        ordered: false
    });

    const handleDelete = () => {
        fetch(`${API}/carts/${product.cart_product_id}`, {
            method: "DELETE"
        })
        .then(res => res.json())
        .then(res => {
            console.log(res)
            setShowPopUp(false);
        })
        .catch(err => console.error(err));
    };

    const handleSubmit = () => {
        if (currentProduct.products_quantity !== 0) {
            fetch(`${API}/carts/${product.cart_product_id}`, {
                method: "PUT",
                body: JSON.stringify(currentProduct),
                headers: {
                    "Content-type": "application/json"
                }
            })
            .then(res => res.json())
            .then(res => {
                setShowPopUp(false);
            })
            .catch(err => console.error(err));
        } else {
            handleDelete();
        }
    };

    const handleClick = (e) => {
        const value = e.target.value;
        if (value >= 0) {
            setCurrentProduct((prevState) => ({
                ...prevState,
                products_quantity: value
            }));
        }
    };

    return (
        <>
            <div className='confirmAdd-overlay' onClick={() => setShowPopUp(false)}></div>
            <div className='confirmAdd'>
                <p>Set a new quantity</p>
                <input type='number' value={currentProduct.products_quantity} onChange={handleClick} />
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
                        onClick={handleDelete}>
                        Delete All
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

export default RemoveFromCart;
