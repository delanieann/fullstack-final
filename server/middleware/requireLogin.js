const token = require('jsonwebtoken')
const{ JWT } = require('../keys')
const mongoose = require('mongoose')
const User = mongoose.model("User")

module.exports = (req, res, next)=>{
    const {authorization} = req.headers

    if (!authorization){
        //Not signed in 
        res.status(401).json({error: "You must be logged in."})
    }
    const t = authorization.replace("Bearer ", "")
    token.verify(t, JWT, (err, payload)=>{
        if(err){
            res.status(401).json({error: "You must be logged in."})
            return 
        }
        const { _id } = payload
        User.findById(_id).then(data=>{
            req.user = data
            next()
        })
    })
}