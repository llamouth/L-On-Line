const db = require("../db/dbConfig")

const getAllProducts = async () => {
    try {
        const allProducts = await db.any("SELECT * FROM products")
        return allProducts
    } catch (error) {
        return error
    }
}

const getOneProduct = async (id) => {
    try {
        const singleProduct = await db.one("SELECT * FROM products WHERE id=$1;", id)
        return singleProduct
    } catch (error) {
        console.log("error")
        return error
    }
}

const createProduct = async (product) => {
    const { distributor_id, productname, productprice } = product
    try {
        const newProduct = await db.one("INSERT INTO products (distributor_id, productName, productPrice) VALUES ($1, $2, $3) RETURNING *;", [distributor_id, productname, productprice])
        return newProduct
    } catch (error) {
        return error
    }
}

const updateProduct = async (id, product) => {
    const { distributor_id, productname, productprice } = product;
    try {
        const updatedProduct = await db.one("UPDATE products SET distributor_id=$1, productName=$2, productPrice=$3 WHERE id=$4 RETURNING *;", [distributor_id, productname, productprice, id])
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