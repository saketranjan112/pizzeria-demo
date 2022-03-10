const mongoose = require('mongoose');

const cartSchema = mongoose.Schema({
    cartId : String,
    userId : String,
    items : Array
})

module.exports =  mongoose.model('Cart', cartSchema);