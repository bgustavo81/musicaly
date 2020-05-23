import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import openSocket from 'socket.io-client';
import { addMessage, dispatchMessageAddition } from "../../../actions/index";

import './InputForm.css';

const InputForm = ({ addMessage, dispatchMessageAddition, room_id, match }) => {
  const [message, setMessage] = useState("");
  const ENDPOINT = 'https://musical-app.herokuapp.com/';

  useEffect(() => {
    const socket = openSocket(ENDPOINT);
    socket.on('messages', data => {
      const room_id = parseInt(match.params.room_id);
      console.log(data);
      console.log(data.action === 'create')
      console.log(data.message.room_id === room_id);
      if (data.action === 'create' && data.message.room_id === room_id) {

        dispatchMessageAddition(data.message);
      }
    })

    return () => {
      socket.emit('disconnect');
      socket.off();
    }
  })

  return (
    <form 
      className="chatForm"
      onSubmit={e => {
        e.preventDefault();
        addMessage({message, room_id});
        setMessage("");
      }}>
      <input
        className="textInput"
        type="text"
        placeholder="Type a message..."
        value={message}
        onChange={e => setMessage(e.target.value)}
        required
        onKeyPress={event => event.key === 'Enter' ? (event) : null}
      />
      <button className="textSendButton" onClick={message !== "" ? e => addMessage(e) : null}>Send</button>
    </form>
  )
}

InputForm.propTypes = {
  addMessage: PropTypes.func.isRequired
};

export default connect (
  null,
  {addMessage, dispatchMessageAddition}
)(InputForm);

