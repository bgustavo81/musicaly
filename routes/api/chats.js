const express = require('express');
const router = express.Router();
const auth = require("../../middleware/auth");
const Chats = require("../../models/chats");


//@route POST api/chats
//@desc Create a chat room
//@access Private
router.post("/", auth, async(req, res) => {
    try {

        // Desctructuring
        const {
            admin,
            recipient,
            admin_name,
            recipient_name
        } = req.body;

        let room = await Chats.getChatRoomByUsage(admin, recipient);
        if (room.rows.length === 0) {

            room = new Chats(null, admin, recipient, null, null, null, admin_name, recipient_name);

            await room.createChatRoom();
    
            room = await Chats.getChatRoomByUsage(admin, recipient)
        }
        res.status(200).json(room.rows[0]);
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Server error in chats.js")
    }
});

//@route GET api/chats/:chat
//@desc GET a chat room
//@access Private 

router.get(
    '/:chat', auth, async(req, res) => {
        try {
            let room = await Chats.getChatRoomByRoomId(req.user.id, req.params.chat);

            const { admin, recipient, room_id} = room.rows[0];
            
            let messages = await Chats.getChatMessagesByRoomId(admin, recipient, room_id);


            res.status(200).json({
                room: room.rows[0],
                messages: messages.rows,
            });
        } catch (err) {
            console.log(err.message);
            res.status(500).send("Server error in Chats.js");
        }
});

//@route GET api/chats
//@desc GET all chat rooms
//@access Private 
router.get(
    "/", auth, async(req, res) => {
        try {
            // getting all the rooms
            let rooms = await Chats.getChatRoomsByUser(req.user.id);
            res.status(200).json(rooms.rows);
        } catch (err) {
            console.log(err.message);
            res.status(500).send("Server error in Chats.js");
        }
    }
)

//@route DELETE api/chats/:chat
//@desc DELETE chat room
//@access Private 
router.delete(
    "/:chat",
    auth,
    async(req, res) => {
        try {
            const room_id = req.params.chat;

            let room = await Chats.getChatRoomByRoomId(req.user.id, room_id)
            
            if (room.rows.length === 0) {
                console.log("error")
                return res.status(404).json({ msg: "room not found" });
            }
            //Make sure user is deleting his own rooms
            if (room.rows[0].admin !== req.user.id) {
                console.log("unauthorized")
                return res
                .status(401)
                .json({ msg: "User not authorized to delete this room" });
            }
            
            room = await Chats.deleteChatRoomByIdAndAdmin(room_id, req.user.id);
            res.status(200).json({msg: "Chat room deleted"});
        } catch (err) {
            console.log(err.message);
            res.status(500).send("Server error in Chats.js");
        }
    }
)

//@route POST api/chats/message
//@desc create message in a chat room
//@access Private
router.post( "/message", auth,
    async (req, res) => {
        const content = req.body.message;
        const room_id = req.body.room_id;
        const user_id = req.user.id;
      try { 
        let reqLoaded = content && room_id ? true : false;
        let message;
        if (reqLoaded) {   
            message = new Chats(room_id, null, null, content, user_id, null, null, null);
            await message.createNewMessage();
            message = await Chats.getLatestMessageByUser(user_id);
            // emit the new message
            io.getIO().emit('messages', {action: 'create', message: message.rows[0] });          
            res.status(200).json(message.rows[0]);
        } else {
            console.log("Waiting");
        }
      } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error in posts.js");
      }
    }
  );

//@route DELETE api/chats/message
//@desc message in a chat room
//@access Private
router.delete( "/message/:message_id", auth,
    async (req, res) => {
      try {
          let message = await Chats.getMessageByUserId(req.params.message_id);

          if (message.rows[0].user_id !== req.user.id) {
              return res.status(404).json({msg: "Operation not authorized"})
          }
        await Chats.deleteMessageByMessageId(req.params.message_id);
        // emit the new message_id
        io.getIO().io.on('connection', (socket) => {
            socket.broadcast.emit('messages', { action: 'delete', message_id: req.params.message_id })            
        });
        res.status(200).json({msg: "Message was deleted"});
      } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error in posts.js");
      }
    }
  );


module.exports = router;