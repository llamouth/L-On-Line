import React from 'react';

const OrdersCard = ({order, distributorsOrders, setDistributorsOrders}) => {

  const API = import.meta.env.VITE_BASE_URL;
  const CONS_URL = `${API}/consumers/${order.consumers_id}`
  const ORDERS_URL = `${API}/orders` 


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
    })
  }

  return (
    <li key={order.order_id}>
      <h3>Order ID: {order.order_id}</h3>
      {/* <p>User ID: {user.user_full_name}</p> */}
      <h4>Cart Products:</h4>
      <ul>
        {order.products.length > 0 ? (
          order.products.map((product) => (
            <li key={product.product_id}>
              {product.product_name} - {product.products_quantity}
            </li>
          ))
        ) : (
          <li>No products in cart</li>
        )}
      </ul>
      <button>Edit</button>
      <button onClick={handleSubmit}>Submit</button>
    </li>
  );
};

export default OrdersCard;