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
    date:{
        type:Date,
        required:true
    },
    time: {
        type:String,
        required:true
    },
    author:{
        type:ObjectId,
        ref:"User"
    },
    photo:{
        type:String
    },
    likes:[{type:ObjectId, ref:"User"}],

})

mongoose.model("Event", eventSchema)