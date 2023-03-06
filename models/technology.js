const mongoose = require("mongoose");

const schema = mongoose.Schema({
    name : String,
    category : String, 
    ring : String, 
    descTech : String,
    descRing : String,
    published : Boolean,
    publishedAt : Date,
    createdAt : Date,
    createdBy : mongoose.ObjectId,
    history : [{
        name : String,
        changedBy : mongoose.ObjectId,
        updatedAt : Date
    }]
},
    {collection : "Technology"}
);

module.exports = mongoose.model("Technology", schema);