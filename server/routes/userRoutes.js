const express = require('express');
const userRouter = express.Router();

const verifyToken = require('../middleware/authorizeUser');

const { updateUserCart } = require('../controllers/userController');

userRouter.patch('/', verifyToken, updateUserCart);

module.exports = userRouter;