const express = require('express');
const eventFeedController = require('../controllers/event_feed');
const router = express.Router();

/**
 * Read events
 */
router.get('/events', eventFeedController.getEvents);  

router.get('/events/:organizer', eventFeedController.getEvents);  

router.get('/event/:eventId', eventFeedController.getSingleEvent);  

/**
 * Create Event
 */
router.post('/event', eventFeedController.createEvent);

/**
 * Update Event
 */
router.patch('/event/:eventId', eventFeedController.updateSingleEvent)

/**
 * Delete Event
 */
router.delete('/event/:eventId', eventFeedController.deleteSingleEvent);



module.exports = router;
