module.exports = (req, res, next) => {

    /**
     * Set "" values as NULL.
     * Needed to avoid errors on fk-constraints
     * 
     */
    
    for( var [key, value] of Object.entries(req.body)){
        if( value == "" ){
            req.body[key] = null;
        }
    }

    next();

}