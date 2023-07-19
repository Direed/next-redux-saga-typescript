import { connect } from 'react-redux';
import { Col, Form as AntdForm, Row, Spin } from 'antd';
//@ts-ignore there is no package with types
import { parsePhoneNumber } from 'react-phone-number-input';

import {
  signInRequest,
  verifyCodeRequest,

  resetReducerAction,
} from 'redux-base/actions';

import { RootState } from 'index';
import { TError, TUser } from 'types';

import { Form } from 'components/Form';
import { Header, Wrapper } from 'components/common';
import { ToastButton } from 'components/AntdComponents';
import { LogoBlock } from '../LogoBlock';
import { Terms } from '../Terms';
import { useFormError } from '../useFormError';

const mapStateToProps = (state: RootState) => ({
  isLoading: state.auth.isLoading,
  isLoggedIn: state.auth.isLoggedIn,
  user: state.auth.user,
  error: state.error.error,
});

const mapDispatchToProps = {
  signInRequest,
  verifyCodeRequest,

  resetReducerAction,
};

interface ISendCodeForm {
  user: TUser,
  error: TError;
  isLoading: boolean;
  isLoggedIn: boolean;

  signInRequest: (phone: string) => void;
  verifyCodeRequest: (user: TUser, code: string) => void;

  resetReducerAction: () => void;
}

const SendCodeForm = ({
  user,
  error,
  isLoading,

  signInRequest,
  verifyCodeRequest,

  resetReducerAction,
}: ISendCodeForm) => {
  const btnPortal = 'button-portal';
  const [code] = AntdForm.useForm();

  useFormError(code, 'codeNumber', error);

  const handleResendCode = () => {
    signInRequest(String(user?.username) as string);

    if(error) {
      code.resetFields();
    }
  };

  const handleSendCode = ({ codeNumber }: { codeNumber: string }) => verifyCodeRequest(user, codeNumber);

  const phone = parsePhoneNumber(String(user?.username));

  return (
    <Spin spinning={isLoading} tip='Loading...'>
      <Wrapper displayFlex column>
        <Header leftOnClick={() => resetReducerAction()} />
        <Row justify='center' style={{ flex: 1 }}>
          <Col xs={24} sm={20} md={10} lg={8} xl={6} xxl={4}
            style={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <LogoBlock
              title='Security code'
              text={`Please enter the security code you have just received by SMS to ${phone?.formatInternational()}`}
            />
            <Wrapper noPadding displayFlex column flex={1} justify='space-between'>
              <Form
                form={code}
                name='code'
                handleSubmit={handleSendCode}

                buttonText='Confirm'
                buttonPortal={btnPortal}

                fields={[{
                  type: 'text',
                  name: 'codeNumber',
                  label: 'Security Code',
                  placeholder: 'XXXX',
                  rules: [{
                    required: true,
                    message: 'Please input your security code.',
                  }],
                }]}
              >
                <Row justify='end'>
                  <ToastButton
                    text='Resend code'
                    onClick={handleResendCode}
                    type='link'
                  />
                </Row>
              </Form>

              <div>
                <div id={btnPortal}></div>
                <Terms />
              </div>
            </Wrapper>
          </Col>
        </Row>
      </Wrapper>
    </Spin>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(SendCodeForm);