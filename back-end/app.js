const express = require('express');
const cors = require("cors")
const app = express();
const distributorController = require("./controllers/distributorsController")
const productsController = require("./controllers/productsController")
const consumerController = require("./controllers/consumersController")

app.use(express.json())
app.use(cors())

app.use("/distributors", distributorController)
app.use("/products", productsController)
app.use("/consumers", consumerController)

app.get("/", (req, res) => {
    res.send("Welcome to L On Line !")
})

app.get("*", (req, res) => {
    res.status(404).send("Page not found")
})

module.exports = app;