import { Form as AntdForm, Col, Row, Typography } from 'antd';

import { Form } from 'components/Form';
import { Wrapper } from 'components/common';
import { ImgUpload, ToastButton } from 'components/AntdComponents';

import { ICreateChainChild, IChainRecipient } from './createChainTypes';

const { Title } = Typography;

export const ChainRecipient = ({
  recipientImg,
  recipientName,
  setRecipientInfo,
  setRecipientImg,
  stepDecrease,
  stepIncrease,
}: ICreateChainChild & IChainRecipient) => {
  const [recipient] = AntdForm.useForm();
  const btnPortal = 'button-portal';

  const handleSendRecipient = ({ recipientName }: { recipientName: string }) => {
    setRecipientInfo(recipientName);
    stepIncrease();
  };

  return (
    <Wrapper noPadding displayFlex column justify='space-between'>
      <Row>
        <Col xs={24}>
          <Row justify='center' style={{ marginBottom: 40 }}>
            <Title level={5}>Who is this video chain for?</Title>
          </Row>
          <Row justify='center' style={{ marginBottom: 20 }}>
            <ImgUpload
              image={recipientImg}
              onUpload={(file, img) => setRecipientImg({
                file,
                img,
              })}
            />
          </Row>
          <Row>
            <Form
              form={recipient}
              name='recipient'
              handleSubmit={handleSendRecipient}
              initialValues={{ recipientName }}

              buttonText='Next'
              buttonPortal={btnPortal}

              fields={[{
                type: 'text',
                name: 'recipientName',
                label: 'Recipient Full Name',
                rules: [
                  {
                    required: true,
                    message: 'Please input recipient full name.',
                  },
                ],
              }]}
            />
          </Row>
        </Col>
      </Row>

      <Row>
        <Col id={btnPortal} flex={1}></Col>
        <ToastButton
          block
          text='Back'
          onClick={stepDecrease}
        />
      </Row>
    </Wrapper>
  );
};