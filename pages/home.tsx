import React, {useEffect, useState} from 'react';
import Home from "../src/containers/Home/Home";
import { GoToMobile } from "../src/containers";
import { isBrowser } from "react-device-detect";
import { connect } from "react-redux";
import { RootState } from "../src";
import { TUser } from "../src/types";
import { useRouter } from "next/router";
import { withRedirectHOC } from "../src/containers/Auth/RedirectHOC";
import {routesConfig} from "../src/routes/routeHelpers";

interface IPrivateRoute {
  isLoggedIn: boolean;
  user: TUser;
}

const HomePage = ({ isLoggedIn, user }: IPrivateRoute) => {
  const router = useRouter();
  const [isShowContent, setIsShowContent] = useState(false)

  if (isBrowser && isLoggedIn && user && process.env.NODE_ENV === 'production') {
    return <GoToMobile />;
  }

  useEffect(() => {
    debugger
    if (!isLoggedIn && !user && routesConfig.privateRoutes.some(route => route.path.includes(router.asPath))) {
      // not loggedIn - redirect to start page
      router.replace("/")
    } else {
      setIsShowContent(true);
    }
  }, []);

  return isShowContent && <Home />;
};

export default withRedirectHOC(connect((state: RootState) => ({
  isLoggedIn: state.auth.isLoggedIn,
  user: state.auth.user,
}))(HomePage));