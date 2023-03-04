const mongoose = require("mongoose");

const schema = mongoose.Schema({
    username: String,
    password: String,
    role: String
},
    {collection : 'User'}
);

module.exports = mongoose.model("User", schema);