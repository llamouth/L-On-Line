import React from 'react';
import ProductCard from '../Components/ProductCard';

const ProductList = ({products, setProducts}) => {


    return (
        <div>
            {Array.isArray(products) && 
                products.map( product => {
                    return (
                        <>
                            <ProductCard product={product} key={product.id} />
                            <br />
                        </>
                    )
                }
            )}
        </div>
    );
};

export default ProductList;