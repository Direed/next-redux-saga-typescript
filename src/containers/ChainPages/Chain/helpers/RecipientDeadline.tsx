import { Spin, Col, Row, DatePicker, Typography } from 'antd';
import moment, { Moment } from 'moment';

import { updateToastChain } from 'graphql/mutations';

import { useMemoState } from 'hooks';
import { TCreatedChain } from 'types';
import { getDisabledDatesRange } from 'utils';

import { ToastButton } from 'components/AntdComponents';
import { Wrapper, PhotoWithInfo } from 'components/common';

const { Title } = Typography;

interface IRecipientDeadline {
  isLoading: boolean;
  createdChain: TCreatedChain;
  goBack: () => void;
  createdChainUpdateGraphAction: (data: {
    schema: unknown;
    variables: Record<string, unknown>
  }) => void;
}

export const RecipientDeadline = ({
  isLoading,
  createdChain,

  goBack,
  createdChainUpdateGraphAction,
}: IRecipientDeadline) => {
  const [open, setOpen] = useMemoState(!!createdChain?.deadline);
  const [dead, setDeadline] = useMemoState<Moment | null>(moment.unix(createdChain?.deadline as number));

  const onDateChange = (date: Moment | null) => {
    setDeadline(date);
    setOpen(false);
  };

  const handleSaveDate = () => {
    createdChainUpdateGraphAction({
      schema: updateToastChain,
      variables: {
        input: {
          chainId: createdChain?.chainId,
          deadline: moment(dead).unix(),
        },
      },
    });
  };

  const today = moment().startOf('day');

  return (
    <Spin spinning={isLoading} tip='Loading...'>
      <Wrapper displayFlex column justify='space-between'>
        <Row>
          <Col xs={24}>
            <Row justify='center' style={{ marginBottom: 40 }}>
              <Title level={5}>Edit recipient deadline</Title>
            </Row>
            <Row style={{ marginBottom: 40 }}>
              <Col xs={24}>
                <PhotoWithInfo
                  photo={createdChain?.recipientImg}
                  name={createdChain?.recipientName}
                />
              </Col>
            </Row>
            <Row align='middle' gutter={14}>
              <Col xs={17} sm={12}>
                <DatePicker
                  inputReadOnly
                  value={dead}
                  onChange={onDateChange}
                  disabledDate={getDisabledDatesRange(today)}
                  bordered={false}
                  placeholder='Select End Date'
                  format='dddd, DD MMM YYYY'
                  open={open}
                  onClick={() => setOpen(true)}
                />
              </Col>
            </Row>
          </Col>
        </Row>

        <Row>
          <ToastButton
            block
            text='Save'
            type='primary'
            onClick={handleSaveDate}
            margin='0 0 10px 0'
          />
          <ToastButton
            block
            text='Back'
            onClick={goBack}
          />
        </Row>
      </Wrapper>
    </Spin>
  );
};