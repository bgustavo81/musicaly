const pool = require('../config/pool');

module.exports = class Posts {
    constructor(post_id, author, title, content, created_by, user_id, likes) {
        this.post_id = post_id;
        this.author = author;
        this.title = title;
        this.content = content;
        this.created_by = created_by;
        this.user_id = user_id;
        this.likes = likes;
    }

    static getPostById(post_id) {
        return pool.query(
            'SELECT * FROM posts WHERE post_id = $1',
            [post_id]
        )
    };

    static getLatestPostByUser(created_by) {
        return pool.query(
            `SELECT * FROM posts WHERE created_by = $1 ORDER BY created_at DESC LIMIT 1`,
            [created_by]
        );
    };

    static getPosts() {
        return pool.query(
            'SELECT * FROM posts ORDER BY created_at DESC'
        )
    }

    createPost() {
        return pool.query(
            `INSERT INTO posts (author, title, content, created_by)
                VALUES ($1, $2, $3, $4)`,
            [this.author, this.title, this.content, this.created_by]
        )
    }

    static updatePost(post_id, author, title, content) {
        return pool.query(
            `UPDATE posts SET
            author = $1,
            title = $2,
            content = $3
            WHERE posts_id = $4`,
            [author, title, content, post_id]
        )
    }

    static getLikeByUser(post_id, user_id) {
        return pool.query(
            `SELECT * FROM likes WHERE (post_id = $1 AND user_id = $2)`,
            [post_id, user_id]
        );
    };

    static getLikes(post_id) {
        return pool.query(
            'SELECT likes FROM posts WHERE post_id = $1',
            [post_id]
        );
    };

    static getSumLikes(post_id) {
        return pool.query(
            'SELECT SUM(likes) FROM likes WHERE post_id = $1',
            [post_id]
        );
    };

    createLike() {
        return pool.query(
            'INSERT INTO likes (user_id, post_id, likes) VALUES ($1, $2, $3)',
            [this.user_id, this.post_id, this.likes]
        );
    };

    static deleteLike(post_id, user_id) {
        return pool.query(
            `DELETE FROM likes WHERE post_id = $1 AND user_id = $2`,
            [post_id, user_id]
        )
    }

    static postLike(post_id, user_id) {
        return pool.query(
            `UPDATE likes SET
                likes = 1
                WHERE post_id = $1 AND  user_id = $2`,
            [post_id, user_id]
        );
    };

    static updateLikes(post_id, likes) {
        return pool.query(
            `UPDATE posts SET
                likes = $1
                WHERE post_id = $2`,
            [likes, post_id]
        )
    }

    static deletePostById(post_id) {
        return pool.query(
            'DELETE FROM posts WHERE post_id = $1',
            [post_id]
        )
    }

    static deletePostsByAuthor(author) {
        return pool.query(
            'DELETE FROM posts WHERE created_by = $1',
            [author]
        )
    }

}