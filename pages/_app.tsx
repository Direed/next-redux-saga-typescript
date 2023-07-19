import { AppProps } from 'next/app';
import { NextPage } from 'next';
import { wrapper } from '../src/redux-base/configureStore';
import withReduxSaga from 'next-redux-saga'

import './index.scss';
import 'antd/dist/antd.css';
import React, {useEffect, useState} from "react";
import {TUser} from "../src/types";
import Auth from "@aws-amplify/auth";
import {MessagesContainer} from "../src/containers/CoreLayout/MessagesContainer";
import {Col, Row, Spin} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {loginSuccess, showError} from "../src/redux-base/actions";
// import styles from '../src/containers/CoreLayout/CoreLayout.module.scss';
import {RootState} from "../src";
import {useRouter} from "next/router";
import {routesConfig} from "../src/routes/routeHelpers";

const MyApp: NextPage<AppProps> = ({ Component, pageProps }: AppProps) => {
  const dispatch = useDispatch();
  const [isChecked, setIsChecked] = useState(false);
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const user = useSelector((state: RootState) => state.auth.user);
  const router = useRouter();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const user: TUser = await Auth.currentAuthenticatedUser();
      dispatch(loginSuccess(user));
    } catch (error) {
      if(error !== 'The user is not authenticated') {
        dispatch(showError(error));
      }
    }
    setIsChecked(true);
  };

  useEffect(() => {
    if (isChecked && !isLoggedIn && !user && routesConfig.privateRoutes.some(route => route.path.includes(router.asPath))) {
      // not loggedIn - redirect to start page
      router.replace("/")
    }
  }, [isLoggedIn, user, isChecked]);


  return (
    <Spin spinning={!isChecked} tip='Loading...'>
      {isChecked && (
        <>
          <MessagesContainer/>
          <Row>
            <Col xs={24} style={{minHeight: '100%'}}>
              <Component {...pageProps}/>
            </Col>
          </Row>
        </>
      )}
    </Spin>
  )
};

export default wrapper.withRedux(withReduxSaga(MyApp));
