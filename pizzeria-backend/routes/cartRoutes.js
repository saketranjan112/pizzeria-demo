const express = require("express");
const { fetchCart, addToCart, addCustomToCart, deleteFromCart, increaseQuantity, decreaseQuantity, test } = require('../controllers/cartController.js')

const router = express.Router();

router.get('/:cartId', fetchCart);
router.post('/addToCart', addToCart);
router.post('/deleteFromCart', deleteFromCart);
router.post('/decreaseQuantity', decreaseQuantity);
router.post('/increaseQuantity', increaseQuantity);
router.get('/:cartId/:pizzaId', test);
module.exports = router;