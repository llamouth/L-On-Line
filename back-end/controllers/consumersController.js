const express = require("express")
const consumer = express.Router()
require('dotenv').config()
const jwt = require('jsonwebtoken')
const secret = process.env.SECRET
const cartProductsController = require("./cartProductsController")
const { getAllConsumers, getOneConsumer, createConsumer, updateConsumer, deleteConsumer, loginConsumer } = require("../queries/consumers")
const { checkUser, checkId } = require("../validations/userValidations")
const { checkAddress } = require("../validations/consumersValidation")
const { authenticateToken } = require("../auth/auth")

consumer.use("/:consid/cart", authenticateToken,cartProductsController)

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
    res.status(200).json(newConsumer);
})

consumer.post("/login", async (req, res) => {
    const loggedInUser = await loginConsumer(req.body)
    if(!loggedInUser){
        res.status(401).json({ error: "Invalid username or password" })
        return 
    }

    const token = jwt.sign({ userId: loggedInUser.consid, username: loggedInUser.username }, secret);

    const userLoggedIn = {
        user_id: loggedInUser.user_id, 
        username: loggedInUser.username, 
        email: loggedInUser.email
    }

    res.status(200).json({ 
        userLoggedIn , 
        token 
    });

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