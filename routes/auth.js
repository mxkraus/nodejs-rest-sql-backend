const express = require('express');
const authController = require('../controllers/auth');
const { body, check } = require('express-validator');
const User = require('../models/user');
const reqTrim = require('../helpers/trim_request');

const router = express.Router();

/**
 * Signup Endpoint
 * router.put('/signup', <validation>, reqTrim, authController.signup)
 */
router.put(
        '/signup',
        [
            body('email')
                .isEmail().withMessage('E-Mail address not valid.')
                .custom( v => {
                    return User.getByEmail( v ).then(([u]) => {
                        if(u[0]){
                            return Promise.reject('E-Mail address already exists.')
                        }
                    })
                })
                .normalizeEmail(),
            body('password')
                .trim()
                .isLength({ min: 8 }).withMessage('Password length min 8.')
                .matches(/\d/).withMessage('must contain a number')
        ],  
        reqTrim, 
        authController.signup
    );

/**
 * Login Endpoint
 */
router.post( '/login', authController.login );

module.exports = router;