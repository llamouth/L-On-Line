const express = require("express")
const products = express.Router()
const { getAllProducts, getOneProduct, createProduct, updateProduct, deleteProduct } = require("../queries/products")
const { checkProduct } = require("../validations/productsValidations")
const { checkId } = require("../validations/userValidations")

products.get("/", async (req, res) => {
    const allProducts = await getAllProducts()

    if(allProducts){
        res.status(200).json(allProducts)
    }else {
        res.status(500).json({ error: "Internal Server Error" })
    }
})

products.get("/:id", checkId, async (req, res) => {
    const { id } = req.params
    const singleProduct = await getOneProduct(id)
    
    if(singleProduct.id){
        res.status(200).json(singleProduct)
    }else {
        res.status(500).json({ error: "Invalid ID"})
    }
})

products.post("/", checkId, checkProduct , async (req, res) => {
    const newProduct = await createProduct(req.body)
    res.status(200).json(newProduct)
})

products.post("/:id", checkId, checkProduct, async (req, res) => {
    const { id }= req.params
    const updatedProduct = await updateProduct(id, req.body)

    if(updatedProduct.id){
        res.status(200).json(updatedProduct)
    }else {
        res.status(500).json({error: "Invalid ID"})
    }
})

products.delete("/:id", checkId, async (req, res) => {
    const { id } = req.params
    const deletedProduct = await deleteProduct(id)

    if(deletedProduct.id){
        res.status(200).json(deletedProduct)
    }else {
        res.status(500).json({error: "Invalid ID"})
    }
})

products.patch("/:id", async (req, res) => {
    const { id } = req.params;
    const updatedProduct = await updateProduct(id, req.body);

    if (updatedProduct.id) {
        res.status(200).json(updatedProduct);
    } else {
        res.status(500).json({ error: "Invalid ID" });
    }
});


module.exports = products