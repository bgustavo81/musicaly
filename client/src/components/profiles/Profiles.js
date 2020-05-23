import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../Spinner";
import ProfileItem from "./ProfileItem";
import { getProfiles } from "../../actions/index";

const Profiles = ({ getProfiles, profile: { profiles, loading }, auth: {user} }) => {
  useEffect(() => {
    getProfiles();
  }, [getProfiles]);

  console.log(profiles);
  console.log(loading);
  console.log(user);

  if (!profiles) {
    return
  }

  console.log(profiles);

  return (
    <Fragment>
      {loading && !profiles ? (
        <Spinner />
      ) : (
        <Fragment>
          <p className="lead">
            <i className="fab fa-connectdevelop">
              Browse and Connect with Other Artists
            </i>
          </p>
          <div className="profiles">
            {profiles ? (
              profiles.map(profile => (
                <ProfileItem key={profile.id} profile={profile} auth={user} />
              ))
            ) : (
              <h4>No profiles found </h4>
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getProfiles }
)(Profiles);
