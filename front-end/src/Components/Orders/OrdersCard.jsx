import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/esm/Button';
import { Link } from 'react-router-dom';

import EditOrder from './EditOrder';

const OrdersCard = ({order, distributorsOrders, setDistributorsOrders}) => {

  const API = import.meta.env.VITE_BASE_URL;
  const ORDERS_URL = `${API}/orders` 
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [editOrder, setEditOrder] = useState(false)

  const CONS_URL = `${API}/consumers/${order.consumers_id}`
  const CONS_CART_URL = `${API}/carts/${order.consumers_id}`
  const [consumerCart, setConsumerCart] = useState()
  const [ currentConsumer, setCurrentConsumer ] = useState({})

  useEffect(() => {
      fetch(CONS_URL)
      .then( res => res.json() )
      .then( res => setCurrentConsumer(res) )
      .catch( err => console.error(err) )

      fetch(CONS_CART_URL)
      .then( res => res.json() )
      .then( res => setConsumerCart(res) )
      .catch( err => console.error(err) )
  }, [])

  const handleSubmit = () => {
    fetch(`${ORDERS_URL}/${order.order_id}`, {
      method: "DELETE"
    })
    .then( res => res.json() )
    .then( res => {
      setDistributorsOrders((prevState) => {
        prevState.splice(distributorsOrders.indexOf(order), 1)
        return prevState
      })
      setConfirmDelete(false)
    })
  }


  return (
    <li key={order.order_id}>
      <h3>Order ID: {order.order_id}</h3>
      {/* <p>User ID: {user.user_full_name}</p> */}
      <h4>Cart Products:</h4>
      <ul>
        {(order.products.length > 0 && !editOrder) ? (
          order.products.map((product) => {
            return <li key={product.product_id}>{product.product_name} - {product.products_quantity}</li>
          })
        ) : (order.products.length > 0 && editOrder) ? (
          order.products.map((product) => {
            return <EditOrder key={product.product_id} product={product} order={order} consumerCart={consumerCart}/>
          })
        ) : (
          <li>No products in cart</li>
        )}
      </ul>
      <div className="buttons-container">
        <Button onClick={() => setEditOrder(!editOrder)}>Edit</Button>
        <Button onClick={() => setConfirmDelete(true)}>Submit</Button>
      </div>
      {/* {editOrder &&
        <EditOrder order={order} setEditOrder={setEditOrder}/>
      } */}
      {confirmDelete && 
        <>
          <div className='confirmAdd-overlay'></div>
          <div className="confirm-submit">
            <p>Are you ready to submit this order?</p>
            <div className="buttons-container">
              <Button onClick={handleSubmit}>Yes</Button>
              <Button onClick={() => setConfirmDelete(false)}>No</Button>
            </div>
          </div>
        </>
      }
    </li>
  );
};

export default OrdersCard;