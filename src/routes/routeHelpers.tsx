import { Key, FC } from 'react';
import { RouteProps } from 'react-router-dom';

import Links from 'links';

import {
  // public
  Main,
  ConnectedCreateChain,
  TermsPage,
  ConnectedSignIn,
  ConnectedSignUp,
  ConnectedToast,
  // privat
  ConnectedHome,
  ConnectedProfile,
  ConnectedChain,
  ConnectedChainFinalize,
  ConnectedToastRecorder,
} from 'containers';

import ConnectedPrivateRoute from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

export const routesConfig = {
  privateRoutes: [{
    path: Links.Home,
    component: ConnectedHome,
  }, {
    path: `${Links.Profile}/:path?`,
    component: ConnectedProfile,
  }, {
    path: `${Links.Chain}/:chainId/:userId/:type?`,
    component: ConnectedChain,
  }, {
    path: `${Links.ChainFinalize}/:chainId`,
    component: ConnectedChainFinalize,
  }, {
    path: Links.ToastRecorder,
    component: ConnectedToastRecorder,
  }],
  publicRoutes: [{
    path: '/',
    component: Main,
  }, {
    path: Links.SignUp,
    component: ConnectedSignUp,
  }, {
    path: Links.Login,
    component: ConnectedSignIn,
  }, {
    path: Links.CreateChain,
    component: ConnectedCreateChain,
    desktopOff: true,
  }, {
    path: `${Links.Terms}/:type`,
    component: TermsPage,
  }, {
    path: `${Links.Toast}/:name/:chainId/:recipient?`,
    component: ConnectedToast,
    desktopOff: true,
  }],
};

// export const getPublicRoutes = (routes: RouteProps[]) =>
//   routes.map(({ path, component, desktopOff }: RouteProps & { desktopOff?: boolean }) => (
//     <PublicRoute
//       exact
//       key={path as Key}
//       path={path}
//       component={component as FC}
//       desktopOff={desktopOff}
//     />
//   ));
//
// export const getPrivateRoutes = (routes: RouteProps[]) => routes.map(({ path, component }: RouteProps) => (
//   <ConnectedPrivateRoute
//     exact
//     key={path as Key}
//     path={path}
//     component={component as FC}
//   />
// ));
