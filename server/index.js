const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded( {extended: false} ));

const connectDb = require('./db/connect');
const authRouter = require('./routes/authRoutes');
const userRouter = require('./routes/userRoutes');
const pizzaRouter = require('./routes/pizzaRoutes');
const paymentRouter = require('./routes/paymentRoutes');

app.use('/', authRouter);
app.use('/user', userRouter);
app.use('/pizza', pizzaRouter);
app.use('/payment', paymentRouter);

app.use('*', (req, res) => {
    res.status(404).json( {message: 'Invalid http request'} );
});

const port = process.env.PORT;
const url = process.env.MONGO_URL; 

const start = async () => {
    try 
    {
        await connectDb(url);
        app.listen(port, () => {
            console.log('Server running...');
        });
    }

    catch (error)
    {
        console.log(error);
    }
};

start();