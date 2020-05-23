const pool = require('../config/pool');

module.exports = class Social {
    constructor(user_id, twitter, youtube, facebook, instgram, bandcamp) {
        this.user_id = user_id;
        this.twitter = twitter;
        this.youtube = youtube;
        this.facebook = facebook;
        this.instgram = instgram;
        this.bandcamp = bandcamp;
    }

    static getSocialById(user_id) {
        return pool.query(
            'SELECT * FROM social WHERE user_id = $1',
            [user_id]
        )
    }

    createSocial() {
        return pool.query(
            `INSERT INTO social (user_id, twitter, youtube, facebook, instagram, bandcamp)
                VALUES ($1, $2, $3, $4, $5, $6)`,
            [this.user_id, this.twitter, this.youtube, this.facebook, this.instgram, this.bandcamp]
        )
    }

    static updateSocial(twitter, youtube, facebook, instagram, bandcamp, user_id) {
        return pool.query(
            `UPDATE social SET 
                twitter = $1,
                youtube = $2,
                facebook = $3,
                instagram = $4,
                bandcamp = $5
                WHERE user_id = $6`,
            [twitter, youtube, facebook, instagram, bandcamp, user_id]
        )
    }

    static deleteSocialByAuthor(user_id) {
        return pool.query(
            'DELETE FROM social WHERE user_id = $1',
            [user_id]
        )
    }
}