const express = require('express');
const paymentRouter = express.Router();

const verifyToken = require('../middleware/authorizeUser');

const { stripePayments } = require('../controllers/paymentController');

paymentRouter.post('/', verifyToken, stripePayments);

module.exports = paymentRouter;