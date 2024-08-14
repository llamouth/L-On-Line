import React, { useEffect, useState } from 'react';
import ProductCard from '../ProductCard/ProductCard';
import './Products.scss'; 
import { fetchPhotos } from '../../utils/fetchPhotos';

const Products = ({ userId }) => {
    const API = import.meta.env.VITE_BASE_URL;
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch(`${API}/products`)
            .then(res => res.json())
            .then(res => setProducts(res))
            .catch(err => console.error(err));
    }, []);

    useEffect(() => {
        const updateProductsWithPhotos = async () => {
            if(products.some(product => !product.image_url)){
                try {
                    const photos = await fetchPhotos(products);

                    const updatedProducts = await Promise.all(products.map(async (product, index) => {
                        const photo = photos[index];
                        const image_url = photo ? photo.urls.small : null;

                        if (image_url) {
                            await fetch(`${API}/products/${product.id}`, {
                                method: 'PATCH',
                                body: JSON.stringify({ image_url }),
                                headers: {
                                    'Content-Type': 'application/json'
                                }
                            });
                        }

                        return {
                            ...product,
                            image_url,
                        };
                    }));

                    setProducts(updatedProducts);
                } catch (error) {
                    console.error('Error fetching multiple items:', error);
                }
            }
        };

        if (products.length > 0) {
            updateProductsWithPhotos();
        }
    }, [products]);

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
