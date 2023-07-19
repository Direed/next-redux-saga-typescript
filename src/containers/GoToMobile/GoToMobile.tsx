import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Typography } from 'antd';

import { sendLoginLinkPostRequest, logoutAction } from 'redux-base/actions';

import { RootState } from 'index';
import { TUser } from 'types';

import { ToastButton } from 'components/AntdComponents';

const { Title } = Typography;

export const GoToMobile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user) as TUser;

  useEffect(() => {
    if(user?.username) {
      dispatch(sendLoginLinkPostRequest({ payload: { phoneNumber: user.username } }));
    }

  }, [user?.username]);

  return (
    <Row justify='center' align='middle' style={{ height: '100%' }}>
      <Col>
        <Title style={{ textAlign: 'center' }}>You can only use this app from mobile device.</Title>
        <Title style={{ textAlign: 'center' }}>For Sign In use a link from an SMS message with a security code.</Title>
        <Row justify='center'>
          <ToastButton
            danger
            text='Logout'
            width={250}
            onClick={() => dispatch(logoutAction())}
            margin='30px 0 0 0'
          />
        </Row>
      </Col>
    </Row>
  );
};