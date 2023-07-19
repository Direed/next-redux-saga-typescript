import { connect } from 'react-redux';
import { Form as AntdForm, Row, Col, Spin } from 'antd';
import Media from 'react-media-next';

import { signUpRequest, resetReducerAction } from 'redux-base/actions';

import { TCreatedChain, TError } from 'types';
import { formatPhoneNumber } from 'utils';
import { mediaQueries } from 'config';
import { RootState } from 'index';
import Links from 'links';

import { Form } from 'components/Form';
import { Wrapper, Header } from 'components/common';
import { withSendCodeHOC } from '../SendCode';
import { withRedirectHOC } from '../RedirectHOC';
import { LogoBlock } from '../LogoBlock';
import { Terms } from '../Terms';
import { useFormError } from '../useFormError';
import {useRouter} from "next/router";

const mapStateToProps = (state: RootState) => ({
  isLoading: state.auth.isLoading,
  isNotLoggedInParticipant: state.createChain.isNotLoggedInParticipant,
  notAuthChain: state.createChain.notAuthChain,
  createdChain: state.createChain.createdChain,
  error: state.error.error,
});

const mapDispatchToProps = {
  signUpRequest,
  resetReducerAction,
};

interface ISignUp {
  error: TError;
  isLoading: boolean;
  isNotLoggedInParticipant: boolean;
  notAuthChain: TCreatedChain;
  createdChain: TCreatedChain;
  signUpRequest: (phone: string, name: string) => void;
  resetReducerAction: () => void;
}

const SignUp = ({
  error,
  isLoading,
  isNotLoggedInParticipant,
  notAuthChain,
  createdChain,

  signUpRequest,
  resetReducerAction,

}: ISignUp) => {
  const router = useRouter();
  const btnPortal = 'button-portal';
  const [signUp] = AntdForm.useForm();

  useFormError(signUp, 'phone', error);

  const handleSendPhoneNumber = (
    { prefix, phone, displayName }: { prefix: string; phone: string; displayName: string; },
  ) => {
    if(error) {
      resetReducerAction();
    }

    signUpRequest(formatPhoneNumber(`${prefix}${phone}`), displayName);
  };

  let buttonText = 'Create video chain';

  if(notAuthChain) {
    buttonText = 'Activate your video chain';
  } else if (isNotLoggedInParticipant) {
    buttonText = 'Add your video';
  }

  return (
    <Spin spinning={isLoading} tip='Loading...'>
      <Wrapper displayFlex column>
        <Header
          rightText='Sign In'
          rightTo={Links.Login}
          leftOnClick={router.back}
        />
        <Row justify='center' style={{ flex: 1 }}>
          <Col xs={24} sm={20} md={10} lg={8} xl={6} xxl={4}
            style={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <LogoBlock
              title='Toast Video'
              text='Easily create and share a video chain to celebrate someone special'
              name={notAuthChain?.recipientName || createdChain?.recipientName}
              isNotLoggedInParticipant={isNotLoggedInParticipant}
            />

            <Media queries={mediaQueries}>
              {screen =>
                <Wrapper noPadding column displayFlex={!!screen.smallScreen} flex={1} justify='space-between'>
                  <Form
                    form={signUp}
                    name='signUp'
                    handleSubmit={handleSendPhoneNumber}
                    initialValues={{ prefix: 'CA +1' }}

                    buttonText={buttonText}
                    buttonPortal={btnPortal}

                    fields={[{
                      type: 'text',
                      name: 'displayName',
                      label: 'Your Name',
                      rules: [{
                        required: true,
                        message: 'Please input your full name.',
                      }],
                    }, {
                      type: 'phone',
                      name: 'phone',
                      codeName: 'prefix',
                      label: 'Your Mobile Phone',
                      rules: [{
                        required: true,
                        message: 'Please input your phone number.',
                      }],
                    }]}
                  />
                  <div>
                    <div id={btnPortal}></div>
                    <Terms />
                  </div>
                </Wrapper>
              }
            </Media>
          </Col>
        </Row>
      </Wrapper>
    </Spin>
  );
};

export default withRedirectHOC(withSendCodeHOC(connect(mapStateToProps, mapDispatchToProps)(SignUp)));