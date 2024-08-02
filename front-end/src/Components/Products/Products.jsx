import React, { useEffect, useState } from 'react';
import ProductCard from '../ProductCard/ProductCard';
import './Products.scss'; 
import { fetchPhotos } from '../../utils/fetchPhotos';

const Products = ({userId}) => {
    const API = import.meta.env.VITE_BASE_URL;
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const updateProductsWithPhotos = async () => {
            try {
                const photos = await fetchPhotos(products);

                const updatedProducts = products.map((product, index) => {
                    const photo = photos[index];
                    return {
                        ...product,
                        product_image: photo ? photo.urls.small : null,
                    };
                });

                setProducts(updatedProducts);
            } catch (error) {
                console.error('Error fetching multiple items:', error);
            }
        };

        if (products.length > 0) {
            updateProductsWithPhotos();
        }
    }, [products]);


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
                        <ProductCard product={product} key={product.id} userId={userId}/>
                    ))}
                </div>
            ) : (
                <p>No products available</p>
            )}
        </div>
    );
};

export default Products;
