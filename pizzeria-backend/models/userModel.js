const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {type: String},
    email: {type: String, required: true},
    password: {type: String, required: true},
    userId: {type: String},
    cartId: {type: String}
})

module.exports =  mongoose.model('User', userSchema);