import React, { useEffect } from "react";
import PropTypes from "prop-types"
import { connect } from "react-redux";
import { getChat } from "../../actions/index";
import TextContainer from './TextContainer/TextContainer';
import Messages from './Messages/Messages';
import InfoBar from './InfoBar/InfoBar';
import Input from './Input/InputForm';

import './Chat.css';
import Spinner from "../Spinner";


const Chat = ({ 
  getChat, 
  message: {messages}, 
  chat: {chat}, 
  auth,
  match 
}) => {
  useEffect(() => {
    let room_id = match.params.room_id;
    getChat(room_id);
  }, [getChat]);

  return (!auth || !messages) ? (
      <>
      <Spinner />
      </>
    ) : (
    <div className="outerContainer">
      <div className="chatContainer">
          <InfoBar auth={auth} chat={chat}/>
          <Messages messages={messages} name={auth.id} />
          <Input room_id={match.params.room_id} match={match} />
      </div>
      <TextContainer user={auth} recipient={messages.recipient}/>
    </div>
    )
}

Chat.propTypes = {
  getChat: PropTypes.func.isRequired,
  message: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  chat: state.chat,
  message: state.message,
  auth: state.auth.user
});

export default connect(
  mapStateToProps,
  { getChat }
)(Chat);