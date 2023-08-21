const express = require('express');
const pizzaRouter = express.Router();

const verifyToken = require('../middleware/authorizeUser');
const verifyAdmin = require('../middleware/authorizeAdmin');

const {
    createPizza, 
    getAllPizzas
} = require('../controllers/pizzaController');

pizzaRouter.get('/', verifyToken, getAllPizzas);
pizzaRouter.post('/new', verifyAdmin, createPizza);

module.exports = pizzaRouter;