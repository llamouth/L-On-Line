const express = require("express")
const cartProducts = express.Router({ mergeParams: true})
const { getAllCarts, getSingleCart, updateSingleCart, deleteSingleCart, createSingleCart } = require("../queries/cartProducts")

cartProducts.get("/", async (req, res) => {
    const { consid } = req.params
    const allCartProducts = await getAllCarts(consid)
    res.status(200).json(allCartProducts)
})

cartProducts.get("/:id", async (req, res) => {
    const { consid, id } = req.params
    const singleCartProduct = await getSingleCart(consid, id)
    res.status(200).json(singleCartProduct)
})

cartProducts.put("/:id", async (req, res) => {
    const { consid, id } = req.params
    const updatedCart = req.body
    const cartUpdated = await updateSingleCart(consid, id, updatedCart)
    res.status(200).json(cartUpdated)
})

cartProducts.post("/", async (req, res) => {
    const { consid } = req.params
    const newCart = req.body
    const createdCart = await createSingleCart(consid, newCart)
    if(createdCart.carts_owner){
        res.status(200).json(createdCart)
    }else {
        res.status(500).json({ error: "Internal Server Error"})
    }
})

cartProducts.delete("/:id", async (req, res) => {
    const { id } = req.params
    const deletedCart = await deleteSingleCart(id)
    res.status(200).json(deletedCart)
})

module.exports = cartProducts;