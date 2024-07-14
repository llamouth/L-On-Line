const checkCreation = (req, res, next) => {
    if(req.body.userName){
        if(req.body.password){
            return next()
        }else{
            res.status(404).json({error: "Missing Password"})
        }
    }else {
        res.status(404).json({error: "Missing Username"})
    }
}

module.exports = { checkCreation }