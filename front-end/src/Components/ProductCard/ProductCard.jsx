import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/esm/Button';

import placeholderImage from "../../../Images/placeholderImage.jpeg"
import './ProductCard.scss'; 

import AddToCart from '../AddToCart/AddToCart';
import RemoveFromCart from '../RemoveFromCart/RemoveFromCart';


const ProductCard = ({ product, userId, userCart }) => {
    const { product_name, product_price, description, consumers_id, distributor_id, product_image } = product;
    const [showPopUp, setShowPopUp] = useState(false)

    const handleClick = () => {
        setShowPopUp(!showPopUp)
    }

    return (
        <Card className="product-card">
            <Card.Img variant="top" src={product_image || placeholderImage} />
            <Card.Body>
                <Card.Title>{product_name}</Card.Title>
                <Card.Text>
                    {description || "No description available"}
                </Card.Text>
                <Card.Text className="price">
                    {`$ ${product_price}`}
                </Card.Text>
            </Card.Body>
            <Card.Footer>
                {!product.quantity ?
                        <Button 
                            style={{
                                background: "#02243D",
                                border: "none"
                            }} 
                            onClick={handleClick}>
                                Add to Cart
                        </Button>
                    :
                        <Button 
                            style={{
                                background: "#02243D",
                                border: "none"
                            }}
                            onClick={handleClick}> 
                                Update Cart
                        </Button>

                }
            </Card.Footer>
            {(showPopUp && !product.quantity) && <AddToCart product={product} userId={userId} setShowPopUp={setShowPopUp}/> }
            {(showPopUp && product.quantity) && <RemoveFromCart setShowPopUp={setShowPopUp} product={product} userId={userId}/>}
        </Card>
    );
};

export default ProductCard;
