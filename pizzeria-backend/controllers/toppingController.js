const Topping = require('../models/toppingModel.js');

module.exports.fetchToppings = (req, res) => {
    Topping.find({},(err, data) => {
        if(err){
            res.send(err);
        }else{
            res.send(data);
        }
    });
    
}