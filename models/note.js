const mongoose = require("mongoose")

const noteSchema = mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    content : {
        type : String,
        default : ""
    },
    tags : {
        type : [String],
        default : []
    },
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true,
    },
    isPinned : {
        type : Boolean,
        default : false
    }

}, {timestamps : true})

const Note = mongoose.model('note', noteSchema)
module.exports = Note