const express = require("express");
const { fetchPizzas, getPizzaById } = require('../controllers/pizzaController.js')

const router = express.Router();

router.get('/', fetchPizzas);
router.get('/:pizzaId', getPizzaById)

module.exports = router;