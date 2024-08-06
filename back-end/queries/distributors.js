const db = require("../db/dbConfig")

const getAllDistributors = async () => {
    try {
        const allDistributors =  await db.any("SELECT * FROM distributors")
        return allDistributors
    } catch (error) {
        return error
    }
}

const getOneDistributor = async (id) => {
    try {
        const singleDistributor = await db.any("SELECT distributors.userName, products.productName, products.productPrice FROM distributors JOIN products ON distributors.distid = products.distributor_id WHERE distid=$1;", id)
        return singleDistributor
    } catch (error) {
        return error
    }
}

const createDistributor = async (dist) => {
    try {
        const newDist = await db.one("INSERT INTO distributors (userName, password) VALUES ($1, $2) RETURNING *;", [dist.username, dist.password])
        return newDist
    } catch (error) {
        console.log(error)
        return error
    }
}

const updateDistributor = async (id, dist) => {
    const { username, password } = dist
    try {
        const updatedDistributor = await db.one("UPDATE distributors SET username=$1, password=$2 WHERE id=$3 RETURNING *", [username, password, id])
        return updatedDistributor
    } catch (error) {
        return error
    }
}

const deleteDistributor = async (id) => {
    try {
        const deletedProducts = await db.any("DELETE FROM products WHERE distributor_id=$1 RETURNING product_name, product_price, description;", id)
        const deletedDistributor = await db.one("DELETE FROM distributors WHERE distid=$1 RETURNING distid, userName;", id) 
        return { deletedDistributor, deletedProducts }
    } catch (error) {
        return error
    }
}

module.exports = { getAllDistributors, getOneDistributor, createDistributor, updateDistributor, deleteDistributor }