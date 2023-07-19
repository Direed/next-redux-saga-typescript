import { connect } from 'react-redux';
import { Form as AntdForm, Row, Col, Spin } from 'antd';
import Media from 'react-media-next';

import { signInRequest, resetReducerAction } from 'redux-base/actions';

import dynamic from 'next/dynamic'

// const { Form } = dynamic(
//     (): any => import('../../../components/Form'),
//     { ssr: false }
// )

// console.log(Form)

import { TCreatedChain, TError } from 'types';
import { formatPhoneNumber } from 'utils';
import { mediaQueries } from 'config';
import { RootState } from 'index';
import Links from 'links';

import { Form } from 'components/Form';
import { Header, Wrapper } from 'components/common';
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
  signInRequest,
  resetReducerAction,
};

interface ISignUp {
  error: TError;
  isLoading: boolean;
  isNotLoggedInParticipant: boolean;
  notAuthChain: TCreatedChain;
  createdChain: TCreatedChain;
  signInRequest: (phone: string) => void;
  resetReducerAction: () => void;
}

export const SignIn = ({
  error,
  isLoading,
  isNotLoggedInParticipant,
  notAuthChain,
  createdChain,

  signInRequest,
  resetReducerAction,
}: ISignUp) => {
  const btnPortal = 'button-portal';
  const [singIn] = AntdForm.useForm();
  const router = useRouter();

  useFormError(singIn, 'phone', error);

  const handleSendPhoneNumber = ({ prefix, phone }: { prefix: string; phone: string }) => {
    if(error) {
      resetReducerAction();
    }

    signInRequest(formatPhoneNumber(`${prefix}${phone}`));
  };

  return (
    <Spin spinning={isLoading} tip='Loading...'>
      <Wrapper displayFlex column>
        <Header
          rightText='Sign Up'
          rightTo={Links.SignUp}
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
              title='Welcome Back!'
              text='Easily create and share a video chain to celebrate someone special'
              name={notAuthChain?.recipientName || createdChain?.recipientName}
              isNotLoggedInParticipant={isNotLoggedInParticipant}
            />

            <Media queries={mediaQueries}>
              {screen =>
                <Wrapper noPadding column displayFlex={!!screen.smallScreen} flex={1} justify='space-between'>
                  <Form
                    form={singIn}
                    name='singIn'
                    handleSubmit={handleSendPhoneNumber}
                    initialValues={{ prefix: 'CA +1' }}

                    buttonText='Log In'
                    buttonPortal={btnPortal}

                    fields={[{
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

export default withRedirectHOC(withSendCodeHOC(connect(mapStateToProps, mapDispatchToProps)(SignIn)));

