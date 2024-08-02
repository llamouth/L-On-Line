import React from 'react';
import Products from '../../Components/Products/Products';
import './ProductList.scss'; // Import the SCSS file for custom styles

const ProductList = ({userId}) => {
    return (
        <div className="product-list">
            <h3 className="page-title">Products Page</h3>
            <Products userId={userId}/>
        </div>
    );
};

export default ProductList;
