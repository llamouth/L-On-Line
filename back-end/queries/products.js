const db = require("../db/dbConfig")

const getAllProducts = () => {
    try {
        const allProducts = db.any("SELECT * FROM products")
        return allProducts
    } catch (error) {
        return error
    }
}

const getOneProduct = async (id) => {
    try {
        const singleProduct = db.one("SELECT * FROM products WHERE id=$1;", id)
        return singleProduct
    } catch (error) {
        return error
    }
}

const createProduct = async (product) => {
    const { distributor, productName, productPrice } = product
    try {
        const newProduct = db.one("INSERT INTO products (distributor, productName, productPrice) VALUES ($1, $2, $3) RETURNING *;", [distributor, productName, productPrice])
        return newProduct
    } catch (error) {
        return error
    }
}

const updateProduct = async (id, product) => {
    const { distributor, productName, productPrice } = product;
    try {
        const updatedProduct = await db.one("UPDATE products SET distributor=$1, productName=$2, productPrice=$3 WHERE id=$4 RETURNING *;", [distributor, productName, productPrice, id])
        return updatedProduct
    } catch (error) {
        return error
    }
} 

const deleteProduct = async (id) => {
    try {
        const deletedProduct = await db.one("DELETE FROM products WHERE id=$1 RETURNING *", id)
        return deletedProduct
    } catch (error) {
        return error
    }
}

module.exports = { getAllProducts, getOneProduct, createProduct, updateProduct, deleteProduct }