const express = require("express")
const distributor = express.Router()
require('dotenv').config()
const jwt = require('jsonwebtoken')
const secret = process.env.SECRET
const { getAllDistributors, getOneDistributor, createDistributor, updateDistributor, deleteDistributor, loginDistributor } = require("../queries/distributors")
const { checkUser, checkId } = require("../validations/userValidations")
const { authenticateToken } = require("../auth/auth")
const ordersController = require("./ordersController")


distributor.use("/:distid/orders", authenticateToken, ordersController)

distributor.get("/", async (req, res) => {
    const allDistributors = await getAllDistributors()
    if(allDistributors) {
        res.status(200).json(allDistributors)
    }else {
        res.status(500).json({error: "Internal Server Error"})
    }
})

distributor.get("/:id", checkId, async (req, res) => {
    const { id } = req.params
    const singleDistributor = await getOneDistributor(id)
    res.status(200).json(singleDistributor) 
})

distributor.post("/", checkUser, async (req, res) => {
    const newDist = await createDistributor(req.body)
    res.status(200).json(newDist)
})

distributor.post("/login", async (req, res) => {
    const loggedInUser = await loginDistributor(req.body)
    if(!loggedInUser) {
        res.status(401).json({ error: "Invalid username or password" })
        return 
    }

    const token = jwt.sign({ userId: loggedInUser.distid, username: loggedInUser.username }, secret)

    const user = {
        user_id: loggedInUser.distid, 
        username: loggedInUser.username
    }

    res.status(200).json({ 
        user, 
        token 
    });

})

distributor.post("/:id", checkUser, checkId, async (req, res) => {
    const { id } = req.params
    const updatedDistributor = await updateDistributor(id, req.body)
    res.status(200).json(updatedDistributor)
    
})

distributor.delete("/:id", checkId, async (req, res) => {
    const { id } = req.params
    const {deletedDistributor, deletedProducts} = await deleteDistributor(id)
    res.status(200).json({deletedDistributor, deletedProducts})
    
})

module.exports = distributor;