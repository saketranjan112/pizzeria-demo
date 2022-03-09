const mongoose = require('mongoose');

const cartSchema = mongoose.Schema({
    cartId : String,
    userId : String,
    items : [
        {
            id: String,
            qty: Number
        }
    ],
    customPizzas: [
        {
            name: String,
            price: Number,
            image: String,
            toppings: Array,
            qty: Number
        }
    ]
})

module.exports =  mongoose.model('Cart', cartSchema);