const express = require("express");
const orders = express.Router();
const { getAllOrders, getSingleOrder, createSingleOrder, updateSingleOrder, deleteSingleOrder } = require("../queries/orders");

orders.get("/", async (req, res) => {
    try {
        const allOrders = await getAllOrders();
        res.status(200).json(allOrders);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

orders.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const singleOrder = await getSingleOrder(id);
        if (singleOrder) {
            res.status(200).json(singleOrder);
        } else {
            res.status(404).json({ error: "Order not found" });
        }
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

orders.post("/", async (req, res) => {
    const newOrder = req.body;
    try {
        const createdOrder = await createSingleOrder(newOrder);
        res.status(201).json(createdOrder);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

orders.put("/:id", async (req, res) => {
    const { id } = req.params;
    const updatedOrder = req.body;
    try {
        const order = await updateSingleOrder(id, updatedOrder);
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

orders.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const deletedOrder = await deleteSingleOrder(id);
        res.status(200).json(deletedOrder);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = orders;
