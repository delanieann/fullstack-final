const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema.Types
const eventSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    photo:{
        type:String,
        default:"None"
    },
    author:{
        type:ObjectId,
        ref:"User"
    },
    date:{
        type:Date,
        required:true
    }
})

mongoose.model("Event", eventSchema)