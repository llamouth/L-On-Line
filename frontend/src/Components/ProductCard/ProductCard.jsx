import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/esm/Button';

import placeholderImage from "../../../Images/placeholderImage.jpeg"
import './ProductCard.scss'; 

import AddToCart from '../AddToCart/AddToCart';
import RemoveFromCart from '../RemoveFromCart/RemoveFromCart';


const ProductCard = ({ product, userId, setUserCart }) => {

    const API = import.meta.env.VITE_BASE_URL;
    const { product_name, product_price, description, consumers_id, distributor_id, image_url } = product;
    const [showPopUp, setShowPopUp] = useState(false);
    const [distName, setDistName] = useState("")

    useEffect(() => {
        fetch(`${API}/distributors/${distributor_id}`)
        .then( res => res.json() )
        .then( res => setDistName(res[0].username))
        .catch( err => console.error(err))
    },[])

    const handleClick = () => {
        setShowPopUp(!showPopUp)
    }

    return (
        <Card className="product-card">
            <Card.Img variant="top" src={image_url || placeholderImage} />
            <Card.Body>
                <Card.Title>{product_name}</Card.Title>
                <Card.Text>
                    {description || "No description available"}
                </Card.Text>
                <Card.Text className="price">
                    {`$ ${product_price}`}
                </Card.Text>
                <Card.Text className="dist-name">
                    {` Seller: ${distName}`}
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
            {(showPopUp && !product.quantity) && <AddToCart product={product} userId={userId} setShowPopUp={setShowPopUp} showPopUp={showPopUp}/> } {/*CONSUMER*/}
            {(showPopUp && product.quantity) && <RemoveFromCart setShowPopUp={setShowPopUp} product={product} userId={userId} setUserCart={setUserCart} />} {/*DISTRIBUTOR*/}
        </Card>
    );
};

export default ProductCard;
