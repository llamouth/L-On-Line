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
    const { distributor_id, product_name, product_price, description, image_url } = product
    try {
        const newProduct = await db.one("INSERT INTO products (distributor_id, product_name, product_price, description, image_url) VALUES ($1, $2, $3, $4, $5) RETURNING *;", [distributor_id, product_name, product_price, description, image_url])
        return newProduct
    } catch (error) {
        console.error(error)
        return error
    }
}

const updateProduct = async (id, product) => {
    const setString = Object.keys(product).map((key, index) => `${key}=$${index + 1}`).join(", ");
    const values = Object.values(product);
    
    try {
        const updatedProduct = await db.one(
            `UPDATE products SET ${setString} WHERE id=$${values.length + 1} RETURNING *;`, 
            [...values, id]
        );
        return updatedProduct;
    } catch (error) {
        return error;
    }
};

const deleteProduct = async (id) => {
    try {
        const deletedProduct = await db.one("DELETE FROM products WHERE id=$1 RETURNING *", id)
        return deletedProduct
    } catch (error) {
        return error
    }
}

module.exports = { getAllProducts, getOneProduct, createProduct, updateProduct, deleteProduct }