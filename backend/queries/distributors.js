const db = require("../db/dbConfig")
const bcrypt = require("bcrypt")

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
        const singleDistributor = await db.any("SELECT distributors.username, products.product_name, products.product_price FROM distributors JOIN products ON distributors.distid = products.distributor_id WHERE distid=$1;", id)
        return singleDistributor
    } catch (error) {
        return error
    }
}

const createDistributor = async (dist) => {
    try {
        const { username, password_hash } = dist
        const salt = 10
        const hash = await bcrypt.hash(password_hash, salt)
        const newDist = await db.one("INSERT INTO distributors (username, password_hash) VALUES ($1, $2) RETURNING *;", [username, hash])
        return newDist
    } catch (error) {
        return error
    }
}

const updateDistributor = async (id, dist) => {
    const { username, password_hash } = dist
    try {
        const salt = 10
        const hash = await bcrypt.hash(password_hash, salt)
        const updatedDistributor = await db.one("UPDATE distributors SET username=$1, password_hash=$2 WHERE id=$3 RETURNING *", [username, hash, id])
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

const loginDistributor = async (dist) => {
    try {
        const { username, password_hash } = dist
        const loggedInDist = await db.oneOrNone("SELECT * FROM distributors WHERE username=$1", username)
        if(!loggedInDist) { return false }
        
        const passwordMatch = await bcrypt.compare(password_hash, loggedInDist.password_hash)

        if(!passwordMatch){ return false }
        
        return loggedInDist
    } catch (error) {
        return error
    }
}

module.exports = { getAllDistributors, getOneDistributor, createDistributor, updateDistributor, deleteDistributor, loginDistributor }