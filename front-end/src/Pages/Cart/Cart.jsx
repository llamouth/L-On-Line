import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import "./Cart.scss"
import ProductCard from '../../Components/ProductCard/ProductCard';
import Button from 'react-bootstrap/Button';
import FourZeroFour from '../../Components/FourZeroFour/FourZeroFour';

const Cart = ({token}) => {
    const API = import.meta.env.VITE_BASE_URL;
    const { id } = useParams();
    const [currentUser, setCurrentUser] = useState({});
    const [userCart, setUserCart] = useState([]);
    const [userProducts, setUserProducts] = useState([]);
    const [totalCartAmount, setTotalCartAmount] = useState(0);

    if(id === "null" || !token){
        return <FourZeroFour/>
    }

    useEffect(() => {
        fetch(`${API}/consumers/${id}`)
            .then(res => res.json())
            .then(res => setCurrentUser(res))
            .catch(err => console.error(err));
    }, [id]);

    useEffect(() => {
    
        fetch(`${API}/carts/${id}`)
            .then(res => res.json())
            .then(res => setUserCart(res))
            .catch(err => console.error(err));
    }, [id]);

    useEffect(() => {
    
        const productIds = [...new Set(userCart.map(item => item.products_id))];
    
        Promise.all(
            productIds.map(productId =>
                fetch(`${API}/products/${productId}`)
                    .then(res => res.json())
            )
        )
        .then(products => {
            const productsWithQuantities = products.map(product => {
                const cartItem = userCart.find(item => item.products_id === product.id);
                return { ...product, quantity: cartItem ? cartItem.products_quantity : 0, cart_product_id: cartItem.cart_product_id };
            });
            setUserProducts(productsWithQuantities);
        })
        .catch(err => console.error(err));
    }, [userCart, API]);

    useEffect(() => {

        const totalAmount = userProducts.reduce((total, product) => {
            return total += parseFloat(product.product_price) * (product.quantity || 1);
        }, 0);

        setTotalCartAmount(totalAmount.toFixed(2));
    }, [userProducts]);

    const handleSubmitOrder = async () => {
        try {
            await Promise.all(
                userCart.map(async (item) => {
                    await fetch(`${API}/carts/${item.cart_product_id}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ ...item, ordered: true })
                    });
                })
            );

            await fetch(`${API}/carts/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            setUserCart([]);
            setUserProducts([]);
            setTotalCartAmount(0);

            alert("Order submitted!");
        } catch (error) {
            console.error("Error submitting order:", error);
        }
    };

    return (
        <div className="cart-container">
            <h3>{`${currentUser.first_name} ${currentUser.last_name}`}'s Cart</h3>
            <div className="product-grid">
                {userProducts.map((product) => (
                     <div className="product-card-wrapper" key={product.id}>
                        <ProductCard product={product} userCart={userCart}/>
                        <p className="product-quantity">{product.quantity}</p>
                    </div>
                ))}
            </div>
            <div className="total-submit-container">
                <div className="total-amount">
                    Total Amount: ${totalCartAmount}
                </div>
                <Button onClick={handleSubmitOrder} className="submit-order-button">Submit Order</Button>
            </div>
        </div>
    );
};

export default Cart;
