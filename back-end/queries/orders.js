const db = require("../db/dbConfig");

const getAllOrders = async () => {
    try {
        const allOrders = await db.any(`
            SELECT orders.order_id, distributors.distid AS distributors_id, consumers.consid AS consumers_id,  orders.cart_products_id,
                   products.id AS product_id, products.product_name, products.product_price, 
                   cart_products.products_quantity
            FROM orders 
            JOIN cart_products ON orders.cart_products_id = cart_products.cart_product_id 
            JOIN consumers ON cart_products.carts_owner = consumers.consid 
            JOIN products ON cart_products.products_id = products.id 
            JOIN distributors ON orders.distributors_id = distributors.distid 
        `);
        return allOrders;
    } catch (error) {
        return error;
    }
};

const getSingleOrder = async (id) => {
    try {
        const singleOrder = await db.any(`
            SELECT orders.order_id, distributors.distid AS distributors_id, consumers.consid AS consumers_id, 
                   products.id AS product_id, products.product_name, products.product_price, 
                   cart_products.products_quantity, orders.cart_products_id
            FROM orders 
            JOIN cart_products ON orders.cart_products_id = cart_products.cart_product_id 
            JOIN consumers ON cart_products.carts_owner = consumers.consid 
            JOIN products ON cart_products.products_id = products.id 
            JOIN distributors ON orders.distributors_id = distributors.distid 
            WHERE consumers.consid = $1
        `, [id]);
        
        const orderDetails = {
            order_id: singleOrder[0]?.order_id,
            distributors_id: singleOrder[0]?.distributors_id,
            consumers_id: singleOrder[0]?.consumers_id,
            cart_products: singleOrder.map(order => ({
                product_id: order.product_id,
                product_name: order.product_name,
                product_price: order.product_price,
                products_quantity: order.products_quantity
            }))
        };
        return orderDetails;
    } catch (error) {
        return error;
    }
};

const createSingleOrder = async (order) => {
    const { distributors_id, consumers_id, cart_products_id } = order;
    try {
        const createdOrder = await db.one(`
            INSERT INTO orders (distributors_id, consumers_id, cart_products_id) 
            VALUES ($1, $2, $3) 
            RETURNING *
        `, [distributors_id, consumers_id, cart_products_id]);
        return createdOrder;
    } catch (error) {
        return error;
    }
};

const updateSingleOrder = async (id, order) => {
    const { distributors_id, consumers_id, cart_products_id } = order;
    try {
        const updatedOrder = await db.one(`
            UPDATE orders 
            SET distributors_id = $1, consumers_id = $2, cart_products_id = $3 
            WHERE order_id = $4 
            RETURNING *
        `, [distributors_id, consumers_id, cart_products_id, id]);
        return updatedOrder;
    } catch (error) {
        return error;
    }
};

const deleteSingleOrder = async (id) => {
    try {
        const deletedOrder = await db.one(`
            DELETE FROM orders 
            WHERE order_id = $1 
            RETURNING *
        `, [id]);
        return deletedOrder;
    } catch (error) {
        return error;
    }
};

module.exports = { getAllOrders, getSingleOrder, createSingleOrder, updateSingleOrder, deleteSingleOrder };