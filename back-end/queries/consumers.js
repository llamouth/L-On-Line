const db = require("../db/dbConfig")
const bcrypt = require("bcrypt")

const getAllConsumers = async () => {
    try {
        const allConsumers = await db.any("SELECT * FROM consumers")
        return allConsumers
    } catch (error) {
        return error
    }
}

const getOneConsumer = async (id) => {
    try {
        const singleConsumer = await db.one("SELECT * FROM consumers WHERE consid=$1", id)
        return singleConsumer
    } catch (error) {
        return error
    }
}

const createConsumer = async (consumer) => {
    try {
        const { username, email, password_hash, address, first_name, last_name  } = consumer
        const salt = 10
        const hash = await bcrypt.hash(password_hash, salt)
        const newConsumer = await db.one("INSERT INTO consumers (username, email, password_hash, address, first_name, last_name) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *", [username, email, hash, address, first_name, last_name])
        return newConsumer
    } catch (error) {
        return error
    }
}

const updateConsumer = async (id, consumer) => {
    const { userName, password, address } = consumer
    try {
        const updatedConsumer = await db.one("UPDATE consumes SET userName=$1, password=$2, address=$3 WHERE id=$4", [userName, password, address, id])
        return updatedConsumer
    } catch (error) {
        return error
    }
}

const deleteConsumer = async (id) => {
    try {
        const deletedConsumer = await db.one("DELETE FROM consumers WHERE id=$1 RETURNING * ", id)
        return deletedConsumer
    } catch (error) {
        return error
    }
}

const loginConsumer = async (cons) => {
    try {
        const { username, password_hash } = cons
        const loggedInConsumer = await db.oneOrNone("SELECT * FROM consumers WHERE username=$1", username)
        if(!loggedInConsumer) { return false }
        
        const passwordMatch = await bcrypt.compare(password_hash, loggedInConsumer.password_hash)

        if(!passwordMatch){ return false }
        
        return loggedInConsumer
    } catch (error) {
        return error
    }
    
}

module.exports = { getAllConsumers, getOneConsumer, createConsumer, updateConsumer, deleteConsumer, loginConsumer }