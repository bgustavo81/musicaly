import React, { Fragment } from "react";
import PropTypes from "prop-types";

const ProfileAbout = ({
  profile: {
    bio,
    name,
    interests
  }
}) => {
  return (
    <div class="profile-about bg-light p-2">
      {bio && (
        <Fragment>
          <h2 class="text-primary">{name.trim().split(" ")[0]}'s Bio</h2>
          <p>{bio}</p>
          <div class="line"></div>
        </Fragment>
      )}
      <h2 class="text-primary">Musical interests</h2>
      <div class="skills">
      { interests ? (
          interests.split(", ").map((interests, index) => (
            <>
            <div key={index} className="text-primary">
              <i className="fas fa-check" /> {interests} &emsp;
            </div>
            </>
          ))
        ) : (
          <span></span>
        )}
      </div>
    </div>
  );
};

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileAbout;
