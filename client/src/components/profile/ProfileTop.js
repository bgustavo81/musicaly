import React from "react";
import PropTypes from "prop-types";

const ProfileTop = ({
  profile: {
    level,
    image,
    bands,
    location,
    website,
    name,
    twitter,
    youtube,
    facebook,
    instagram,
    bandcamp
  }
}) => {
  return (
    <div class="profile-top bg-primary p-2">
      {image ? (
        <>
        <img src={'https://foto-bucket-12345.s3.us-east-2.amazonaws.com/' + image} alt="" className="round-img" />
        </>
      ) : (
        <img src={'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'} alt="" className="round-img" />
      )}      
      <h1 class="large">{name}</h1>
      <p class="lead">
        {level} {bands && <span> at {bands}</span>}{" "}
      </p>
      <p>{location && <span>{location}</span>}</p>
      <div class="icons my-1">
        {website && (
          <a href={website} target="_blank" rel="noopener noreferrer">
            <i class="fas fa-globe fa-2x"></i>
          </a>
        )}
        {twitter && (
          <a href={twitter} target="_blank" rel="noopener noreferrer">
            <i class="fab fa-twitter fa-2x"></i>
          </a>
        )}
        {facebook && (
          <a href={facebook} target="_blank" rel="noopener noreferrer">
            <i class="fab fa-facebook fa-2x"></i>
          </a>
        )}
        {instagram && (
          <a href={instagram} target="_blank" rel="noopener noreferrer">
            <i class="fab fa-instagram fa-2x"></i>
          </a>
        )}
        {youtube && (
          <a href={youtube} target="_blank" rel="noopener noreferrer">
            <i class="fab fa-youtube fa-2x"></i>
          </a>
        )}
        {bandcamp && (
          <a href={bandcamp} target="_blank" rel="noopener noreferrer">
            <i class="fab fa-bandcamp fa-2x"></i>
          </a>
        )}
      </div>
    </div>
  );
};

ProfileTop.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileTop;
