import React from 'react';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';


const ProductCard = ({product}) => {

    const { product_name, product_price, description, consumers_id, distributor_id } = product;

    console.log(product)
    return( 
      <li>
        <Card>
          <Card.Img variant="top" src="holder.js/100px160" />
          <Card.Body>
            <Card.Title>{product_name}</Card.Title>
            <Card.Text>
              {`$ ${product_price}`}
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <small className="text-muted">Last updated 3 mins ago</small>
          </Card.Footer>
        </Card>
      </li>
  );
};

export default ProductCard;