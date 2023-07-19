import React from "react";
import { Row, Col, Typography } from 'antd';
import classNames from 'classnames';
import { useRouter } from "next/router";
import { isBrowser } from 'react-device-detect';
// import Media from "react-media";
import Links from 'links';
import { mediaQueries } from 'config';
import dynamic from 'next/dynamic'
const Media = dynamic(() => import("react-media"))


import { withRedirectHOC } from 'containers/Auth/RedirectHOC';
import { ToastButton } from 'components/AntdComponents';
import { ToastText, ToastLink } from 'components/common';

import styles from './Main.module.scss';

const { Title } = Typography;

const MainPage = () => {
  const router = useRouter();

  const onClick = () => {
    if(isBrowser && process.env.NODE_ENV === 'production') {
      router.push(Links.SignUp);
    } else {
      router.push(Links.CreateChain);
    }
  };


  return (
    <Media queries={mediaQueries}>
      {(screen: any) => (
        <div className={classNames(styles.mainContainer, { [styles.bigScreen]: screen.bigScreen })}>
          {/* {screen.smallScreen && (*/}
          {/*  <Row justify='end'>*/}
          {/*    <ToastLink*/}
          {/*      to={Links.Home}*/}
          {/*      white*/}
          {/*    >*/}
          {/*    Invite Participant*/}
          {/*    </ToastLink>*/}
          {/*  </Row>*/}
          {/*)}*/}
          <Row justify='center' style={{ flex: 1 }}>
            <Col xs={24} sm={20} md={10} lg={8} xl={6} xxl={4}>

              <div className={styles.logo} />

              <Title className={styles.mainTitle}>Toast Video</Title>

              <ToastText
                white
                text='Easily create and share a video chain to celebrate someone special'
              />

              <Row justify='center'>
                <ToastButton
                  block
                  text='Get Started'
                  margin={screen.smallScreen ? '75px 0 25px 0' : '25px 0'}
                  onClick={() => onClick()}
                />
              </Row>

              <Row justify='center'>
                <ToastLink
                  to={Links.Login}
                  white
                >
                  Already have an account
                </ToastLink>
              </Row>

            </Col>
          </Row>
        </div>
        )}
    </Media>
  );
};

export default withRedirectHOC(MainPage);