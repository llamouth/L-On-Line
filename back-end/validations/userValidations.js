const db = require("../db/dbConfig")

const checkUser = (req, res, next) => {
    const { userName, password } = req.body
    if( userName ){
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
    if(String(id).includes(".")){
        res.status(404).json({ error: "Not a Whole number"})
    }
    return next()
}

const checkKeysValidity = ( req, res, next ) => {
    const presentKeys = Object.keys(req.body)
    const bool = presentKeys.some( (key) => {
       return key !== "username" || key !== "password"
    })
    if(bool){
        res.status(500).json({ error: "Invalid Key in submission"})
    }
    return next()
}

module.exports = { checkUser, checkId, checkKeysValidity }