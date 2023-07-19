import { useEffect } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'antd';
import Auth from '@aws-amplify/auth';

import { loginSuccess, showError } from 'redux-base/actions';

import { RootState } from 'index';
import { TUser } from 'types';

import { MessagesContainer } from './MessagesContainer';
import { ICoreLayoutProps } from './CoreLayoutTypes';

import styles from './CoreLayout.module.scss';

const mapStateToProps = (state: RootState) => ({
  user: state.auth.user,
  isLoggedIn: state.auth.isLoggedIn,
});

const mapDispatchToProps = {
  loginSuccess,
  showError,
};

const CoreLayout = ({
  children,
  loginSuccess,
  showError,
}: ICoreLayoutProps) => {

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const user: TUser = await Auth.currentAuthenticatedUser();
      loginSuccess(user);
    } catch (error) {
      if(error !== 'The user is not authenticated') {
        showError(error);
      }
    }
  };

  return (
    <>
      <MessagesContainer />
      <Row className={styles.core}>
        <Col xs={24} style={{ minHeight: '100%' }}>
          {children}
        </Col>
      </Row>
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(CoreLayout);