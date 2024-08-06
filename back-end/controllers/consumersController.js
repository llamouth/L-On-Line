const express = require("express")
const consumer = express.Router()
const { getAllConsumers, getOneConsumer, createConsumer, updateConsumer, deleteConsumer } = require("../queries/consumers")
const { checkUser, checkId } = require("../validations/userValidations")
const { checkAddress } = require("../validations/consumersValidation")

consumer.get("/", async (req, res) => {
    const allConsumers = await getAllConsumers()
    
    if(allConsumers){
        res.status(200).json(allConsumers)
    }else {
        res.status(500).json({ error: "Internal Server Error"})
    }
})

consumer.get("/:id", checkId, async (req, res) => {
    const { id } = req.params 
    const singleConsumer = await getOneConsumer(id)
    res.status(200).json(singleConsumer);
}) 

consumer.post("/", checkUser, checkAddress, async (req, res) => {
    const newConsumer = await createConsumer(req.body);
    console.log(newConsumer)
    res.status(200).json(newConsumer);
})

consumer.post("/:id", checkId, checkUser, checkAddress, async (req, res) => {
    const { id } = req.params;
    const updatedConsumer = await updateConsumer(id, req.body);
    res.status(200).json(updatedConsumer);
})

consumer.delete("/:id", checkId, async (req, res) => {
    const { id } = req.params;
    const deletedConsumer = await deleteConsumer(id);
    res.status(200).json(deletedConsumer); 
})

module.exports = consumer;