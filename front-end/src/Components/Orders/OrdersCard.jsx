import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/esm/Button';

const OrdersCard = ({order, distributorsOrders, setDistributorsOrders}) => {

  const API = import.meta.env.VITE_BASE_URL;
  const ORDERS_URL = `${API}/orders` 
  const CONS_URL = `${API}/consumers/${order.consumers_id}`
  const CONS_CART_URL = `${API}/carts/${order.consumers_id}`
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [confirmCancel, setConfirmCancel] = useState(false)
  const [consumerCart, setConsumerCart] = useState()
  const [ currentConsumer, setCurrentConsumer ] = useState({})

  useEffect(() => {
      fetch(CONS_URL)
      .then( res => res.json() )
      .then( res => setCurrentConsumer(res) )
      .catch( err => console.error(err) )

      fetch(CONS_CART_URL)
      .then( res => res.json() )
      .then( res => setConsumerCart(res))
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
      setConfirmCancel(false)
      setConfirmDelete(false)
    })
  }

  const handleCancel = (e) => {


    console.log(currentProductEdit)
    fetch(`${API}/carts/${currentProductEdit.cart_product_id}`, {
      method: "PUT",
      body: JSON.stringify(currentProductEdit),
      headers: {
        "Content-type": "application/json"
      }
    })
    .then( res => res.json() )
    .then( res =>  {
      setConfirmCancel(false)
    })
    .catch( err => console.error(err))
  }

  return (
    <li key={order.order_id}>
      <h3>Order ID: {order.order_id}</h3>
      {/* <p>User ID: {user.user_full_name}</p> */}
      <h4>Cart Products:</h4>
      <ul>
        {(order.products.length > 0 ) ? (
          order.products.map((product) => {
            return <li key={product.product_id}>{product.product_name} - {product.products_quantity}</li>
          })
        ) : (
          <li>No products in cart</li>
        )}
      </ul>
      <div className="buttons-container">
        <Button className='order-button' onClick={() => setConfirmCancel(true)}>Cancel</Button>
        <Button className='order-button' onClick={() => setConfirmDelete(true)}>Submit</Button>
      </div>
      {confirmCancel && 
        <>
          <div className="confirm-submit">
            <p>Are you sure you want to cancel this order?</p>
            <div className="buttons-container">
              <Button className='order-button' onClick={handleSubmit}>Yes</Button>
              <Button className='order-button' onClick={() => setConfirmCancel(false)}>No</Button>
            </div>
          </div>
        </>
      }
      {confirmDelete && 
        <>
          <div className="confirm-submit">
            <p>Are you ready to submit this order?</p>
            <div className="buttons-container">
              <Button className='order-button' onClick={handleSubmit}>Yes</Button>
              <Button className='order-button' onClick={() => setConfirmDelete(false)}>No</Button>
            </div>
          </div>
        </>
      }
    </li>
  );
};

export default OrdersCard;