import React, { Fragment } from "react";

const Profile = ({ 
  profile
}) => {


  return (
    <Fragment>
      {profile ? (
        <Fragment>
        <h2 className="my-2 text-center">Current Profile</h2>
        <div className="table center-div">
        <thead>
          <tr>
            <th>Name:</th>
            <th>{profile.name}</th>
            <th>{profile.name !== "" ? <i class="fas fa-check text-primary"/>: <i class="fas fa-cross text-primary"/>}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Location:</td>
            <td>{profile.location}</td>
            <td>{profile.location !== "" ? <i class="fas fa-check text-primary"/>: <i class="fas fa-circle text-primary"/>}</td>
          </tr>
          <tr>
            <td>Level:</td>
            <td>{profile.level}</td>
            <td>{profile.level !== "" ? <i class="fas fa-check text-primary"/>: <i class="fas fa-circle text-primary"/>}</td>
          </tr>
          <tr>
            <td>Interests:</td>
            <td>{profile.interests}</td>
            <td>{profile.interests !== "" ? <i class="fas fa-check text-primary"/>: <i class="fas fa-circle text-primary"/>}</td>
          </tr>
          <tr>
            <td>Website:</td>
            <td>{profile.website}</td>
            <td>{profile.website !== "" ? <i class="fas fa-check text-primary"/>: <i class="fas fa-circle text-primary"/>}</td>
          </tr>
          <tr>
            <td>Biography:</td>
            <td>{profile.bio}</td>
            <td>{profile.bio !== "" ? <i class="fas fa-check text-primary"/>: <i class="fas fa-circle text-primary"/>}</td>
          </tr>
          <tr>
            <td>Bands:</td>
            <td>{profile.bands}</td>
            <td>{profile.bands !== "" ? <i class="fas fa-check text-primary"/>: <i class="fas fa-circle text-primary"/>}</td>
          </tr>
          <tr>
            <td>Education:</td>
            <td>{profile.education}</td>
            <td>{profile.education !== "" ? <i class="fas fa-check text-primary"/>: <i class="fas fa-circle text-primary"/>}</td>
          </tr>
          <tr>
            <td>Years Active:</td>
            <td>{profile.years_active}</td>
            <td>{profile.years_active !== "" ? <i class="fas fa-check text-primary"/>: <i class="fas fa-circle text-primary"/>}</td>
          </tr>
          <tr>
            <td>Years Playing:</td>
            <td>{profile.years_playing}</td>
            <td>{profile.years_playing !== "" ? <i class="fas fa-check text-primary"/>: <i class="fas fa-circle text-primary"/>}</td>
          </tr>
          <tr>
            <td>Twitter:</td>
            <td>{profile.twitter}</td>
            <td>{profile.twitter !== "" ? <i class="fas fa-check text-primary"/>: <i class="fas fa-circle text-primary"/>}</td>
          </tr>
          <tr>
            <td>Youtube:</td>
            <td>{profile.youtube}</td>
            <td>{profile.youtube !== "" ? <i class="fas fa-check text-primary"/>: <i class="fas fa-circle text-primary"/>}</td>
          </tr>
          <tr>
            <td>Facebook:</td>
            <td>{profile.facebook}</td>
            <td>{profile.facebook !== "" ? <i class="fas fa-check text-primary"/>: <i class="fas fa-circle text-primary"/>}</td>
          </tr>
          <tr>
            <td>Instagram:</td>
            <td>{profile.instagram}</td>
            <td>{profile.instagram !== "" ? <i class="fas fa-check text-primary"/>: <i class="fas fa-circle text-primary"/>}</td>
          </tr>
          <tr>
            <td>Bandcamp:</td>
            <td>{profile.bandcamp}</td>
            <td>{profile.bandcamp !== "" ? <i class="fas fa-check text-primary"/>: <i class="fas fa-circle text-primary"/>}</td>
          </tr>
        </tbody>
      </div>
      </Fragment>
      ):(
        <span></span>
      )}
    </Fragment>
  );
};


export default Profile;
