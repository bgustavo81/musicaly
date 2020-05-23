import React, { Fragment, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createProfile } from "../../actions/index";

const CreateProfile = ({ createProfile, history }) => {
  const [formData, setFormData] = useState({
    level: "",
    location: "",
    interests: "",
    website: "",
    bio: "",
    twitter: "",
    youtube: "",
    facebook: "",
    instagram: "",
    bandcamp: "",
    bands: "",
    education: "",
    years_playing: "",
    years_active: ""
  });

  const [displaySocialInputs, toggleSocialInputs] = useState(false);

  const {
    level,
    location,
    interests,
    website,
    bio,
    image,
    twitter,
    youtube,
    facebook,
    instagram,
    bandcamp,
    bands,
    education,
    years_playing,
    years_active
  } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  
  const onChangeImage = e =>
  setFormData({...formData, [e.target.name]: e.target.files[0]});

  const onSubmit = e => {
    e.preventDefault();
    createProfile(formData, history);
  };

  return (
    <Fragment>
      <h1 className="large text-primary">Create Your Profile</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Let's get some information to make your
        profile stand out
      </p>
      <small>* required field</small>
      <form className="form" onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          <select name="level" value={level} onChange={e => onChange(e)}>
            <option value="0">* Select Playing Apitutude</option>
            <option value="NewBie">NewBie</option>
            <option value="Beginner">Beginner</option>
            <option value="Novice">Novice</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
            <option value="Sage">Sage</option>
            <option value="Legend">Legend</option>
            <option value="Other">Other</option>
          </select>
          <small className="form-text">
            Give us an idea of you playing ability
          </small>
        </div>

        <div className="form-group">
          <input
            type="text"
            placeholder="Location"
            name="location"
            value={location}
            onChange={e => onChange(e)}
          />
          <small className="form-text">
            City &amp; state suggested (eg. Boston, MA)
          </small>
        </div>

        <div className="form-group">
          <input
            type="text"
            placeholder="* Interests"
            name="interests"
            value={interests}
            onChange={e => onChange(e)}
          />
          <small className="form-text">
            Please separate musical interests with commas (eg. Pearl Jam, SRV, Eric Johnson)
          </small>
        </div>

        <div className="form-group">
          <input
            type="text"
            placeholder="Bands"
            name="bands"
            value={bands}
            onChange={e => onChange(e)}
          />
          <small className="form-text">
            Share bands you have gigged with or Independent
          </small>
        </div>

        <div className="form-group">
          <input
            type="text"
            placeholder="Education"
            name="education"
            value={education}
            onChange={e => onChange(e)}
          />
          <small className="form-text">
            Share your education
          </small>
        </div>

        <div className="form-group">
          <select name="years_playing" value={years_playing} onChange={e => onChange(e)}>
            <option value="0">* Years Playing</option>
            <option value="1">under 1 year</option>
            <option value="1">1 year</option>
            <option value="2">2 years</option>
            <option value="3">3 years</option>
            <option value="4">4 years</option>
            <option value="5">over 5 years</option>
            <option value="10">over 10 years</option>
            <option value="20">over 20 years</option>
          </select>
          <small className="form-text">
            How long have you been playing for?
          </small>
        </div>

        <div className="form-group">
          <select name="years_active" value={years_active} onChange={e => onChange(e)}>
            <option value="0">* Years Playing</option>
            <option value="1">have not been gigged</option>
            <option value="5">under 5 years</option>
            <option value="10">under 10 years</option>
            <option value="15">under 15 years</option>
            <option value="20">over 15 years</option>
          </select>
          <small className="form-text">
            How long have you been gigging?
          </small>
        </div>

        <div className="form-group">
          <input
            type="text"
            placeholder="Website"
            name="website"
            value={website}
            onChange={e => onChange(e)}
          />
          <small className="form-text">
            Share your website
          </small>
        </div>

        <div className="form-group">
          <textarea
            placeholder="A short bio of yourself"
            name="bio"
            value={bio}
            onChange={e => onChange(e)}></textarea>
          <small className="form-text">Tell us more about yourself and what you play</small>
        </div>
        
        <div>
          <input
            name="image"
            type='file'
            accept='.jpg, .png, .jpeg'
            onChange={e => onChangeImage(e)}
          />
          <small className="form-text">Include a profile picture</small>
        </div>

        <div className="my-2">
          <button
            onClick={() => toggleSocialInputs(!displaySocialInputs)}
            type="button"
            className="btn btn-light">
            Add Social Network Links
          </button>
          <span>Optional</span>
        </div>

        {displaySocialInputs && (
          <Fragment>
            <div className="form-group social-input">
              <i className="fab fa-twitter fa-2x"></i>
              <input
                type="text"
                placeholder="Twitter URL"
                name="twitter"
                value={twitter}
                onChange={e => onChange(e)}
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-youtube fa-2x"></i>
              <input
                type="text"
                placeholder="YouTube URL"
                name="youtube"
                value={youtube}
                onChange={e => onChange(e)}
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-facebook fa-2x"></i>
              <input
                type="text"
                placeholder="Facebook URL"
                name="facebook"
                value={facebook}
                onChange={e => onChange(e)}
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-instagram fa-2x"></i>
              <input
                type="text"
                placeholder="Instagram URL"
                name="instagram"
                value={instagram}
                onChange={e => onChange(e)}
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-bandcamp fa-2x"></i>
              <input
                type="text"
                placeholder="Bandcamp URL"
                name="bandcamp"
                value={bandcamp}
                onChange={e => onChange(e)}
              />
            </div>
          </Fragment>
        )}

        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">
          Back
        </Link>
      </form>
    </Fragment>
  );
};

CreateProfile.propTypes = {
  createProfile: PropTypes.func.isRequired
};

export default connect(
  null,
  { createProfile }
)(withRouter(CreateProfile));
