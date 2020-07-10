const express = require('express');
const eventFeedController = require('../controllers/event_feed');
const { body, param } = require('express-validator');
const reqTrim = require('../helpers/trim_request');
const isAuth = require('../helpers/is_authenticated');

const router = express.Router();

/**
 * Read events
 * router.get('/events', isAuth, eventFeedController.getEvents); 
 */
router.get(
    '/events',
    [
        param('param')
            .matches(/\d/)
            .toInt()
    ],
    eventFeedController.getEvents);  

router.get('/event/:eventId', eventFeedController.getSingleEvent);  

/**
 * Create Event
 * router.post('/event', isAuth, reqTrim, eventFeedController.createEvent);
 */
router.post(
        '/event', 
        [
            body('evt_time_from')
                .not().isEmpty()
                .withMessage('Please fille starting time'),
            body('evt_time_to')
                .not().isEmpty()
                .withMessage('Please fille ending time'),
            body('evt_organizer')
                .not().isEmpty()
                .withMessage('Organizer may not be empty'),
            body('evt_title')
                .not().isEmpty()
                .withMessage('Please add an title to the event.')
        ],
        isAuth, 
        reqTrim, 
        eventFeedController.createEvent
    );

/**
 * Update Event
 * router.patch('/event/:eventId', isAuth, reqTrim, eventFeedController.updateSingleEvent)
 */
router.patch(
        '/event/:eventId',
        [
            body('time_from')
                .not().isEmpty()
                .withMessage('Please fille starting time'),
            body('time_to')
                .not().isEmpty()
                .withMessage('Please fille ending time'),
            body('organizer')
                .not().isEmpty()
                .withMessage('Organizer may not be empty')
        ],
        isAuth, 
        reqTrim, 
        eventFeedController.updateSingleEvent
    )

/**
 * Delete Event
 */
router.delete('/event/:eventId', isAuth, eventFeedController.deleteSingleEvent);



module.exports = router;
