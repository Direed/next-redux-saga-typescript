import { ReactNode } from 'react';
import { Col, Row } from 'antd';
import { useRouter } from "next/router";

import Links from 'links';
import Image from 'next/image'

import { ToastButton } from 'components/AntdComponents';
import { ToastLink } from '../Typography';
import Profile from 'images/footer/profile.svg';
import ProfileFilled from 'images/footer/profile-a.svg';
import Home from 'images/footer/home.svg';
import HomeFilled from '../../../images/footer/home-a.svg';

import styles from './NavigationFooter.module.scss';

interface INavigationFooter {
  style?: Record<string, unknown>;
  leftTo?: string;
  leftIcon?: ReactNode;
  leftText?: string;
  leftHome?: boolean;

  rightTo?: string;
  rightIcon?: ReactNode;
  rightText?: string;
  rightProfile?: boolean;

  centerIcon?: ReactNode;
  centerText?: string;
  centerOnClick?: () => void;
  centerDisabled?: boolean;
}

export const NavigationFooter: React.FC<INavigationFooter> = ({
  children,
  style,

  leftTo,
  leftIcon,
  leftText,
  leftHome,

  rightTo,
  rightIcon,
  rightText,
  rightProfile,

  centerIcon,
  centerText,
  centerOnClick,
  centerDisabled,
}) => {
  const router = useRouter()

  const homeLocation = router.pathname.includes(Links.Home);
  const profileLocation = router.pathname.includes(Links.Profile);
  const FOOTER_HEIGHT = 50; // 50 bcoz Wrapper has 50 bottom padding, and min footer heis is 85 and footer with 50 height will fill space

  let left;
  let right;

  if(leftHome) {
    left = (
      <ToastLink to={Links.Home}>
        {homeLocation ? <Image src={HomeFilled} height={22} width={25} /> : <Image src={Home} height={22} width={25} />}
      </ToastLink>
    );
  } else if (leftTo) {
    left = (
      <ToastLink color='#9CA2A9' to={leftTo}>
        {leftIcon}
      </ToastLink>
    );
  }

  if(rightProfile) {
    right = (
      <ToastLink to={Links.Profile}>
        {profileLocation ? <Image src={ProfileFilled} height={18} width={17} /> : <Image src={Profile} height={19} width={19} />}
      </ToastLink>
    );
  } else if (rightTo) {
    right = (
      <ToastLink color='#9CA2A9' to={rightTo}>
        {rightIcon}
      </ToastLink>
    );
  }

  const textCondition = leftText || rightText;

  return (
    <div style={{ height: FOOTER_HEIGHT }}>
      <div id='footer' style={style} className={styles.footer}>

        {children}

        {!children && (
          <Row
            align='middle'
            justify='space-between'
            style={{ padding: '5px 30px 20px 30px' }}
          >
            <Col flex={1}
              style={{
                ...(!leftText && { width: '33.33%' }),
                maxWidth: '33.33%',
              }}
            >
              <Row align={textCondition ? 'middle' : 'top'} style={{ flexDirection: 'column' }}>
                {left}
                {left && <p className={styles.extraText}>{leftText}</p>}{/* condition stub for flex alignement */}
              </Row>
            </Col>

            <Col flex={1}>
              <Row align='middle' style={{ flexDirection: 'column' }}>
                <ToastButton
                  type='primary'
                  icon={centerIcon}
                  onClick={centerOnClick}
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    backgroundColor: '#5856D6',
                  }}
                  disabled={centerDisabled}
                />
                <p className={styles.extraText}>{centerText}</p>
              </Row>
            </Col>

            <Col flex={1}
              style={{
                ...(!rightText && { width: '33.33%' }),
                maxWidth: '33.33%',
              }}
            >
              <Row align={textCondition ? 'middle' : 'bottom'} style={{ flexDirection: 'column' }}>
                {right}
                {right && <p className={styles.extraText}>{rightText}</p>}{/* condition stub for flex alignement */}
              </Row>
            </Col>
          </Row>
        )}
      </div>
    </div>
  );
};