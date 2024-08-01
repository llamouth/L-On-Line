import React, {useEffect, useState} from 'react';
import ProductCard from '../ProductCard/ProductCard';

const Products = () => {

    const API = import.meta.env.VITE_BASE_URL
    const [ products, setProducts ] = useState([])

    useEffect(() => {
        fetch(`${API}/products`)
        .then( res => res.json() )
        .then( res => setProducts(res))
        .catch( err => console.error(err) )
    },[])

    return (
        <ul>
            {Array.isArray(products) && 
                products.map( product => {
                    return (<ProductCard product={product} key={product.id}/>)
                }
            )}
        </ul>
    );
};

export default Products;