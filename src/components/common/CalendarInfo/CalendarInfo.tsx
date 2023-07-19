import { Col, Row, Typography } from 'antd';
import { CalendarOutlined, RightOutlined } from '@ant-design/icons';

import { ToastText } from 'components/common';

import styles from './CalendarInfo.module.scss';

const { Title } = Typography;

export const CalendarInfo = ({ date, onClick }: { date: string; onClick?: () => void; }) => (
  <Row align='middle' onClick={onClick}>
    <Col className={styles.calendarIconContainer}>
      <CalendarOutlined
        style={{
          fontSize: 20,
          color: '#4B22AF',
        }}
      />
    </Col>

    <Col flex={1} style={{ paddingLeft: 15 }}>
      <Title style={{ marginBottom: 0 }} level={5}>{date}</Title>
      <ToastText textAlign='left' text='End Date' fontSize={13} />
    </Col>

    {onClick && (
      <Col>
        <RightOutlined />
      </Col>
    )}
  </Row>
);