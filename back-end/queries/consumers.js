const db = require("../db/dbConfig")

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
    const { userName, password, address } = consumer
    try {
        const newConsumer = await db.one("INSERT INTO consumers (userName, password, address) VALUES ($1, $2, $3) RETURNING *", [userName, password, address])
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

module.exports = { getAllConsumers, getOneConsumer, createConsumer, updateConsumer, deleteConsumer }