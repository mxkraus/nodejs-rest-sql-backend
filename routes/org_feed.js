
const express = require('express');
const organisatorFeedController = require('../controllers/org_feed');
const { body, param } = require('express-validator');

const router = express.Router();

/**
 * Read events
 * router.get('/events', isAuth, eventFeedController.getEvents); 
 */
router.get(
    '/orgs',
    [
        param('param')
            .matches(/\d/)
            .toInt()
    ],
    organisatorFeedController.getOrgs);

module.exports = router;
