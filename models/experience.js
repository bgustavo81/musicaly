const pool = require('../config/pool');

module.exports = class Experience {
    constructor(user_id, bands, education, years_playing, years_active) {
        this.user_id = user_id;
        this.bands = bands;
        this.education = education;
        this.years_playing = years_playing;
        this.years_active = years_active
    }

    static getExperienceById(user_id) {
        return pool.query(
            'SELECT * FROM experience WHERE user_id = $1',
            [user_id]
        )
    }

    createExperience() {
        return pool.query(
            `INSERT INTO experience (user_id, bands, education, years_playing, years_active)
                VALUES ($1, $2, $3, $4, $5)`,
            [this.user_id, this.bands, this.education, this.years_playing, this.years_active]
        )
    }    

    static updateExperience(bands, education, years_playing, years_active, user_id) {
        return pool.query(
            `UPDATE experience SET 
                bands = $1,
                education = $2,
                years_playing = $3,
                years_active = $4
                WHERE user_id = $5`,
                [bands, education, years_playing, years_active, user_id]
        )
    }

    static deleteExperienceByAuthor(user_id) {
        return pool.query(
            'DELETE FROM experience WHERE user_id = $1',
            [user_id]
        )
    }
}