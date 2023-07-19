import { connect } from 'react-redux';
import { Divider, Typography, Spin, Space, Popconfirm } from 'antd';
import { PlusOutlined, RightOutlined } from '@ant-design/icons';

import { logoutAction, deleteAccountRequestAction } from 'redux-base/actions';

import Links from 'links';
import { TUser } from 'types';
import { RootState } from 'index';

import { NavigationFooter, PhotoWithInfo, ToastText, Wrapper } from 'components/common';
import { ToastButton } from 'components/AntdComponents';

import { MyAccount } from './helpers';
import {useRouter} from "next/router";

const { Title } = Typography;

const mapStateToProps = (state: RootState) => ({
  user: state.auth.user,
  isLoading: state.auth.isLoading,
});

const mapDispatchToProps = {
  logoutAction,
  deleteAccountRequestAction,
};

interface IHome {
  user: TUser;
  isLoading: boolean;
  logoutAction: () => void;
  deleteAccountRequestAction: () => void;
}

const Home = ({
  user,
  isLoading,

  logoutAction,
  deleteAccountRequestAction,
}: IHome) => {
  const router = useRouter();

  if(router.query.path === 'my-account') {
    return (
      <Spin spinning={isLoading} tip='Loading...'>
        <MyAccount user={user} goBack={router.back} />
      </Spin>
    );
  }

  return (
    <Spin spinning={isLoading} tip='Loading...'>
      <Wrapper displayFlex column>
        <Wrapper column displayFlex noPadding justify='space-between'>
          <div>
            <Title level={2}>Profile</Title>

            <ToastText
              textAlign='left'
              text='Create, collect and share the most important memories with the closest people.'
            />

            <Divider orientation='left'>My Account</Divider>

            <Space size={20} direction='vertical' style={{ width: '100%' }}>
              <PhotoWithInfo
                name={user?.attributes.name}
                photo={user?.attributes.picture}
                text={user?.username}
                onClick={() => router.push(`${Links.Profile}/my-account`)}
                extraElement={<RightOutlined />}
              />

              <ToastButton
                danger
                type='link'
                text='Logout'
                onClick={logoutAction}
              />
            </Space>
          </div>

          <Popconfirm
            placement='topLeft'
            title='Are you sure you want to delete your account? In this case, all your information and data will be deleted.'
            onConfirm={deleteAccountRequestAction}
            okText='Yes'
            cancelText='No'
            overlayStyle={{ maxWidth: '90%' }}
            okButtonProps={{
              style: {
                color: '#FFFFFF',
                borderColor: '#5856D6',
                backgroundColor: '#5856D6',
              },
            }}
          >
            <ToastButton
              type='link'
              text='Delete account'
              style={{
                color: '#9CA2A9',
                fontSize: 12,
              }}
            />
          </Popconfirm>
        </Wrapper>

        <NavigationFooter
          leftHome
          rightProfile
          centerIcon={<PlusOutlined />}
          centerText='Create a Chain'
          centerOnClick={() => router.push(Links.CreateChain)}
        />
      </Wrapper>
    </Spin>
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);