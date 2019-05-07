import React from 'react';
import { Route, Redirect } from 'react-router-dom';

// Private route wrapper
const PrivateRoute = ({
  component: Component,
  authed,
  deezProps,
  ...rest,
}) => {
  return (
    <Route
      {...rest}
      render={(props) => authed === true
        ? <Component {...props} {...deezProps} />
        : <Redirect to='/' />}
    />
  );
}

export default PrivateRoute;
