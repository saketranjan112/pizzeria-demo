const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

//route imports
const pizzaRoutes = require('./routes/pizzaRoutes.js');
const toppingRoutes = require('./routes/toppingRoutes.js');
const userRoutes = require('./routes/userRoutes.js');
const cartRoutes = require('./routes/cartRoutes.js');

const url = 'mongodb://localhost:27017/pizzeria';
const server = express();


server.use(bodyParser.urlencoded({extended: true}));
server.use(bodyParser.json({extended: true}));
server.use(express.static('public'));
server.use(cors());

//routes
server.use('/pizzas', pizzaRoutes);
server.use('/toppings', toppingRoutes);
server.use('/user', userRoutes);
server.use('/cart', cartRoutes);

mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true});
var db = mongoose.connection;
db.on('error', (error) => console.log(error));
db.once('open', () => console.log('connected to database'));

server.listen(4000, () => {
    console.log('Server started on port 4000');
});