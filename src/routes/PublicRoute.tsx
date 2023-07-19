import React from 'react';
import {
  Route,
  RouteProps,
  RouteComponentProps,
} from 'react-router-dom';
import { isBrowser } from 'react-device-detect';

import { GoToMobile } from 'containers';

interface IPublicRoute {
  desktopOff?: boolean;
  component: React.FC<RouteComponentProps>
}

export const PublicRoute = ({
  component: Component,
  desktopOff,
  path,
  ...rest
}: IPublicRoute & RouteProps) => (
  <Route
    {...rest}
    path={path}
    render={({
      location,
      match,
      history,
    }) => {
      if (isBrowser && desktopOff && process.env.NODE_ENV === 'production') {
        return <GoToMobile />;
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
