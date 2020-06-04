const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {

    /**
     * Check if bearer token was transmittet
     * 
     */

    const authHeader = req.get('Authorization');
    if(!authHeader){
        const error = new Error('Not authenticated!');
        error.statusCode = 401;
        throw error;
    }

    const token = authHeader.split(" ")[1];
    let decodedToken;

    try{
        decodedToken = jwt.verify( token, process.env.PK_SECRET)
    }catch( err ){
        err.statusCode = 500;
        throw err;
    }

    if(!decodedToken){
        const error = new Error('Not authenticated!');
        error.statusCode = 401;
        throw error;
    }

    // remember who is creating what on further actions
    req.userId = decodedToken.userId;
    req.email = decodedToken.email;

    next();

}