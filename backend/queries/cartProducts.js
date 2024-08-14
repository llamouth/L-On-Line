const db = require("../db/dbConfig")

const getAllCarts = async (consid) => {
    try {
        const allCartProducts = await db.any("SELECT cart_products.cart_product_id, consumers.consid AS cart_owner, cart_products.products_id, cart_products.products_quantity, cart_products.ordered FROM cart_products JOIN consumers ON cart_products.carts_owner = consumers.consid WHERE cart_products.carts_owner=$1", consid)
        return allCartProducts
    } catch (error) {
        return error
    }
}

const getSingleCart = async (consid, id) => {
    try {
        const singleUserCart = await db.oneOrNone("SELECT cart_products.cart_product_id, consumers.consid AS cart_owner, cart_products.products_id, cart_products.products_quantity, cart_products.ordered FROM cart_products JOIN consumers ON cart_products.carts_owner = consumers.consid WHERE cart_product_id=$1 AND carts_owner=$2", [id, consid])
        return singleUserCart
    } catch (error) {
        return error
    }
}

const updateSingleCart = async (consid, id, cart) => {
    const { products_quantity, ordered } = cart
    try {
        const updatedSingleCart = await db.one("UPDATE cart_products SET products_quantity=$1, ordered=$2 WHERE cart_product_id=$3 AND carts_owner=$4 RETURNING *", [products_quantity, ordered, id, consid])
        return updatedSingleCart
    } catch (error) {
        return error
    }
}

const createSingleCart = async (consid, cart) => {
    const {products_id, products_quantity, ordered} = cart
    try {
        const createdCart = await db.one("INSERT INTO cart_products (carts_owner, products_id, products_quantity, ordered) VALUES($1, $2, $3, $4) RETURNING *", [consid, products_id, products_quantity, ordered])
        return createdCart
    } catch (error) {
        return error
    }
}

const deleteSingleCart = async (id) => {
    try {
        const deletedCart = await db.any("DELETE FROM cart_products WHERE carts_owner=$1 RETURNING *", id)
        return deletedCart
    } catch (error) {
        return error
    }
}

module.exports = { getAllCarts, getSingleCart, updateSingleCart, deleteSingleCart, createSingleCart }