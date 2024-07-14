const express = require("express")
const products = express.Router()
const { getAllProducts, getOneProduct, createProduct, updateProduct, deleteProduct } = require("../queries/products")
const { checkCreation} = require("../validations/productsValidations")

products.get("/", async (req, res) => {
    const allProducts = await getAllProducts()
    if(allProducts){
        res.status(200).json(allProducts)
    }else {
        res.status(500).json({ error: "Internal Server Error" })
    }
})

products.get("/:id", async (req, res) => {
    const { id } = req.params
    const singleProduct = await getOneProduct(id)
    if(singleProduct){
        res.status(200).json(singleProduct)
    }else {
        res.status(500).json({ error: "Internal Server Error"})
    }
})

products.post("/", checkCreation, async (req, res) => {
    const newProduct = await createProduct(req.body)
    res.status(200).json(newProduct)
})

products.post("/:id", async (req, res) => {
    const { id }= req.params
    const updatedProduct = await updateProduct(id, req.body)
    res.status(200).json(updatedProduct)
})

products.delete("/:id", async (req, res) => {
    const { id } = req.params
    const deletedProduct = await deleteProduct(id)
    res.status(200).json(deletedProduct)
})

module.exports = products