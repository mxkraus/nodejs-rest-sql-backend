
// Validaor laden um Request-Body parsen zu können
const { validationResult } = require('express-validator');

// Paket laden um Passwort verschlüsseln zu können
const bcrypt = require('bcryptjs');

// Paket laden um Token generieren zu können
const jwt = require('jsonwebtoken');

// Model laden um neuen User erzeugen zu können
const User = require('../models/user');

/**
 * Signup Handler
 */

exports.signup = (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error();
        error.statusCode = 401;
        error.data = errors.array();
        error.message = error.data[0].msg;
        throw error;
    }

    const email = req.body.email;
    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
    const password = req.body.password;
    const organisation = req.body.organisation;
    const role = req.body.role;

    bcrypt
        .hash( password, 12 )
        .then( hashedPass => {
            const user = new User( 
                email,
                first_name,
                last_name,
                hashedPass,
                organisation,
                role 
            )
            return user.save();
        })
        .then( result => {
            res.status(201).json({
                message: "User successfully created",
                user_id: result[0].insertId
            });
        })
        .catch( err => {
            if(!err.statusCode){
                err.statusCode = 500;
            }
            next(err);
        });


}

/**
 * Login Handler
 */

 exports.login = (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error();
        error.statusCode = 401;
        error.data = errors.array();
        error.message = error.data[0].msg;
        throw error;
    }

    const email = req.body.email;
    const password = req.body.password;
    let foundUser;

    User.getByEmail( email )
        .then( ([user]) => {
            if(!user[0]){
                const error = new Error("A user with this email couldnt be found.")
                res.statusCode = 401;
                throw error;
            }
            foundUser = user[0];
            return bcrypt.compare(
                password,
                user[0].usr_password
            )
        })
        .then( isEqual => {
            if(!isEqual){
                const error = new Error("This password is wrong");
                res.statusCode = 401;
                throw error;
            }
            const token = jwt.sign(
                {
                    email: foundUser.usr_email,
                    userId: foundUser.usr_id
                },
                process.env.PK_SECRET,
                { expiresIn: '1h' }
            )
            res.status(200)
                .json({
                    token: token,
                    userid: foundUser.usr_id.toString()
                });
        })
        .catch(err => {
            if (!err.statusCode) {
              err.statusCode = 500;
            }
            next(err);
        });

 }