const express = require('express');
const router = express.Router();

const raspberryPiController = require('../controllers/raspberry_pi');

/********************************************************
 * Finish imports, start processing
 */

/**
 * Turn LED on
 */
router.get('/turn-on/:pin', raspberryPiController.turnOn );

/**
 * Turn LED off
 */
router.get('/turn-off/:pin', raspberryPiController.turnOff );

/********************************************************
 * Export Router
 */
module.exports = router;