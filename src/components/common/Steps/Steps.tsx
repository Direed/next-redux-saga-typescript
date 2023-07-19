import React from 'react';
import classNames from 'classnames';
import { Col, Row, Typography } from 'antd';

import { Wrapper } from '../';

import styles from './Steps.module.scss';

const { Title } = Typography;

export const Steps: React.FC<{step: number; title: string; stepsCount: number;}> = ({
  children,
  step,
  title,
  stepsCount,
}) => {
  const stepIndicators = [...Array.from({ length: stepsCount }).keys()];

  return (
    <Wrapper displayFlex column>

      <Row justify='center' style={{ marginBottom: 10 }}>
        <Title level={5}>{title}</Title>
      </Row>

      <Row gutter={10} style={{ marginBottom: 40 }}>
        {stepIndicators.map((item, index) => (
          <Col flex={1} key={item as React.Key}>
            <div className={classNames(styles.step, { [styles.stepActive]: index <= step })} />
          </Col>
        ))}
      </Row>

      {children}

    </Wrapper>
  );
};
