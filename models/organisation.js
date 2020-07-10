const db = require('../util/db');

module.exports = class Organisation {

    /**
     * Constructor
     */
    constructor() {}

    /**
     * POST-Handler
     */
    save() {}

    /**
     * GET-Handler
     */
    static getByUserId(usrId) {
        return db.execute(
            'SELECT * FROM ap_organizations AS org ' +
            'INNER JOIN ap_jnct_orga_user as jct ON jct.jct_organization = org.org_id ' +
            'WHERE jct_user = ?',
            [usrId]
        )
    }

}