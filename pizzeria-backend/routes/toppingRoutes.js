const express = require("express");
const { fetchToppings } = require('../controllers/toppingController.js')

const router = express.Router();

router.get('/', fetchToppings);

module.exports = router;