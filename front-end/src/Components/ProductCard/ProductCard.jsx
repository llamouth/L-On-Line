import React from 'react';
import Card from 'react-bootstrap/Card';
import './ProductCard.scss'; // Import the SCSS file for custom styles

const ProductCard = ({ product }) => {
    const { product_name, product_price, description, consumers_id, distributor_id } = product;

    return (
        <Card className="product-card">
            <Card.Img variant="top" src="holder.js/100px160" />
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
                <small className="text-muted">Last updated 3 mins ago</small>
            </Card.Footer>
        </Card>
    );
};

export default ProductCard;
