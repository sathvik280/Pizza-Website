const mongoose = require('mongoose');

const pizzaSchema = mongoose.Schema({
    pizzaName: {
        type: String, 
        required: true 
    },

    category: {
        type: String, 
        required: true 
    },

    imageUrl: {
        type: String, 
        required: true 
    },

    priceSm: {
        type: Number, 
        required: true
    },

    priceMd: {
        type: Number, 
        required: true
    },

    priceLg: {
        type: Number, 
        required: true
    },

    shortDesc: {
        type: String, 
        default: 'Lorem ipsum dolor sit amet consectet adipisicing elit. quia recusandae dolor enim eveniet.'
    },

    description: {
        type: String, 
        default: 'Lorem ipsum dolor sit amet consectet adipisicing elit. quia recusandae dolor enim eveniet. mollitia laudatium, sunt blanditiis ratione quam delectus.'
    }
}, {timestamps: true} );

const pizzaModel = mongoose.model('pizzas', pizzaSchema);

module.exports = pizzaModel;