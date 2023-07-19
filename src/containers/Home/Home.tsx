import { useEffect, useMemo } from 'react';
import { Row, Space, Spin, Badge } from 'antd';
import { connect } from 'react-redux';
import { BellOutlined, PlusOutlined } from '@ant-design/icons';
import { CSSTransition } from 'react-transition-group';
import parse from 'html-react-parser';
import classNames from 'classnames';

import { updateNotify } from 'graphql/mutations';
import { listToastChains, listNotifies } from 'graphql/queries';
import {
  createdNotifiesFetchGraphAction, createdNotifiesUpdateGraphAction,
  createdChainsFetchGraphAction, resetReducerAction,
} from 'redux-base/actions';

import Links from 'links';
import { RootState } from 'index';
import { useMemoState } from 'hooks';
import { getTimeFromNow, getName } from 'utils';
import { TUser, TNotification, TCreatedChain } from 'types';

import { ToastButton } from 'components/AntdComponents';
import { Wrapper, Header, ToastText, NavigationFooter, PhotoWithInfo } from 'components/common';
import celebrateImg from 'images/home.png';

import { AllChains } from './helpers';

import styles from './Home.module.scss';
import {useRouter} from "next/router";
// import './helpers/transition.scss';

const mapStateToProps = (state: RootState) => ({
  user: state.auth.user,
  isLoading: state.createChain.isLoading,
  createdChain: state.createChain.createdChain,
  createdChains: state.createChain.createdChains,
  notifications: state.createChain.notifications,
  notifyNextToken: state.createChain.notifyNextToken,
});

const mapDispatchToProps = {
  resetReducerAction,
  createdChainsFetchGraphAction,
  createdNotifiesFetchGraphAction,
  createdNotifiesUpdateGraphAction,
};

interface IHome {
  user: TUser;
  isLoading: boolean;
  notifications: TNotification[] | null;
  notifyNextToken: string;
  createdChain: TCreatedChain;
  createdChains: TCreatedChain[] | null;

  resetReducerAction: () => void;
  createdChainsFetchGraphAction: (data: { schema: unknown; variables: Record<string, unknown> }) => void;
  createdNotifiesFetchGraphAction: (data: { schema: unknown; variables: Record<string, unknown> }) => void;
  createdNotifiesUpdateGraphAction: (data: { schema: unknown; variables: Record<string, unknown> }) => void;
}

const Home = ({
  user,
  isLoading,
  createdChain,
  createdChains,
  notifications,
  notifyNextToken,

  resetReducerAction,
  createdChainsFetchGraphAction,
  createdNotifiesFetchGraphAction,
  createdNotifiesUpdateGraphAction,
}: IHome) => {
  const router = useRouter();
  const [showChain, setShowChain] = useMemoState(false);
  const [showNotifications, setShowNotifications] = useMemoState(false);

  const name = user?.attributes.name;
  const chainListIsEmpty = createdChains?.length;
  const slicedToasts = createdChains?.slice(0, 4) || [];

  useEffect(() => {
    if(!notifications && user?.attributes?.sub) {
      handleFetchNofies();
    }

    if(createdChain) {
      resetReducerAction();
    }
  }, [user?.attributes?.sub]);

  useEffect(() => {
    if(user) {
      createdChainsFetchGraphAction({
        schema: listToastChains,
        variables: { filter: { participantIds: { contains: user?.attributes?.sub } } },
      });
    }
  }, [user]);

  const handleFetchNofies = (nextToken?: string) => {
    createdNotifiesFetchGraphAction({
      schema: listNotifies,
      variables: {
        nextToken,
        limit: 10,
        filter: { initiatorId: { contains: user?.attributes?.sub } },
      },
    });
  };

  const newNotifies = useMemo(() => notifications?.filter(item => item?.isNew), [notifications]);

  const onClickNotificationsBell = () => {
    setShowNotifications(true);

    if(newNotifies?.length) {
      newNotifies.map(notif => {
        createdNotifiesUpdateGraphAction({
          schema: updateNotify,
          variables: {
            input: {
              id: notif?.id,
              isNew: false,
            },
          },
        });
      });
    }
  };

  const handleRedirectToChain = (chain: TCreatedChain) => {
    if(chain?.initiatorId === user?.attributes.sub) {
      router.push(`${Links.Chain}/${chain?.chainId}/${user?.attributes.sub}`);
    } else {
      router.push(`${Links.Toast}/${getName(chain?.recipientName as string)}/${chain?.chainId}`);
    }
  };

  return (
    <Spin spinning={isLoading} tip='Loading...'>
      <Wrapper>
        <Header
          margin={0}
          justify='end'
          rightOnClick={onClickNotificationsBell}
          rightIcon={(
            <>
              <Badge count={newNotifies?.length}>
                <BellOutlined />
              </Badge>
            </>
          )}
        />

        <Row>
          <span className={styles.homeTitle}>Welcome{name && ','}</span>
          {name && <b className={styles.homeTitle}>&nbsp;{name}</b>}
        </Row>

        <Row style={{ marginBottom: 30 }}>
          <ToastText
            textAlign='left'
            text='Create, collect and share the most important memories with the closest people.'
          />
        </Row>

        {!chainListIsEmpty && (
          <Row>
            <img
              alt='Toast'
              className={styles.celebrateImg}
              src={celebrateImg}
              onClick={() => router.push(Links.CreateChain)}
            />
          </Row>
        )}

        <AllChains
          onClick={setShowChain}
          onRedirect={handleRedirectToChain}
          createdChains={slicedToasts}
        />

        <NavigationFooter
          leftHome
          rightProfile
          centerIcon={<PlusOutlined />}
          centerText='Create a Chain'
          centerOnClick={() => router.push(Links.CreateChain)}
        />

        <CSSTransition
          in={showNotifications}
          timeout={500}
          classNames='notifications'
          unmountOnExit
        >
          <Wrapper className='notifications'>
            <Header
              leftClose
              justify='end'
              title='Notifications'
              leftOnClick={() => setShowNotifications(false)}
            />
            <Row>
              <Space size={20} direction='vertical' style={{ width: '100%' }}>
                {notifications?.map(notification => (
                  <Row
                    key={notification?.chainId}
                    justify='space-between'
                    className={classNames({ [styles.newNotify]: notification?.isNew })}
                  >
                    <PhotoWithInfo
                      text={user?.attributes.name
                        ? `By ${user?.attributes.name} - ${getTimeFromNow(notification?.created as number)}`
                        : getTimeFromNow(notification?.created as number)}
                      photo={notification?.photo}
                      chainInfo={parse(notification?.text.replaceAll('+', ' ') as string)}
                      onClick={() => handleRedirectToChain(notification as TCreatedChain)}
                    />
                  </Row>
                ))}
                {notifyNextToken && (
                  <ToastButton
                    block
                    size='middle'
                    type='primary'
                    text='Fetch more'
                    disabled={!notifyNextToken}
                    onClick={() => handleFetchNofies(notifyNextToken)}
                  />
                )}
              </Space>
            </Row>
          </Wrapper>
        </CSSTransition>

        <CSSTransition
          in={showChain}
          timeout={500}
          classNames='all-chains'
          unmountOnExit
        >
          <Wrapper className='all-chains'>
            <Header
              leftClose
              justify='end'
              title='All Chains'
              leftOnClick={() => setShowChain(false)}
            />
            <Row>
              <Space size={20} direction='vertical' style={{ width: '100%' }}>
                {createdChains?.map(chain => (
                  <PhotoWithInfo
                    key={chain?.chainId}
                    text={chain?.recipientName}
                    photo={chain?.recipientImg}
                    chainInfo={(
                      <>
                        <span style={{ fontWeight: 600 }}>{chain?.recipientName}&nbsp;</span> Chain
                      </>
                    )}
                    timeLeftProps={{
                      deadline: chain?.deadline,
                      created: chain?.created,
                      finalized: chain?.finalized,
                    }}
                    displayTimeLeft
                    onClick={() => handleRedirectToChain(chain)}
                  />
                ))}
              </Space>
            </Row>
          </Wrapper>
        </CSSTransition>

      </Wrapper>
    </Spin>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
