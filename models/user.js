const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Userschema = new Schema({
    name: {type: String, required: true},
    email: {type: String, unique: true},
    password: {type: String, min: 6, max: 16}
}, {timestamps : true})

const UserModel = mongoose.model("User" , Userschema);

module.exports = UserModel;