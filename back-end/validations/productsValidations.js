const db = require("../db/dbConfig")
const { getOneDistributor } = require("../queries/distributors")


const checkProduct = async (req, res, next) => {
    const { distributor_id, productname, productprice} = req.body
    const selectedDistributor = await getOneDistributor(distributor_id)
    if(selectedDistributor){
        if(productname){
            if(productprice){
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