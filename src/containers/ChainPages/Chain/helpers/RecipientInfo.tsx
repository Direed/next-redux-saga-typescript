import { useEffect } from 'react';
import { RcFile } from 'antd/lib/upload';
import { Form as AntdForm, Col, Row, Typography, Spin } from 'antd';

import { updateToastChain } from 'graphql/mutations';

import { useMemoState } from 'hooks';
import { TCreatedChain, TUser } from 'types';
import { BUCKET_USER_IMAGES } from 'awsConfig';

import { Form } from 'components/Form';
import { Wrapper } from 'components/common';
import { ImgUpload, ToastButton } from 'components/AntdComponents';

const { Title } = Typography;

interface IRecipientPhotoWithName {
  user: TUser;
  isLoading: boolean;
  createdChain: TCreatedChain;

  goBack: () => void;
  createdChainUpdateGraphAction: (data: { schema: unknown; variables: Record<string, unknown> }) => void;
  imageAddOrEditRequestAction: (albumName: string, file: RcFile, key: string, edit: boolean) => void;
}

export const RecipientInfo = ({
  user,
  isLoading,
  createdChain,

  goBack,
  imageAddOrEditRequestAction,
  createdChainUpdateGraphAction,
}: IRecipientPhotoWithName) => {
  const [initialValues, setInitialValues] = useMemoState<{ recipientName?: string }>({});
  const [recipient] = AntdForm.useForm();
  const btnPortal = 'button-portal';

  useEffect(() => {
    setInitialValues({ recipientName: createdChain?.recipientName });
  }, [createdChain]);

  const handleLoadImage = (file: RcFile) => {
    const edit = !!createdChain?.recipientImg;

    imageAddOrEditRequestAction(user?.username as string, file, createdChain?.chainId as string, edit);

    // if there is recipientImg, we will only need to update the photo in the s3 bucket
    if(!createdChain?.recipientImg) {
      createdChainUpdateGraphAction({
        schema: updateToastChain,
        variables: {
          input: {
            chainId: createdChain?.chainId,
            recipientImg: `https://${BUCKET_USER_IMAGES}.s3.amazonaws.com/%252B${user?.username.replace('+', '')}/${createdChain?.chainId}`,
          },
        },
      });
    }
  };

  const handleSendRecipient = ({ recipientName }: { recipientName: string }) => {
    createdChainUpdateGraphAction({
      schema: updateToastChain,
      variables: {
        input: {
          chainId: createdChain?.chainId,
          recipientName,
        },
      },
    });
  };

  return (
    <Spin spinning={isLoading} tip='Loading...'>
      <Wrapper displayFlex column justify='space-between'>
        <Row>
          <Col xs={24}>
            <Row justify='center' style={{ marginBottom: 40 }}>
              <Title level={5}>Edit recipient info</Title>
            </Row>
            <Row justify='center' style={{ marginBottom: 20 }}>
              <ImgUpload
                image={createdChain?.recipientImg}
                onUpload={handleLoadImage}
              />
            </Row>
            <Row>
              {initialValues.recipientName && (
                <Form
                  form={recipient}
                  name='recipient'
                  handleSubmit={handleSendRecipient}
                  initialValues={initialValues}

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
              )}
            </Row>
          </Col>
        </Row>

        <Row>
          <Col id={btnPortal} flex={1}></Col>
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