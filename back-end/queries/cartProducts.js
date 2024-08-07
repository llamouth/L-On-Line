const db = require("../db/dbConfig")

const getAllCarts = async () => {
    try {
        const allCartProducts = await db.any("SELECT cart_products.cart_product_id, consumers.consid AS cart_owner, cart_products.products_id, cart_products.products_quantity, cart_products.ordered FROM cart_products JOIN consumers ON cart_products.carts_owner = consumers.consid ")
        return allCartProducts
    } catch (error) {
        return error
    }
}

const getSingleCart = async (cart_owner_id) => {
    try {
        const singleUserCart = await db.any("SELECT cart_products.cart_product_id, consumers.consid AS cart_owner, cart_products.products_id, cart_products.products_quantity, cart_products.ordered FROM cart_products JOIN consumers ON cart_products.carts_owner = consumers.consid WHERE carts_owner=$1", cart_owner_id)
        return singleUserCart
    } catch (error) {
        return error
    }
}

const updateSingleCart = async (id, cart) => {
    const { products_quantity, ordered } = cart
    try {
        const updatedSingleCart = await db.one("UPDATE cart_products SET products_quantity=$1, ordered=$2 WHERE cart_product_id=$3 RETURNING *", [products_quantity, ordered, id])
        return updatedSingleCart
    } catch (error) {
        return error
    }
}

const createSingleCart = async (cart) => {
    const {carts_owner, products_id, products_quantity, ordered} = cart
    try {
        const createdCart = await db.one("INSERT INTO cart_products (carts_owner, products_id, products_quantity, ordered) VALUES($1, $2, $3, $4) RETURNING *", [carts_owner, products_id, products_quantity, ordered])
        return createdCart
    } catch (error) {
        console.log(error)
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