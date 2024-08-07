import React, {useEffect, useState} from 'react';
import "./Orders.scss"
import OrdersCard from '../../Components/Orders/OrdersCard';
import Button from 'react-bootstrap/esm/Button';
import { Link } from 'react-router-dom';

const Orders = ({token}) => {

    const API = import.meta.env.VITE_BASE_URL;
    const [distributorsOrders, setDistributorsOrders] = useState([]) 

    useEffect(() => {
        fetch(`${API}/orders/${token.distid}`)
        .then( res => res.json())
        .then( res => setDistributorsOrders(res))
        .catch( err => console.error(err))
    },[])

    return (
        <div className="orders-container">
            <h2>Orders</h2>
            <ul>
                {distributorsOrders.map((order) => {
                    return <OrdersCard order={order} key={order.order_id} distributorsOrders={distributorsOrders} setDistributorsOrders={setDistributorsOrders}/>
                })}
            </ul>
            <div className="add-product-container">
                <Button as={Link} to='/create/product' className='add-product-button'>Add A Product</Button>
            </div>
        </div>
    );
};

export default Orders;