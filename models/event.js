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
            'INSERT INTO ap_events (time_from, time_to, organizer, title, place, details, created_from, created_at, updated_at) ' + 
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
    static getAllEvents() {
        return db.execute(
            'SELECT * from ap_events as evt '
            // 'INNER JOIN ap_organizations AS org ON org.id = evt.organizer '+
            // 'INNER JOIN ap_users AS usr ON usr.id = evt.created_from'
        );
    }

    static getEventsByOrganizer( organizer ){
        return db.execute(
            'SELECT * FROM ap_organizations AS org INNER JOIN ap_events as evt ' +
            'ON org.id = evt.organizer ' +
            'WHERE org.name = ?', [organizer]
        )
    }

    static getEventById( evtId ){
        return db.execute(
            'SELECT * from ap_events where ID = ?', [evtId]
        )
    }

    /**
     * PATCH-Handler
     */
    updateSingleEvent( evtId ){
        return db.execute(
            'UPDATE ap_events ' +
            'SET time_from = ?, time_to = ?, organizer = ?, title = ?, place = ?, details = ?, created_from = ?, created_at = ?, updated_at = ? ' +
            'WHERE id = ?', 
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
            'DELETE FROM ap_events WHERE id = ?', [evtId]
        );
    }


}