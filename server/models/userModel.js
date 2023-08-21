const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String, 
        required: true 
    },

    location: {
        type: String, 
        required: true 
    },

    email: {
        type: String, 
        unique: true, 
        required: true 
    },

    password: {
        type: String, 
        required: true, 
    },

    cart: {
        type: Array, 
        default: []
    }
}, {timestamps: true} );

const userModel = mongoose.model('users', userSchema);

module.exports = userModel;