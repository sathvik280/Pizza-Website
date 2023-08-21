const pizzaModel = require('../models/pizzaModel');
const uploadImage = require('../uploads/uploadImage');

const createPizza = async (req, res) => {
    try 
    {
        const {
            pizzaName,
            category,
            image,
            priceSm, 
            priceMd, 
            priceLg
        } = req.body;

        const response = await uploadImage(image, 'Pizzas');
        const imageUrl = response.secure_url;

        const pizza = await pizzaModel.create({
            pizzaName,
            category, 
            imageUrl, 
            priceSm, 
            priceMd, 
            priceLg
        });

        res.status(201).json(pizza);
    }

    catch (error)
    {
        res.status(500).json( {message: error.message} );
    }
};

const getAllPizzas = async (req, res) => {
    try 
    {
        const allPizzas = await pizzaModel.find( {} );

        res.status(200).json(allPizzas);
    }

    catch (error)
    {
        res.status(500).json( {message: error.message} );
    }
};

module.exports = { createPizza, getAllPizzas };