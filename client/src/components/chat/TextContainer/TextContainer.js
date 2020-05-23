import React from 'react';

import onlineIcon from '../icons/onlineIcon.png';

import './TextContainer.css';

const TextContainer = ({ user, recipient }) => (
  <div className="textContainer">
    <div>
    </div>
    {
      user & recipient
        ? (
          <div>
            <h1>People currently chatting:</h1>
            <div className="activeTextContainer">
              <h2>
                {[user, recipient].map(({name}) => (
                  <div key={name} className="activeTextItem">
                    {name}
                    <img alt="Online Icon" src={onlineIcon} className="onlineIcon"/>
                  </div>
                ))}
              </h2>
            </div>
          </div>
        )
        : null
    }
  </div>
);

export default TextContainer;