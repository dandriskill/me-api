import React from 'react';
import { Route, Redirect } from 'react-router-dom';

// Public route wrapper
const PublicRoute = ({
  component: Component,
  authed,
  deezProps,
  ...rest,
}) => {
  return (
    <Route
      {...rest}
      render={(props) => authed === false
        ? <Component {...props} {...deezProps} />
        : <Redirect to='/profile' />}
    />
  );
}

export default PublicRoute;
