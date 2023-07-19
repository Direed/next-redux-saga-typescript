import { Col, Row, Typography } from 'antd';
import classNames from 'classnames';
import { PictureOutlined } from '@ant-design/icons';

import { ToastText } from 'components/common';
import { TimeLeftComponent, TimeLeftProps } from '../TimeLeftComponent/TimeLeftComponent';

import styles from './PhotoWithInfo.module.scss';

const { Title } = Typography;

interface IPhotoWithInfo {
  extraElement?: React.ReactNode;
  text?: string;
  photo?: string;
  name?: string | React.ReactNode;
  chainInfo?: string | React.ReactNode;
  onClick?: () => void;
  deadline?: number;
  displayTimeLeft?: boolean;
  timeLeftProps?: Partial<TimeLeftProps>;
}

export const PhotoWithInfo = ({
  extraElement,
  text = 'Video Chain Recipient',
  photo,
  name,
  chainInfo,
  onClick,
  timeLeftProps = {},
  displayTimeLeft,
}: IPhotoWithInfo) => (
  <Row
    onClick={onClick}
    align={chainInfo ? 'top' : 'middle'}
    justify='space-between'
  >
    <Col flex={1}>
      <Row style={{ flexFlow: 'nowrap' }}>
        {photo
          ? (
            <Col className={styles.imgContainer} >
              <img
                alt='Recipient'
                src={photo}
                className={styles.img}
              />
            </Col>
          ) : (
            <Col className={classNames(styles.imgContainer, styles.noImg)}>
              <PictureOutlined
                style={{
                  fontSize: 20,
                  color: '#9CA2A9',
                }}
              />
            </Col>
          )}
        <Col flex={1} className={styles.info}>
          {name && <Title style={{ marginBottom: 0 }} level={5}>{name}</Title>}

          {chainInfo}

          <ToastText textAlign='left' text={text} fontSize={13} />
        </Col>
        {displayTimeLeft && (
          <Col className={styles.time}>
            <TimeLeftComponent deadline={timeLeftProps.deadline}
              created={timeLeftProps.created}
              finalized={timeLeftProps.finalized}
            />
          </Col>
        )}
      </Row>
    </Col>

    {extraElement && (
      <Col>
        {extraElement}
      </Col>
    )}

  </Row>
);
