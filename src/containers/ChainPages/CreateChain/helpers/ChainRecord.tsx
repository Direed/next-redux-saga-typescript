import { Col, Row } from 'antd';

import { ToastButton } from 'components/AntdComponents';
import { VideoRecorder, ToastText, Wrapper, PhotoWithInfo } from 'components/common';

import { ICreateChainChild, IChainRecord } from './createChainTypes';

export const ChainRecord = ({
  stepDecrease,
  stepIncrease,
  onSave,

  user,
  videoSaved,
  recipientImg,
  recipientName,
  createdChain,
}: ICreateChainChild & IChainRecord) => (
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
        <Row style={{ marginBottom: 20 }}>
          <ToastText
            textAlign='left'
            text={`Record and add a video of maximum 60 seconds to ${recipientName}'s video chain`}
          />
        </Row>
        <Row>
          <Col xs={24}>
            <VideoRecorder
              initiatedVideo
              user={user}
              onSave={onSave}
              videoSaved={videoSaved}
              createdChain={createdChain}
              successText='Your video chain invitation has been recorded'
            />
          </Col>
        </Row>
      </Col>
    </Row>
    <Row>
      <ToastButton
        block
        text='Save your video chain'
        type='primary'
        onClick={stepIncrease}
        margin='0 0 10px 0'
        disabled={!videoSaved}
      />
      <ToastButton
        block
        text='Back'
        onClick={stepDecrease}
      />
    </Row>
  </Wrapper>
);