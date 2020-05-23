const pool = require('../config/pool');

module.exports = class User {
    constructor(id, email, password, name) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.name = name;
    }

    static getUserById(id) {
        return pool.query(
            'SELECT * FROM users where id = $1',
            [id]
        )
    };  
    
    static getUsers() {
        return pool.query(
            'SELECT * FROM users'
        )
    }
    
    static getProfileById(user_id) {
        return pool.query(
            `SELECT * FROM users 
                RIGHT OUTER JOIN social ON USERS.ID = social.user_id 
                RIGHT OUTER JOIN general_info ON users.id = general_info.user_id 
                RIGHT OUTER JOIN experience ON users.id = experience.user_id
                WHERE users.id = $1`,
            [user_id]
        )
    }
    
    static getProfiles() {
        return pool.query(
            `SELECT * FROM users 
                RIGHT OUTER JOIN social ON USERS.ID = social.user_id 
                RIGHT OUTER JOIN general_info ON users.id = general_info.user_id 
                RIGHT OUTER JOIN experience ON users.id = experience.user_id`,
        )
    }


    static getUserByEmail(email) {
        return pool.query(
            'SELECT * FROM users where email = $1',
            [email]
        )
    }

    static getUserById(id) {
        return pool.query(
            'SELECT * FROM users where id = $1',
            [id]
        )
    }

    static getUsers() {
        return pool.query(
            'SELECT * FROM users ORDER BY id DESC'
        )
    }

    createUser() {
        return pool.query(
            `INSERT INTO users (id, email, password, name)
                VALUES ($1, $2, $3, $4)`,
            [this.id, this.email, this.password, this.name]
        )
    }

    createLoginUser() {
        return pool.query(
            `INSERT INTO users (id, email, password, name)
                VALUES ($1, $2, $3, $4)`,
            [this.id, this.email, this.password, this.name]
        )
    }

    static updateUser(name, email, id) {
        return pool.query(
            `UPDATE users SET name = $1, email = $2 WHERE id = $3`,
            [name, email, id]
        )
    }

    static deleteUser(id) {
        return pool.query(
            'DELETE FROM users WHERE id = $1',
            [id]
        )
    }

    static deleteProfileByAuthor(author) {
        return pool.query(
            `DELETE FROM users WHERE users.id = $1`,
            [author]
        )
    }
}