const checkAddress = (req, res, next) => {
    const { address } = req.body;
    if(!address){
        res.status(500).json({ error: "Please input an address"})
    }
    return next()
}

module.exports = { checkAddress }