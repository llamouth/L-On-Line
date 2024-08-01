import React, { useEffect, useState } from 'react';
import ProductCard from '../ProductCard/ProductCard';
import './Products.scss'; // Import the SCSS file for custom styles

const Products = () => {
    const API = import.meta.env.VITE_BASE_URL;
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch(`${API}/products`)
            .then(res => res.json())
            .then(res => setProducts(res))
            .catch(err => console.error(err));
    }, [API]);

    return (
        <div className="products-container">
            {Array.isArray(products) && products.length > 0 ? (
                <div className="product-grid">
                    {products.map(product => (
                        <ProductCard product={product} key={product.id} />
                    ))}
                </div>
            ) : (
                <p>No products available</p>
            )}
        </div>
    );
};

export default Products;
