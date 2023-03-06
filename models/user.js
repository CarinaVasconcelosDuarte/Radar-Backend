const mongoose = require("mongoose");

const schema = mongoose.Schema({
    username: String,
    password: String,
    admin: Boolean
},
    {collection : 'User'}
);

module.exports = mongoose.model("User", schema);