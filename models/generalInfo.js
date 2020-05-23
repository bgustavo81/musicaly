const pool = require('../config/pool');

module.exports = class GeneraInfo {
    constructor(user_id, website, location, level, bio, interests) {
        this.user_id = user_id;
        this.website = website;
        this.location = location;
        this.level = level;
        this.bio = bio;
        this.interests = interests
    }

    static getGeneralInfoById(user_id) {
        return pool.query(
            'SELECT * FROM general_info WHERE user_id = $1',
            [user_id]
        )
    }


    static getProfileById(user_id) {
        return pool.query(
            `SELECT * FROM general_info 
                INNER JOIN experience ON general_info.user_id = experience.user_id 
                INNER JOIN social ON general_info.user_id = social.user_id 
                WHERE general_info.user_id = $1`,
            [user_id]
        )
    }

    static getProfileImage(user_id) {
        return pool.query(
            `SELECT image FROM general_info WHERE user_id = $1`,
            [user_id]
        )
    }

    static addProfileImage(image, user_id) {
        return pool.query(
            `UPDATE general_info SET
                image = $1
                WHERE user_id = $2`,
            [image, user_id]
        )
    }

    createGeneralInfo() {
        return pool.query(
            `INSERT INTO general_info (user_id, website, location, level, bio, interests)
                VALUES ($1, $2, $3, $4, $5, $6)`,
            [this.user_id, this.website, this.location, this.level, this.bio, this.interests]
        )
    }

    static updateGeneralInfo(website, location, level, bio, interests, user_id) {
        return pool.query(
            `UPDATE general_info SET 
                website = $1,
                location = $2,
                level = $3,
                bio = $4,
                interests = $5
                WHERE user_id = $6`,
            [website, location, level, bio, interests, user_id]
        )
    }
    
    static deleteGeneralInfoByAuthor(user_id) {
        return pool.query(
            'DELETE FROM general_info WHERE user_id = $1',
            [user_id]
        )
    }
}