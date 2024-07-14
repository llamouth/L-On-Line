const express = require("express")
const consumer = express.Router()
const { getAllConsumers, getOneConsumer, createConsumer, updateConsumer } = require("../queries/consumers")

consumer.get("/", async (req, res) => {
    const allConsumers = await getAllConsumers()
    if(allConsumers){
        res.status(200).json(allConsumers)
    }else {
        res.status(500).json({ error: "Internal Server Error"})
    }
})

consumer.get("/:id", async (req, res) => {
    const { id } = req.params 
    const singleConsumer = await getOneConsumer(id)
    if(singleConsumer){
        res.status(200).json(singleConsumer)
    }else {
        res.status(500).json({ error: "Internal Server Error"})
    }
})

consumer.post("/", async (req, res) => {
    const newConsumer = await createConsumer(req.body)
    res.status(200).json(newConsumer)
})

consumer.post("/:id", async (req, res) => {
    const { id } = req.params
    const updatedConsumer = await updateConsumer(id, req.body)

    if(updateConsumer.id){
        res.status(200).json(updatedConsumer)
    }else {
        res.status(500).json({ error: "Internal Server Error"})
    }
})

module.exports = consumer;