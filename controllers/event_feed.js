const Event = require('../models/event')
const { validationResult } = require('express-validator');

/**
 * Read Events
 */
exports.getEvents = (req, res, next) => {
    // read all Events from DB
    const organizer = req.params.organizer;
    if (!organizer){
        Event.getAllEvents()
            .then(([rows, fieldData]) => {
                res.status(200).json({
                    message: 'Fetched events successfully.',
                    events: rows            
                });
            })
            .catch(err => {
                if (!err.statusCode) {
                err.statusCode = 500;
                }
                next(err);
            });
    }else{
        Event.getEventsByOrganizer( organizer )
            .then(([rows, fieldData]) => {
                res.status(200).json({
                    message: 'Fetched organizer events successfully.',
                    events: rows              
                });
            })
            .catch(err => {
                if (!err.statusCode) {
                err.statusCode = 500;
                }
                next(err);
            });
    }
}

exports.getSingleEvent = (req, res, next) => {
    const eventId = req.params.eventId;
    Event.getEventById( eventId )
        .then(([event, fieldData]) => {
            if (!event) {
                const error = new Error('Could not find event.');
                error.statusCode = 404;
                throw error;
            }
            res.status(200).json({
                message: 'Fetched event successfully.',
                event: event            
            });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
}

/**
 * Create Event
 */
exports.createEvent = (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Validation failed, entered data is incorrect.');
        error.statusCode = 422;
        throw error;
    }

    const tf = req.body.time_from;
    const tt = req.body.time_to;
    const oz = req.body.organizer;
    const tl = req.body.title;
    const pl = req.body.place;
    const dt = req.body.details;
    const cf = req.body.created_from;
    const ca = req.body.created_at;
    const ua = req.body.updated_at;

    const event = new Event( tf, tt, oz, tl, pl, dt, cf, ca, ua );

    event
        .save()
        .then( result => {
            res.status(201).json({
                message: 'Post created successfully!',
                event: event,
            });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });

}

/**
 * Update Event
 */
exports.updateSingleEvent = (req, res, next) => {
    const eventId = req.params.eventId;
    if (!eventId) {
        const error = new Error('No EventId transferred');
        error.statusCode = 422;
        throw error;
    }

    const tf = req.body.time_from;
    const tt = req.body.time_to;
    const oz = req.body.organizer;
    const tl = req.body.title;
    const pl = req.body.place;
    const dt = req.body.details;
    const cf = req.body.created_from;
    const ca = req.body.created_at;
    const ua = req.body.updated_at;

    const event = new Event( tf, tt, oz, tl, pl, dt, cf, ca, ua );

    event
        .updateSingleEvent( eventId )
        .then( result => {
            res.status(201).json({
                message: 'Post updated successfully!',
                
            });
            console.log(eventId);
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
}

/**
 * Delete Event
 */
exports.deleteSingleEvent = (req, res, next) => {
    const eventId = req.params.eventId;
    if (!eventId) {
        const error = new Error('No EventId transferred');
        error.statusCode = 422;
        throw error;
    }
    Event.deleteSingleEvent( eventId )
        .then( result => {
            res.status(200).json({
                message: 'Post deleted sucessfully!',
                event: Event.getEventById(eventId)
            })
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
}