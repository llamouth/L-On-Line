const express = require("express")
const distributor = express.Router()
const { getAllDistributors, getOneDistributor, createDistributor, updateDistributor, deleteDistributor } = require("../queries/distributors")
const { checkCreation } = require("../validations/distributorValidations")

distributor.get("/", async (req, res) => {
    const allDistributors = await getAllDistributors()
    if(allDistributors) {
        res.status(200).json(allDistributors)
    }else {
        res.status(500).json({error: "Internal Server Error"})
    }
})

distributor.get("/:id", async (req, res) => {
    const { id } = req.params
    const singleDistributor = await getOneDistributor(id)

    if(singleDistributor.id) {
        res.status(200).json(singleDistributor)
    }else {
        res.status(500).json({error: "Internal Server Error"})
    }
})

distributor.post("/", checkCreation, async (req, res) => {
    const newDist = await createDistributor(req.body)
    res.status(200).json(newDist)
})

distributor.post("/:id", async (req, res) => {
    const { id } = req.params
    const updatedDistributor = await updateDistributor(id, req.body)

    if(updatedDistributor.id){
        res.status(200).json(updatedDistributor)
    }else {
        res.status(500).json({ error: "Internal Sever Error"})
    }
})

distributor.delete("/:id", async (req, res) => {
    const { id } = req.params
    const {deletedDistributor, deletedProducts} = await deleteDistributor(id)
    console.log(deletedProducts)
    res.status(200).json({deletedDistributor, deletedProducts})
})

module.exports = distributor;