import { Divider, Row } from 'antd';

import { ToastLink } from 'components/common';

import Links from 'links';

export const Terms = () => (
  <Row justify='center' align='middle' style={{ marginBottom: 20 }}>
    <ToastLink to={`${Links.Terms}/privacy`}>Privacy Policy</ToastLink>
    <Divider type='vertical' style={{ borderColor: '#9CA2A9' }} />
    <ToastLink to={`${Links.Terms}/terms`}>Terms of Service</ToastLink>
  </Row>
);