const db = require('../util/db');

module.exports = class Event{

    constructor( time_from, time_to, organizer, title, place, details, created_from, created_at, updated_at ) {
        this.time_from = time_from,
        this.time_to = time_to,
        this.organizer = organizer,
        this.title = title,
        this.place = place,
        this.details = details,
        this.created_from = created_from,
        this.created_at = created_at,
        this.updated_at = updated_at
    }

    /**
     * POST-Handler
     */
    save(){
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

    static getByOrgId( orgId ){
        return db.execute(
            'SELECT * FROM ap_events AS evt WHERE evt_organizer = ?', 
            [orgId]
        )
    }

    static getById( evtId ){
        return db.execute(
            'SELECT * from ap_events WHERE evt_id = ?', 
            [evtId]
        )
    }

    static getByUserId( usrId ){
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
    updateSingleEvent( evtId ){
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
    static deleteSingleEvent( evtId ){
        return db.execute(
            'DELETE FROM ap_events WHERE evt_id = ?', 
            [evtId]
        );
    }


}