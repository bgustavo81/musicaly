const pool = require('../config/pool');

module.exports = class Chats {
    constructor(room_id, admin, recipient, content, user_id, message_id, admin_name, recipient_name) {
        this.room_id = room_id;
        this.admin = admin;
        this.recipient = recipient;
        this.content = content;
        this.user_id = user_id;
        this.message_id = message_id;
        this.admin_name = admin_name;
        this.recipient_name = recipient_name;
    }

    static getChatRoomByUsage(admin, recipient) {
        return pool.query(
            'SELECT * FROM rooms WHERE (admin = $1 AND recipient = $2) OR (recipient = $1 AND admin = $2)',
            [admin, recipient]
        );
    };

    createChatRoom() {
        return pool.query(
            `INSERT INTO rooms (admin, recipient, admin_name, recipient_name) VALUES ($1, $2, $3, $4)`,
            [this.admin, this.recipient, this.admin_name, this.recipient_name]
        );
    };

    static getChatRoomByRoomId(admin, room_id) {
        return pool.query(
            `SELECT * FROM rooms WHERE (admin = $1 or recipient = $1) AND room_id = $2`,
            [admin, room_id]
        );
    };

    static getChatMessagesByRoomId(admin, recipient, room_id) {
        return pool.query(
            `SELECT * FROM chats WHERE (user_id = $1 OR user_id = $2) AND room_id = $3 ORDER BY created_at ASC`,
            [admin, recipient, room_id]
        );
    };

    static getChatRoomsByUser(user_id) {
        return pool.query(
            `SELECT * FROM rooms WHERE (admin = $1 OR recipient = $1) ORDER BY joined_at DESC`,
            [user_id]
        );
    };

    static deleteChatRoomByIdAndAdmin(room_id, admin) {
        return pool.query(
            `DELETE FROM rooms WHERE (room_id = $1 AND admin = $2)`,
            [room_id, admin]
        );
    };

    static getLatestMessageByUser(user_id) {
        return pool.query(
            `SELECT * FROM chats WHERE user_id = $1 ORDER BY created_at DESC LIMIT 1`,
            [user_id]
        );
    };

    static getMessageByUserId(message_id) {
        return pool.query(
            `SELECT * FROM chats WHERE message_id = $1`,
            [message_id]
        );
    };

    static getMessagesByRoomId(first_user, second_user, room_id) {
        return pool.query(
            `SELECT * FROM chats WHERE (user_id = $1 AND room_id = $3) AND (user_id = $2 AND room_id = $3)`,
            [first_user, second_user, room_id]
        );
    };

    createNewMessage() {
        return pool.query(
            `INSERT INTO chats (room_id, user_id, content) VALUES ($1, $2, $3)`,
            [this.room_id, this.user_id, this.content]
        );
    };

    static deleteMessageByMessageId(message_id) {
        return pool.query(
            `DELETE FROM chats WHERE message_id = $1`,
        [message_id]
        );
    };

    static deleteMessagesByAuthor(user_id) {
        return pool.query(
            `DELETE FROM chats WHERE user_id = $1`,
            [user_id]
        );
    };

    static deleteRoomByAuthor(user_id) {
        return pool.query(
            `DELETE FROM rooms WHERE (admin = $1 OR recipient = $1)`,
            [user_id]
        );
    };
}

