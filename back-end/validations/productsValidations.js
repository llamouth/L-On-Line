const db = require("../db/dbConfig")
const { getOneDistributor } = require("../queries/distributors")


const checkProduct = async (req, res, next) => {
    const { distributor_id, product_name, product_price} = req.body
    const selectedDistributor = await getOneDistributor(distributor_id)
    if(selectedDistributor){
        if(product_name){
            if(product_price){
                return next()
            }else {
                res.status(500).json({ error: "Invalid price"})
            }
        }else {
            res.status(500).json({ error: "Invalid product name"})
        }
    }else {
        res.status(500).json({ error: "Invalid distributor"})
    }
}

const checkDeletion = (req, res, next) => {

}

module.exports = { checkProduct }