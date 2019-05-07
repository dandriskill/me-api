import React from 'react';
import { withRouter } from 'react-router-dom';

const Nav = ({ history, authed, handleLogout }) => {
  const redirect = location => {
    history.push(location);
  };
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        Me
      </div>
      {authed ?
        (
          <div className="navbar-links">
            <button
              className="navbar-button"
              onClick={() => redirect('/profile')}
            >
              Profile
            </button>
            <button
              className="navbar-button"
              onClick={() => redirect('/edit')}
            >
              Edit Profile
            </button>
            <button
              className="navbar-button"
              onClick={() => handleLogout()}
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="navbar-links">
            <button
              className="navbar-button"
              onClick={() => redirect('/')}
            >
              Login
            </button>
            <button
              className="navbar-button"
              onClick={() => redirect('/signup')}
            >
              Signup
            </button>
          </div>
        )
      }
    </nav>
  );
}

export default withRouter(Nav);
