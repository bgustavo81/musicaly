import React from 'react';
import {Link} from "react-router-dom";

import onlineIcon from '../icons/onlineIcon.png';
import closeIcon from '../icons/closeIcon.png';

import './InfoBar.css';

const InfoBar = ({ auth, chat }) => {

  return !auth || !chat ? (
    <span></span>
  ):(
    <div className="infoBar">
    <div className="leftInnerContainer">
      <img className="onlineIcon" src={onlineIcon} alt="online icon" />
      {auth.id === chat.admin ? (
        <h3>{chat.recipient_name}</h3>
      ) : (
        <h3>{chat.admin_name}</h3>
      )}
    </div>
    <div className="rightInnerContainer">
      <Link to="/chats"><img src={closeIcon} alt="close icon" /></Link>
    </div>
  </div>
  );
}



export default InfoBar;