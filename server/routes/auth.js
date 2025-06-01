const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = mongoose.model("User")
const bcryptjs = require('bcryptjs')
const token = require('jsonwebtoken')
const {JWT} = require('../keys')
const requireLogin = require('../middleware/requireLogin')


router.get('/', (req,res)=>{
    res.send("Hello")
})

router.post('/signup', (req,res)=>{
    const {name, email, password} = req.body
    if (!email || !password || !name){
        res.status(406).json({error:"Please complete all fields. "})
    }
    User.findOne({email:email})
    .then((currentUser)=>{
        if(currentUser){
            return res.status(422).json({error:"Email already in use. "})
        }
        bcryptjs.hash(password,10)
        .then(hpassword=>{
            const user = new User({
            name, password: hpassword, email
        })

        user.save()
        .then(user=>{
            res.json({message:"New user created. "})
        })
        .catch(err=>{
            console.log(err)
        })
    })
    .catch(err=>{
        console.log(err)
    })
})
})

router.post('/login', (req, res)=>{
    const { email, password } = req.body
    if (!email || !password){
        res.statusCode(422).json({error: "Missing email or password. "})
    }
    User.findOne({email: email})
    .then(dbUser=>{
        if(!dbUser){
            res.statusCode(422).json({error: "Incorrect email or password. "})
        }
        bcryptjs.compare(password, dbUser.password)
        .then(pw_bool=>{
            if(pw_bool){
                //Password matches, success
                const t = token.sign({_id:dbUser._id}, JWT)
                const { _id, name, email } = dbUser
                res.json({token: t, user:{ _id, name, email }})
            }
            else {
                res.statusCode(422).json({error: "Incorrect email or password. "})
            }
        })
        .catch(err=>{
            console.log(err)
        })
    })
})


module.exports = router