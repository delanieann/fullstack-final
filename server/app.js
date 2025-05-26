const express = require('express')
const app = express()
const mongoose = require("mongoose")
const PORT = 5000
const {MONGOURI} = require('./keys')

mongoose.connect(MONGOURI)

mongoose.connection.on('connected', ()=>{
    console.log("connected to db")
})

mongoose.connection.on('error', (err)=>{
    console.log(err)
})

require('./models/user')
require('./models/event')

app.use(express.json())
app.use(require('./routes/auth'))
app.use(require('./routes/post'))

app.get('/',(req, res)=>{
    res.send("hello")
})

app.listen(PORT,()=>{
    console.log("Server is running on ", PORT)
})