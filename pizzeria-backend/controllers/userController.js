const User = require('../models/userModel.js');
const Cart = require('../models/cartModel.js');

module.exports.signIn = async (req, res) => {
    const {email, password} = req.body;

    try {
        const user = await User.findOne({email});
        //console.log(user);
        if(!user){
            return res.status(404).json({message:'User not found'});
        }

        const isPasswordValid = password === user.password;
        //console.log(isPasswordValid);
        if(!isPasswordValid){
            console.log("bug")
            return res.status(400).json({message:'Invalid Password'});
        }

        res.status(200).json({result: user});

    } catch (error) {
        console.log('error');
        res.status(500).json({message: 'Something went wrong'});
    }
}

module.exports.register = async (req, res) => {
    const {email, password, name} = req.body;

    try {
        const user = await User.findOne({email});
        if(user){
            return res.status(400).json({message: 'User already exists'});
        }

        const count = await User.count();

        const result = await User.create({email, password, name, userId: count +1, cartId: count +1});
        Cart.create({cartId: count + 1, userId: count + 1, items: []});
        

        res.status(200).json({result});
    } catch (error) {
        res.status(500).json({message: 'Something went wrong'});
    }
}