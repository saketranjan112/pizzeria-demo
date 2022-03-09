const mongoose = require('mongoose');

const toppingSchema = mongoose.Schema({
    id: Number,
    price: Number,
    tname: String,
    image: String,
})

module.exports =  mongoose.model('Topping', toppingSchema);