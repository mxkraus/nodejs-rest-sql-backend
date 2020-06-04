const express = require('express');
const eventFeedController = require('../controllers/event_feed');
const reqTrim = require('../helpers/trim_request');
const isAuth = require('../helpers/is_authenticated');

const router = express.Router();

/**
 * Read events
 */
router.get('/events', isAuth, eventFeedController.getEvents);  

router.get('/events/:organizer', isAuth, eventFeedController.getEvents);  

router.get('/event/:eventId', isAuth, eventFeedController.getSingleEvent);  

/**
 * Create Event
 */
router.post('/event', isAuth, reqTrim, eventFeedController.createEvent);

/**
 * Update Event
 */
router.patch('/event/:eventId', isAuth, reqTrim, eventFeedController.updateSingleEvent)

/**
 * Delete Event
 */
router.delete('/event/:eventId', isAuth, eventFeedController.deleteSingleEvent);



module.exports = router;
