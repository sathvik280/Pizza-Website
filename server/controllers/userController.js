const userModel = require('../models/userModel');

const updateUserCart = async (req, res) => {
    try 
    {
        const {
            userId, 
            newCart
        } = req.body;

        const user = await userModel.findOne( {_id: userId} );

        if (!user)
        {
            res.status(404).json( {message: 'user not found'} );
            return;
        }

        user.cart = [...newCart];
        await user.save();

        res.status(200).json( {message: 'user details successfully updated'} );
    }

    catch (error)
    {
        res.status(500).json( {message: error.message} );
    }
};

module.exports = { updateUserCart };