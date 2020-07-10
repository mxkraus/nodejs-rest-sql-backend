const db = require('../util/db');

module.exports = class Event {

    /**
     * Its possible that not every parameter is passed by the client request.
     * So we have to determine if param is there or not and in this case,
     * convert it to null.
     * 
     * In contrast to controller machanism, meodel variables
     * are not prefixed. 
     * 
     * @constructor
     * @param {string} time_from 
     * @param {string} time_to 
     * @param {int} organizer 
     * @param {string} title 
     * @param {json} place 
     * @param {string} details 
     * @param {int} created_from 
     * @param {string} created_at 
     * @param {string} updated_at 
     */

    constructor(time_from, time_to, organizer, title, place, details, created_from, created_at, updated_at) {
        this.time_from = time_from || null,
        this.time_to = time_to || null,
        this.organizer = organizer || null,
        this.title = title || null,
        this.place = place || null,
        this.details = details || null,
        this.created_from = created_from || null,
        this.created_at = created_at || null,
        this.updated_at = updated_at || null
    }

    /**
     * POST-Handler
     */
    save() {
        return db.execute(
            'INSERT INTO ap_events (evt_time_from, evt_time_to, evt_organizer, evt_title, evt_place, evt_details, evt_created_from, evt_created_at, evt_updated_at) ' +
            'VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [
                this.time_from,
                this.time_to,
                this.organizer,
                this.title,
                this.place,
                this.details,
                this.created_from,
                this.created_at,
                this.updated_at
            ]
        );
    }

    /**
     * GET-Handler
     */
    static getAll() {
        return db.execute(
            'SELECT * from ap_events AS evt '
            // 'INNER JOIN ap_organizations AS org ON org.id = evt.organizer '+
            // 'INNER JOIN ap_users AS usr ON usr.id = evt.created_from'
        );
    }

    static getByOrgId(orgId) {
        return db.execute(
            'SELECT * FROM ap_events AS evt WHERE evt_organizer = ?',
            [orgId]
        )
    }

    static getById(evtId) {
        return db.execute(
            'SELECT * from ap_events ' +
            'INNER JOIN ap_organizations ON org_id = evt_organizer ' +
            'WHERE evt_id = ?',
            [evtId]
        )
    }

    static getByUserId(usrId) {
        return db.execute(
            'SELECT * FROM ap_events AS evt ' +
            'INNER JOIN ap_jnct_orga_user as jct ON jct.jct_organization = evt.evt_organizer ' +
            'WHERE jct_user = ?',
            [usrId]
        )
    }

    /**
     * PATCH-Handler
     */
    updateSingleEvent(evtId) {
        return db.execute(
            'UPDATE ap_events ' +
            'SET evt_time_from = ?, evt_time_to = ?, evt_organizer = ?, evt_title = ?, evt_place = ?, evt_details = ?, evt_created_from = ?, evt_created_at = ?, evt_updated_at = ? ' +
            'WHERE evt_id = ?',
            [
                this.time_from,
                this.time_to,
                this.organizer,
                this.title,
                this.place,
                this.details,
                this.created_from,
                this.created_at,
                this.updated_at,
                evtId
            ]
        );
    }

    /**
     * DELETE-Handler
     */
    static deleteSingleEvent(evtId) {
        return db.execute(
            'DELETE FROM ap_events WHERE evt_id = ?',
            [evtId]
        );
    }


}