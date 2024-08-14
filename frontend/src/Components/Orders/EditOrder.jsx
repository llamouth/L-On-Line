import React, { useEffect, useState } from 'react';

const EditOrder = ({product, consumerCart}) => {

    const API = import.meta.env.VITE_BASE_URL;
    const [ editConsumer, setEditConsumer] = useState({})
    const [currentProduct, setCurrentProduct] = useState({})
    const [productQuantity, setProductQuantity] = useState(0)

    const handleProductQuantity = (e) => {
        setProductQuantity(e.target.value)
        setCurrentProduct((prevState) => {
            return {...prevState, products_quantity: e.target.value}
        })
    }

    const handleChange = () => {

    }

    useEffect(() => {
        setCurrentProduct(() => {
            if(Array.isArray(consumerCart)){
                const prod = consumerCart.find(produc => produc.products_id === product.product_id)
                return prod || null
            }
        })
    },[])

    useEffect(() => {
        setProductQuantity(currentProduct.products_quantity)
    }, [currentProduct])

    useEffect(() => {
        setEditConsumer({
        first_name: currentConsumer.first_name,
        last_name: currentConsumer.last_name,
        username: currentConsumer.username,
        password: currentConsumer.password,
        address: currentConsumer.address
        })
    }, [])



    return (
        <li className='consumer-order-card'>
            <label htmlFor="">{product.product_name}</label>
            <input type="number" name='' value={productQuantity} onChange={handleProductQuantity} />
            <label htmlFor="">First Name</label>
            <input type='text' name='first_name' onChange={handleChange}/>
            <label htmlFor=""> Name</label>
            <input type='text' name='_name' onChange={handleChange}/>
            <label htmlFor="">First Name</label>
            <input type='text' name='first_name' onChange={handleChange}/>
        </li>
    );
};

export default EditOrder;