const express = require('express');
const authController = require('../controllers/auth');
const reqTrim = require('../helpers/trim_request');

const router = express.Router();

/**
 * Signup Endpoint
 */
router.put('/signup', reqTrim, authController.signup);

/**
 * Login Endpoint
 */
router.post('/login', authController.login);


module.exports = router;