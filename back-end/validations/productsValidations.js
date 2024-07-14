const checkCreation = (req, res, next) => {
    if(req.body.distributor){
        if(req.body.productName){
            if(req.body.productPrice){
                return next()
            }else {
                res.status(500).json({ error: "Invalid price"})
            }
        }else {
            res.status(500).json({ error: "Invalid product name"})
        }
    }else {
        res.status(500).json({ error: "Input valid distributor"})
    }
}

module.exports = { checkCreation }