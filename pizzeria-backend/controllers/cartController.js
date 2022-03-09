const Cart = require('../models/cartModel.js');

module.exports.fetchCart = async (req, res) => {
    //creates new cart for new users
    const cart = await Cart.findOne({cartId : req.params.cartId});
        if(cart){
            return res.status(200).json(cart);
        }
        console.log('cart not found....creating')

        const result = await Cart.create({ userId: req.params.cartId, cartId: req.params.cartId, items: [], customPizza: []});

        console.log(result);

        res.status(200).json(result);
    
}

module.exports.addToCart = async (req, res) => {

    console.log(req.body)
    
    const alreadyExists = await Cart.findOne({cartId: req.body.cartId, "items.id":req.body.pizzaId});

    if(alreadyExists){
        const result = await Cart.updateOne({cartId: req.body.cartId, "items.id":req.body.pizzaId}, {$inc: {"items.$.qty": 1}});
        console.log('quantity inc')
        return res.status(200).json(result);
    }

    const result = await Cart.updateOne({cartId: req.body.cartId}, {$push : {items: {id:req.body.pizzaId, qty: 1}}});
    console.log('new added')
    res.status(200).json(result);
}

module.exports.deleteFromCart = async (req, res) => {
    const result = await Cart.updateOne({cartId: req.body.cartId}, {$pull: {items:{id: req.body.pizzaId}}});
    res.status(200).json(result);
}

module.exports.addCustomToCart = async (req, res) => {
    
    //const alreadyExists = await Cart.findOne({cartId: req.body.cartId, "customPizza.id":req.body.pizzaId});

    // if(alreadyExists){
    //     const result = await Cart.updateOne({cartId: req.body.cartId, "items.id":req.body.pizzaId}, {$inc: {"items.$.qty": 1}});
    //     console.log('quantity inc')
    //     return res.status(200).json(result);
    // }
    const imageUrl = "https://image.shutterstock.com/z/stock-photo-top-view-with-a-sliced-pizza-primavera-on-a-blue-table-vegetarian-pizza-flat-lay-sliced-pizza-1801094347.jpg";

    console.log(req.body)
    const customPizza = {
        name: req.body.name,
        toppings: req.body.toppings,
        image: imageUrl,
        price: req.body.price,
        qty: 1
    }
    const result = await Cart.updateOne({cartId: req.body.cartId}, {$push : {customPizzas: customPizza}});
    console.log('new custom pizza added')
    res.status(200).json(result);
}

module.exports.deleteCustomFromCart = async (req, res) => {
    const result = await Cart.updateOne({cartId: req.body.cartId}, {$pull: {customPizza:{id: req.body.pizzaId}}});
    res.status(200).json(result);
}

module.exports.increaseQuantity = async (req, res) => {
    const result = await Cart.updateOne({cartId: req.body.cartId, "items.id":req.body.pizzaId}, {$inc: {"items.$.qty": 1}});
    res.status(200).json(result);
}

module.exports.decreaseQuantity = async (req, res) => {
    const result = await Cart.updateOne({cartId: req.body.cartId, "items.id":req.body.pizzaId}, {$inc: {"items.$.qty": -1}});
    res.status(200).json(result);
}

module.exports.test = async (req, res) => {
    const image = 'https://image.shutterstock.com/z/stock-photo-top-view-with-a-sliced-pizza-primavera-on-a-blue-table-vegetarian-pizza-flat-lay-sliced-pizza-1801094347.jpg';

    const result = await Cart.findOne({cartId: req.params.cartId, "items.id":req.params.pizzaId});
    res.status(200).json(result);
}