import React from "react";
import { connect } from "react-redux";
import { createChat } from '../../actions/index';
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const ProfileItem = ({
  createChat,
  auth,
  profile: {
    id,
    name,
    bands,
    location,
    interests,
    level,
    image
  }
}) => {
  return (
    <div className="profile bg-light">
      {image ? (
        <>
        <img src={'https://foto-bucket-12345.s3.us-east-2.amazonaws.com/' + image} alt="" className="round-img" />
        </>
      ) : (
        <img src={'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'} alt="" className="round-img" />
      )}
      <div>
        <h2>{name}</h2>
        <p>Current band: {bands && <span>at {bands}</span>}</p>
        <p className="my-1">Located: {location && <span>{location}</span>}</p>
        <p className="my-1">Level: {level && <span>{level}</span>}</p>
        <Link to={`/profile/${id}`} className="btn btn-primary">
          View Profile
        </Link>
        {auth.id === id ? (
          <>
          </>
        ): (
            <button
              onClick={e => createChat({admin: auth.id, recipient: id, admin_name: auth.name, recipient_name: name})}
              type="button"
              className="btn btn-dark">
              <i className="fas fa-comment" />
            </button>
        )}
      </div>
      <ul>
        <p>Musical Interests:</p>
        { interests ? (
          interests.split(", ").map((interests, index) => (
            <li key={index} className="text-primary">
              <i className="fas fa-check" /> {interests}
            </li>
          ))
        ) : (
          <span></span>
        )}
      </ul>
    </div>
  );
};

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired
};

export default connect(
  null,
  { createChat }
)(ProfileItem);

