let io;

module.exports = {
    // initialized server with socket
    init: httpServer => {
        io = require('socket.io')(httpServer);
        return io;
    },
    getIO: () => {
        if (!io) {
            throw new Error('Socket not initialized');
        }
        return io;
    }
};