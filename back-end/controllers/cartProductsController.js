const express = require("express")
const cartProducts = express.Router()
const { getAllCarts, getSingleCart, updateSingleCart, deleteSingleCart, createSingleCart } = require("../queries/cartProducts")

cartProducts.get("/", async (req, res) => {
    const allCartProducts = await getAllCarts()
    res.status(200).json(allCartProducts)
})

cartProducts.get("/:id", async (req, res) => {
    const { id } = req.params
    const singleCartProduct = await getSingleCart(id)
    res.status(200).json(singleCartProduct)
})

cartProducts.put("/:id", async (req, res) => {
    const { id } = req.params
    const updatedCart = req.body
    const cartUpdated = await updateSingleCart(id, updatedCart)
    res.status(200).json(cartUpdated)
})

cartProducts.post("/", async (req, res) => {
    const newCart = req.body
    const createdCart = await createSingleCart(newCart)
    res.status(200).json(createdCart)
})

cartProducts.delete("/:id", async (req, res) => {
    const { id } = req.params
    const deletedCart = await deleteSingleCart(id)
    res.status(200).json(deletedCart)
})

module.exports = cartProducts;