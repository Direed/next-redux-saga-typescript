import React from 'react';
import { connect } from 'react-redux';
// import {
//   Route,
//   Redirect,
//   RouteProps,
//   RouteComponentProps,
// } from 'react-router-dom';
import { isBrowser } from 'react-device-detect';

import { RootState } from 'index';
import { TUser } from 'types';

import { GoToMobile } from 'containers';

interface IPrivateRoute {
  isLoggedIn: boolean;
  user: TUser;
  component: React.FC
}

function Redirects(props: { to: { state: { redirectFrom: any }; pathname: string } }) {
  return null;
}

export const PrivateRoute = ({
  component: Component,
  isLoggedIn,
  user,
  path,
  ...rest
}: IPrivateRoute) => (
  <Route
    {...rest}
    path={path}
    render={({
      location,
      match,
      history,
    }) => {
      if (isBrowser && isLoggedIn && user && process.env.NODE_ENV === 'production') {
        return <GoToMobile />;
      }

      if (!isLoggedIn && !user) {
        // not loggedIn - redirect to start page
        return (
          <Redirect
            to={{
              pathname: '/',
              state: { redirectFrom: location.pathname },
            }}
          />
        );
      }

      return (
        <Component
          key={location.key} // leave key for update component when you click on same link in navigaton
          location={location}
          match={match}
          history={history}
        />
      );
    }}
  />
);

export default connect((state: RootState) => ({
  isLoggedIn: state.auth.isLoggedIn,
  user: state.auth.user,
}))(PrivateRoute);
