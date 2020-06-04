const db = require('../util/db');

module.exports = class User {
    
    constructor(email, first_name, last_name, password, organisation, role){
        this.email = email; 
        this.first_name = first_name; 
        this.last_name = last_name; 
        this.password = password; 
        this.organisation = organisation; 
        this.role = role; 
    }

    save(){
        return db.execute(
            'INSERT INTO ap_users ( email, first_name, last_name, password, organisation, role) ' + 
            'VALUES (?, ?, ?, ?, ?, ?)',
            [
                this.email,
                this.first_name,
                this.last_name,
                this.password,
                this.organisation,
                this.role
            ]
        );
    }

    static getByEmail( email ){
        return db.execute(
            'SELECT * FROM ap_users WHERE email = ?',
            [email]
        )
    }
    
}