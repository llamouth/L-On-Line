import React, { useState } from 'react';

const RemoveFromCart = ({setShowPopUp, userId, product}) => {

    const [currentProduct, setCurrentProduct] = useState({
        
    })

    const handleSubmit = () => {

    }

    return (
        <>
        <div className='confirmAdd-overlay' onClick={() => setShowPopUp(false)}></div>
        <div className='confirmAdd'>
            <p>How many would you like to remove?</p>
            <input type='number' defaultValue={product.quantity} onChange={handleClick}/>
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
                        All
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