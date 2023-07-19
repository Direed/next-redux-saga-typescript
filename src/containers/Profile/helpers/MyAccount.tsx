import { Form as AntdForm, Col, Row } from 'antd';
import { RcFile } from 'antd/lib/upload';
import { useDispatch } from 'react-redux';

import { userUpdateRequest } from 'redux-base/actions';

import { Form } from 'components/Form';
import { Header, Wrapper } from 'components/common';
import { ImgUpload } from 'components/AntdComponents';
import { TUser } from 'types';

interface IMyAccount {
  user: TUser,
  goBack: () => void,
}

export const MyAccount = ({
  user,
  goBack,
}: IMyAccount) => {
  const dispatch = useDispatch();
  const [myAccount] = AntdForm.useForm();
  const btnPortal = 'button-portal';

  const handleUpdatePhoto = (file: RcFile) => {
    dispatch(userUpdateRequest(undefined, file, !!user?.attributes.picture));
  };

  const handleSendName = ({ name }: { name: string }) => {
    dispatch(userUpdateRequest(name));
  };

  return (
    <Wrapper displayFlex column justify='space-between'>
      <Row>
        <Header title='My Account' leftOnClick={() => goBack()} />
        <Col xs={24}>
          <Row justify='center' style={{ marginBottom: 20 }}>
            <ImgUpload
              image={user?.attributes.picture}
              onUpload={handleUpdatePhoto}
            />
          </Row>
          <Row>
            <Form
              form={myAccount}
              name='myAccount'
              handleSubmit={handleSendName}
              initialValues={{ name: user?.attributes.name }}

              buttonText='Save'
              buttonPortal={btnPortal}

              fields={[{
                type: 'text',
                name: 'name',
                label: 'Your Full Name',
                rules: [
                  {
                    required: true,
                    message: 'Please input your full name.',
                  },
                ],
              }]}
            />
          </Row>
        </Col>
      </Row>

      <Row>
        <Col id={btnPortal} flex={1}></Col>
      </Row>
    </Wrapper>
  );
};