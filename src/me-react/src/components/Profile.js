import React, { Fragment } from 'react';

const Profile = ({
  user: { firstName, age },
}) => (
  <div>
    {firstName && age ?
      (
        <Fragment>
          <h1>{firstName}</h1>
          <div className="profile-item">
            <p>
              <strong>Age</strong>
            </p>
            <p>
              {age}
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
