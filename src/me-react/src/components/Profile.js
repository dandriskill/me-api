import React, { Fragment } from 'react';

const Profile = ({
  user: { firstName, age, gender },
}) => (
  <div>
    {firstName && age ?
      (
        <Fragment>
          <h1>{firstName}</h1>
          <div className="profile-item">
            <p>
              <strong className="trait">Age</strong> {age}
            </p>
          </div>
          <div className="profile-item">
            <p>
              <strong className="trait">Gender</strong> {gender}
            </p>
          </div>
        </Fragment>
      ) : (
        <h2>Loading...</h2>
      )
    }
  </div>
);

export default Profile;
