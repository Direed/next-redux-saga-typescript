import { Form as AntdForm, Col, Row } from 'antd';

import { Form } from 'components/Form';
import { Wrapper, PhotoWithInfo } from 'components/common';
import { ToastButton } from 'components/AntdComponents';

import { ICreateChainChild, TDetailValues, IChainDetails } from './createChainTypes';

export const ChainDetails = ({
  recipientImg,
  recipientName,
  recipientDetails,
  setRecipientDetails,

  stepDecrease,
  stepIncrease,
}: ICreateChainChild & IChainDetails) => {
  const [details] = AntdForm.useForm();
  const btnPortal = 'button-portal';

  const handleSendDetails = (formData: TDetailValues) => {
    setRecipientDetails(formData);
    stepIncrease();
  };

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
          <Row>
            <Form
              form={details}
              name='details'
              handleSubmit={handleSendDetails}
              initialValues={{ ...recipientDetails }}

              buttonText='Next'
              buttonPortal={btnPortal}

              fields={[{
                type: 'textArea',
                name: 'detailsOccasion',
                label: 'Occasion',
                placeholder: 'What are you celebrating (birthday, wedding, graduation, baby shower, retirement, etc.) ?',
              }, {
                type: 'textArea',
                name: 'detailsDescription',
                label: 'Video Chain Description',
                placeholder: 'A short description to explain the video chain purpose to participants.',
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