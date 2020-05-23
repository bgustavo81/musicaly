import React, {useState, useEffect} from 'react';
import openSocket from 'socket.io-client';
import { connect } from 'react-redux';
import { deleteMessage, dispatchMessageDelete } from '../../../../actions/index';
import Moment from "react-moment";


import './Message.css';


const Message = ({ 
  dispatchMessageDelete,
  message: {message_id, user_id, content, created_at}, 
  deleteMessage,
  name,
}) => {
  let isSentByCurrentUser = false;
  const [displayDropdown, toggleDropdown] = useState(false);
  const ENDPOINT = 'https://musical-app.herokuapp.com/';

  useEffect(() => {
    const socket = openSocket(ENDPOINT);
    socket.on('messages', data => {
      if (data.action === 'delete') {
        dispatchMessageDelete(data.message_id);
      }
    })

    return () => {
      socket.emit('disconnect');
      socket.off();
    }
  }, [])

  if(user_id === name) {
    isSentByCurrentUser = true;
  }

  return (
    isSentByCurrentUser
      ? (
        <div className="messageContainer justifyEnd">
          <div className="messageBox backgroundBlue">
            <span className="messageContent">
              <p className="messageText colorWhite">{content}</p>
              <p className="sentText pr-10 colorWhite"><Moment format="YYYY/MM/DD hh:mm">{created_at}</Moment></p>
            </span>
            <span className="messageDropdown">
              <button 
                onClick={() => toggleDropdown(!displayDropdown)}
                type="button"
                className="messageDropdownButton btn-light">
              <i className="fas fa-chevron-down"></i>
              </button>
            {displayDropdown && (
            <button
              onClick={() => {
                toggleDropdown(!displayDropdown);
                deleteMessage(message_id);
              }}
              type="button"
              className="messageDropdownTrash btn-danger">
              <i className="fas fa-trash" />
            </button>
            )}
            </span>
          </div>
        </div>
        )
        : (
          <div className="messageContainer justifyStart">
            <div className="messageBox backgroundLight">
            <span className="messageContent">
              <p className="messageText colorDark">{content}</p>
              <p className="sentText pl-10 "><Moment format="YYYY/MM/DD hh:mm">{created_at}</Moment></p>
            </span>
            </div>
          </div>
        )
  );
}

export default connect (
  null,
  { deleteMessage, dispatchMessageDelete }
)(Message);