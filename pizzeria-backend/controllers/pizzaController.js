const Pizza = require('../models/pizzaModel.js');

module.exports.fetchPizzas = (req, res) => {
    Pizza.find({},(err, data) => {
        if(err){
            res.send(err);
        }else{
            res.status(200).json(data);
        }
    });
    
}

module.exports.getPizzaById = (req, res) => {
    Pizza.find({id: req.params.pizzaId},(err, data) => {
        if(err){
            res.send(err);
        }else{
            res.status(200).json(data);
        }
    });
    
}