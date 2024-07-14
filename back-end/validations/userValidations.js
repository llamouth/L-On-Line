const checkUser = (req, res, next) => {
    const { userName, password } = req.body
    if(userName){
        if(typeof userName !== "string"){
            res.status(500).json({ error: "Invalid Username"})
        }
    }else {
        res.status(404).json({error: "Missing Username"})
    }
    if(password){
        if(typeof password !== "string"){
            res.status(404).json({ error : "Invalid Password"})
        }
    }else{
        res.status(404).json({error: "Missing Password"})
    }
    return next()
}

const checkId = (req, res, next) => {
    const { id } = req.params
    if(typeof +id !== "number"){
        res.status(404).json({ error: "Not anumber"}) 
    }
    if(id.includes(".")){
        res.status(404).json({ error: "Not a Whole number"})
    }
    return next()
}

module.exports = { checkUser, checkId }