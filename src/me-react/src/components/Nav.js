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
              className="ghost"
              onClick={() => redirect('/profile')}
            >
              Profile
            </button>
            <button
              className="ghost"
              onClick={() => redirect('/edit')}
            >
              Edit Profile
            </button>
            <button
              className="ghost"
              onClick={() => handleLogout()}
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="navbar-links">
            <button
              className="ghost"
              onClick={() => redirect('/')}
            >
              Login
            </button>
            <button
              className="ghost"
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
