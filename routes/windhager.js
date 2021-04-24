const express = require('express');
const router = express.Router();

const windagerController = require('../controllers/windhager');

/********************************************************
 * Finish imports, start processing
 */

/**
 * Windhager get Temerature
 */
router.get('/temperature/', windagerController.temperature );


/********************************************************
 * Export Router
 */
module.exports = router;