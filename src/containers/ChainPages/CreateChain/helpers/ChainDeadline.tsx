import { useEffect } from 'react';
import { Col, Row, DatePicker } from 'antd';
import moment, { Moment } from 'moment';

import { useMemoState } from 'hooks';
import { getDisabledDatesRange } from 'utils';

import { Wrapper, PhotoWithInfo } from 'components/common';
import { ToastButton } from 'components/AntdComponents';

import { ICreateChainChild, IChainDeadline } from './createChainTypes';

export const ChainDeadline = ({
  stepDecrease,
  stepIncrease,
  setDeadline,
  // setReminders,

  deadline,
  recipientImg,
  recipientName,
}: ICreateChainChild & IChainDeadline) => {
  const [open, setOpen] = useMemoState(!deadline);
  // const [disabled, setDisabled] = useMemoState(!!deadline);

  // if date changed should close date picker
  useEffect(() => {
    if(deadline) {
      setOpen(false);
    }

  }, [deadline]);

  // const onSwitch = (checked: boolean) => {
  //   setDisabled(checked);
  //   setOpen(checked);
  // };

  const onDateChange = (date: Moment | null) => setDeadline(date);

  const today = moment().startOf('day');

  return (
    <Wrapper noPadding displayFlex column justify='space-between'>
      <Row>
        <Col xs={24}>
          <Row style={{ marginBottom: 40 }}>
            <Col xs={24}>
              <PhotoWithInfo
                photo={recipientImg}
                name={recipientName}
              />
            </Col>
          </Row>
          <Row align='middle' gutter={14}>
            <Col xs={17} sm={12}>
              <DatePicker
                inputReadOnly
                value={deadline}
                onChange={onDateChange}
                disabledDate={getDisabledDatesRange(today)}
                bordered={false}
                placeholder='Select End Date'
                // disabled={!disabled}
                format='dddd, DD MMM YYYY'
                open={open}
                onClick={() => setOpen(true)}
                // onBlur={() => setOpen(false)}
              />
            </Col>
            {/* <Col>
              <Switch defaultChecked={!!deadline} onChange={onSwitch} />
            </Col> */}
          </Row>
          {/* <Row style={{ marginTop: 20 }}>
            <ToastButton
              text='Reminders'
              type='text'
              disabled={!deadline}
              onClick={() => setReminders(true)}
            />
          </Row> */}
        </Col>
      </Row>
      <Row>
        <ToastButton
          block
          text='Next'
          type='primary'
          onClick={stepIncrease}
          disabled={!deadline}
          margin='0 0 10px 0'
        />
        <ToastButton
          block
          text='Back'
          onClick={stepDecrease}
        />
      </Row>
    </Wrapper>
  );
};