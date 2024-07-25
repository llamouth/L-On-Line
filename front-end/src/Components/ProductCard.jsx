import React from 'react';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';


const ProductCard = ({product}) => {

    const { productname, productprice, description, consumers_id, distributor_id } = product;

    return( 
      <Card>
        <Card.Img variant="top" src="holder.js/100px160" />
        <Card.Body>
          <Card.Title>{productname}</Card.Title>
          <Card.Text>
            {productprice}
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <small className="text-muted">Last updated 3 mins ago</small>
        </Card.Footer>
      </Card>
  );
};

export default ProductCard;