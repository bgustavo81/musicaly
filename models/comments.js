const pool = require('../config/pool');

module.exports = class Comments {
    constructor(comm_id, content, author, created_by, post_id) {
        this.comm_id = comm_id;
        this.content = content;
        this.author = author;
        this.created_by = created_by;
        this.post_id  = post_id;
    }

    static getCommentById(comm_id) {
        return pool.query(
            'SELECT * FROM comments WHERE comm_id = $1',
            [comm_id]
        )
    }

    static getLatestCommentByUser(created_by) {
        return pool.query(
            `SELECT * FROM comments WHERE created_by = $1 ORDER BY created_at DESC LIMIT 1`,
            [created_by]
        );
    };

    static getCommentsByPostId(post_id) {
        return pool.query(
            'SELECT * FROM comments WHERE post_id = $1 ORDER BY created_at ASC',
            [post_id]
        );
    }

    createComment() {
        return pool.query(
            `INSERT INTO comments (content, author, created_by, post_id)
                VALUES ($1, $2, $3, $4)`,
            [this.content, this.author, this.created_by, this.post_id]
        )
    }

    static updateComment(comm_id, content, author, created_by) {
        return pool.query(
            `UPDATE comments SET
                content = $1,
                author = $2,
                created_by = $3
                WHERE comm_id = $4`,
            [content, author, created_by, comm_id]
        )
    }

    static deleteComment(comm_id) {
        return pool.query(
            'DELETE FROM comments WHERE comm_id = $1',
            [comm_id]
        )
    }

    static deleteCommentsByAuthor(author) {
        return pool.query(
            'DELETE FROM posts WHERE created_by = $1',
            [author]
        )
    }
}