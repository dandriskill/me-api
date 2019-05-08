import React, { Component } from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import axios from 'axios';
import Nav from './Nav';
import PublicRoute from './routes/PublicRoute';
import PrivateRoute from './routes/PrivateRoute';
import Login from './Login';
import Signup from './Signup';
import Profile from './Profile';
import EditProfile from './EditProfile';
import '../assets/styles/App.css';

class App extends Component {
  state = {
    authed: false,
    loading: false,
    user: null,
    token: null,
  };

  handleLogin = async ({ email, password }) => {
    try {
      const {
        data: {
          user,
          token,
        },
      } = await axios({
        method: 'post',
        url: 'http://localhost:3001/login',
        data: {
          email,
          password,
        },
      });
      if (user && token) this.populateUser(user, token);
    }
    catch (err) {
      console.log(err);
    }
  };

  handleSignup = async data => {
    console.log(data);
    try {
      const {
        data: {
          user,
          token,
        },
      } = await axios({
        method: 'post',
        url: 'http://localhost:3001/signup',
        data,
      });
      if (user && token) this.populateUser(user, token);
    }
    catch (err) {
      console.log(err);
    }
  };

  handleLogout = async () => {
    try {
      const { status } = await axios({
        method: 'post',
        url: 'http://localhost:3001/logout',
        headers: {
          'Authorization': `Bearer ${this.state.token}`,
        },
      });
      if (status === 200) {
        this.setState({
          authed: false,
          loading: false,
          user: null,
          token: null,
        });
      }
    }
    catch (err) {
      console.log(err);
    }
  };

  handleEditProfile = async updates => {
    // Send updates to API
    try {
      const {
        data: user,
      } = await axios({
        method: 'patch',
        url: 'http://localhost:3001/users/me',
        data: updates,
        headers: {
          'Authorization': `Bearer ${this.state.token}`,
        },
      });
      if (user) this.setState({ user })
    }
    catch (err) {
      console.log(err);
    }
  };

  handleDeleteProfile = async () => {
    // Delete user profile
    try {
      const {
        status,
      } = await axios({
        method: 'delete',
        url: 'http://localhost:3001/users/me',
        headers: {
          'Authorization': `Bearer ${this.state.token}`,
        },
      });
      if (status === 200) {
        this.setState({
          authed: false,
          loading: false,
          user: null,
          token: null,
        });
      }
    }
    catch (err) {
      console.log(err);
    }
  };

  populateUser = (user, token) => {
    this.setState({
      user,
      token,
      authed: true,
      loading: false,
    });
  };

  render() {
    const {
      state: {
        authed,
        loading,
        user,
      },
      handleLogin,
      handleSignup,
      handleLogout,
      handleEditProfile,
      handleDeleteProfile,
    } = this;

    return (
      <div id="app">
        <Router>
          <Nav
            authed={authed}
            handleLogout={handleLogout}
          />
          <Switch>
            <PublicRoute
              exact
              path="/"
              component={Login}
              authed={authed}
              deezProps={{
                handleLogin,
              }}
            />
            <PublicRoute
              exact
              path="/signup"
              component={Signup}
              authed={authed}
              deezProps={{
                handleSignup,
              }}
            />
            <PrivateRoute
              path="/profile"
              component={Profile}
              authed={authed}
              deezProps={{
                loading,
                user,
                authed,
              }}
            />
            <PrivateRoute
              path="/edit"
              component={EditProfile}
              authed={authed}
              deezProps={{
                loading,
                user,
                handleEditProfile,
                handleDeleteProfile,
              }}
            />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
