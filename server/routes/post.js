const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const requireLogin = require('../middlewear/requireLogin')
const Event = mongoose.model("Event")

router.get('/all', (req, res)=>{
    Event.find()
    .populate("author", "_id name")
    .then(events=>{
        res.json({events})
    })
    .catch(err=>{
        console.log(err)
    })
})

router.post('/new', requireLogin, (req, res)=>{
    const { title, description, date, img } = req.body
    if(!title || !description || !date ){
        res.status(422).json({error: "Missing title, description or date. These elements are required. "})
        return
    }
    req.user.password = undefined
    const event = new Event({
        title, 
        description, 
        author: req.user,
        date,
        img
    })

    event.save().then(result=>{
        res.json({event: result})
    })
    .catch(err=>{
        console.log(err)
    })
})

router.get('/history', requireLogin, (req, res)=>{
    Event.find({author: req.user._id })
    .populate("author", "_id name")
    .then(history=>{
        res.json({history})
    })
    .catch(err=>{
        console.log(err)
    })
})

module.exports = router