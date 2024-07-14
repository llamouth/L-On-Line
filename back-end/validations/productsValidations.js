const db = require("../db/dbConfig")

//const selectedDistributor = await db.one("SELECT * FROM distributor WHERE distributor=$1", distributor)

const checkProduct = (req, res, next) => {
    const { distributor, productName, productPrice} = req.body
    if(distributor){
        if(productName){
            if(productPrice){
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