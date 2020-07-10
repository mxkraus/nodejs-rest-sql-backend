const Event = require('../models/event')
const { param, validationResult } = require('express-validator');

/**
 * Read Events
 */
exports.getEvents = (req, res, next) => {
    const query = req.query;
    if(query['usr_id']){
        Event.getByUserId( query['usr_id'] )
            .then(([rows, fieldData]) => {
                res.status(200).json({
                    message: 'Fetched events successfully.',
                    events: rows            
                });
            })
            .catch( err => {
                if(!err.statusCode){
                    err.statusCode = 500;
                }
                next(err);
            });
    }else if(query['org_id']){
        Event.getByOrgId( query['org_id'] )
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
    }else{
        Event.getAll()
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
    }
}

exports.getSingleEvent = (req, res, next) => {
    const eventId = req.params.eventId;
    Event.getById( eventId )
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
        const error = new Error();
        error.statusCode = 401;
        error.data = errors.array();
        error.message = error.data[0].msg;
        throw error;
    }

    const tf = req.body.evt_time_from;
    const tt = req.body.evt_time_to;
    const oz = req.body.evt_organizer;
    const tl = req.body.evt_title;
    const pl = req.body.evt_place;
    const dt = req.body.evt_details;
    const cf = req.body.evt_created_from;
    const ca = req.body.evt_created_at;
    const ua = req.body.evt_updated_at;

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
        const error = new Error();
        error.statusCode = 401;
        error.data = errors.array();
        error.message = error.data[0].msg;
        throw error;
    }

    const tf = req.body.evt_time_from;
    const tt = req.body.evt_time_to;
    const oz = req.body.evt_organizer;
    const tl = req.body.evt_title;
    const pl = req.body.evt_place;
    const dt = req.body.evt_details;
    const cf = req.body.evt_created_from;
    const ca = req.body.evt_created_at;
    const ua = req.body.evt_updated_at;

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
        const error = new Error();
        error.statusCode = 401;
        error.data = errors.array();
        error.message = error.data[0].msg;
        throw error;
    }

    Event.deleteSingleEvent( eventId )
        .then( result => {
            res.status(200).json({
                message: 'Post deleted sucessfully!',
                eventId: eventId
            })
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
}