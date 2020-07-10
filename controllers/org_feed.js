const Organisation = require('../models/organisation')
const { param, validationResult } = require('express-validator');

/**
 * Read Events
 */
exports.getOrgs = (req, res, next) => {
    const query = req.query;
    if (query['usr_id']) {
        Organisation.getByUserId(query['usr_id'])
            .then(([rows, fieldData]) => {
                res.status(200).json({
                    message: 'Fetched organisations successfully.',
                    orgs: rows
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