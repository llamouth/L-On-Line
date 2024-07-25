const db = require("../db/dbConfig")

const getAllCarts = async () => {
    try {
        const allCartProducts = await db.any("SELECT cart_products.cart_product_id, consumers.consid AS cart_owner, cart_products.products_id, cart_products.products_quantity FROM cart_products JOIN consumers ON cart_products.carts_owner = consumers.consid ")
        return allCartProducts
    } catch (error) {
        return error
    }
}

const getSingleCart = async (cart_owner_id) => {
    try {
        const singleUserCart = await db.any("SELECT cart_products.cart_product_id, consumers.consid AS cart_owner, cart_products.products_id, cart_products.products_quantity FROM cart_products JOIN consumers ON cart_products.carts_owner = consumers.consid WHERE carts_owner=$1", cart_owner_id)
        return singleUserCart
    } catch (error) {
        return error
    }
}

const updateSingleCart = async (id, cart) => {
    const { products_quantity } = cart
    try {
        const updatedSingleCart = await db.one("UPDATE cart_products SET products_quantity=$1 WHERE cart_product_id=$2 RETURNING *", [products_quantity, id])
        return updatedSingleCart
    } catch (error) {
        return error
    }
}

const createSingleCart = async (cart) => {
    const {carts_owner, products_id, products_quantity} = cart
    try {
        const createdCart = await db.one("INSERT INTO cart_products (carts_owner, products_id, products_quantity) VALUES($1, $2, $3)", [carts_owner, products_id, products_quantity])
    } catch (error) {
        return error
    }
}

const deleteSingleCart = async (id) => {
    try {
        const deletedCart = await db.one("DELETE FROM cart_products WHERE cart_product_id=$1 RETURNING *")
        return deletedCart
    } catch (error) {
        return error
    }
}

module.exports = { getAllCarts, getSingleCart, updateSingleCart, deleteSingleCart, createSingleCart }