const verifyAdmin = (req, res, next) => {
    try 
    {
        let adminKey = req.header('authorization');

        if (!adminKey)
        {
            res.status(401).json( {message: 'access denied'} );
            return;
        }

        if (adminKey !== process.env.ADMIN_KEY)
        {
            res.status(403).json( {message: 'access denied'} );
            return;
        }

        next();
    }

    catch (error)
    {
        res.status(500).status( {message: error.message} );
    }
};

module.exports = verifyAdmin;