import { useEffect } from 'react';
import { CopyOutlined } from '@ant-design/icons';
import { Col, Divider, Row, Space, Spin } from 'antd';
import { connect } from 'react-redux';
import moment from 'moment';
import Helmet from 'next/head';

import { queryRecordedVideosByChainId, getToastChain } from 'graphql/queries';
import { createdChainFetchGraphAction, createdChainVideosFetchGraphAction, notLoggedInData } from 'redux-base/actions';

import Links from 'links';
import { useMemoState, useVideoCreateSubGQL } from 'hooks';
import { RootState } from 'index';
import { TChainVideo, TCreatedChain, TNotLoggedInData, TUser } from 'types';
import { checkFinalizedChain, getName, onCopyLink, onNativeShare } from 'utils';

import { ToastButton } from 'components/AntdComponents';
import {
  ToastText, Wrapper, PhotoWithInfo,
  CalendarInfo, Stories, Header, ToastLink,
} from 'components/common';

import styles from './Toast.module.scss';
import {useRouter} from "next/router";

const mapStateToProps = (state: RootState) => ({
  user: state.auth.user,
  isLoading: state.createChain.isLoading,
  isLoggedIn: state.auth.isLoggedIn,
  createdChain: state.createChain.createdChain,
  initiatedVideo: state.createChain.initiatedVideo,
  recipientVideo: state.createChain.recipientVideo,
  chainVideos: state.createChain.chainVideos,
});

const mapDispatchToProps = {
  notLoggedInData,
  createdChainFetchGraphAction,
  createdChainVideosFetchGraphAction,
};

interface IToast {
  user: TUser;
  isLoading: boolean;
  isLoggedIn: boolean;
  createdChain: TCreatedChain;
  chainVideos: TChainVideo[] | null;
  initiatedVideo: TChainVideo;
  recipientVideo: TChainVideo;
  notLoggedInData: (data: TNotLoggedInData) => void;
  createdChainFetchGraphAction: (data: { schema: unknown; variables: Record<string, unknown> }) => void;
  createdChainVideosFetchGraphAction: (data: { schema: unknown; variables: Record<string, unknown> }) => void;
}

const Toast = ({
  user,
  isLoading,
  isLoggedIn,
  createdChain,
  chainVideos,
  initiatedVideo,
  recipientVideo,

  notLoggedInData,
  createdChainFetchGraphAction,
  createdChainVideosFetchGraphAction,

}: IToast) => {
  const [play, setPlay] = useMemoState(false);
  const router = useRouter();
  console.log(router)

  const toastMenuItems = [{
    text: 'Home',
    onClick: () => router.push(Links.Home),
  }];

  const isRecipientParam = router.query.recipient === 'recipient'; // strict check param
  const recipientHasVideo = createdChain?.recipientId === user?.attributes.sub && recipientVideo;
  const participantExistInChain = chainVideos?.find(video => video?.participantId === user?.attributes.sub);
  const recipientCondition = createdChain?.finalized &&
    (createdChain?.recipientId === user?.attributes.sub || (!createdChain?.recipientId && isRecipientParam));

  const { finalizedWithPay } = checkFinalizedChain(createdChain);

  useVideoCreateSubGQL(String(router.query.chainId));

  useEffect(() => {
    if(user && createdChain && createdChain.initiatorId === user.attributes.sub) {
      router.push(`${Links.Chain}/${router.query.chainId}/${user.attributes.sub}`);
    }
  }, [user, createdChain]);

  useEffect(() => {
    if(router.query.chainId) {
      createdChainFetchGraphAction({
        schema: getToastChain,
        variables: { chainId: router.query.chainId },
      });
      createdChainVideosFetchGraphAction({
        schema: queryRecordedVideosByChainId,
        variables: { chainId: router.query.chainId },
      });
    }
  }, []);

  const handleVideoRecord = () => {
    if(isLoggedIn && user) {
      router.push({
        pathname: Links.ToastRecorder,
        // state: { chainRecipient: recipientCondition },
      });
    } else if (!isLoggedIn && !user && isRecipientParam) {
      notLoggedInData({ isNotLoggedInRecipient: true });
      router.push(Links.SignUp);
    } else {
      notLoggedInData({ isNotLoggedInParticipant: true });
      router.push(Links.SignUp);
    }
  };

  const handleOnPlay = () => setPlay(!play);

  return (
    <Spin spinning={isLoading} tip='Loading...'>
      <Helmet>
        <meta property='og:type' content='toast.video' />
        <meta property='og:title' content={`${createdChain?.recipientName} Video Chain`} />
        <meta property='og:description' content={createdChain?.detailsDescription} />
        <meta property='og:image' content={createdChain?.recipientImg}/>
        <meta property='og:url' content={`https://toast.video/toast/${getName(createdChain?.recipientName as string)}/${createdChain?.chainId}`} />
        <meta property='og:site_name' content='Toast Video' />
        <meta property='og:image:width' content='280' />
        <meta property='og:image:height' content='280'/>
      </Helmet>

      <Row style={{ position: 'relative' }}>
        <Header
          absolute
          justify='end'
          rightMenu
          menuItems={toastMenuItems}
          iconColor='#FFFFFF'
          margin={0}
          padding='0 20px'
        />
        <Stories
          play={play}
          initiatedVideo={initiatedVideo}
          recipientVideo={recipientVideo}
          chainVideos={chainVideos}
          onTogglePlay={handleOnPlay}
          isPurchased={!!createdChain?.transactionId}
        />
        <Row className={styles.share}>
          {!createdChain?.finalized && !play && (
            <ToastButton
              block
              size='middle'
              type='primary'
              text={participantExistInChain ? 'Record your video again' : 'Record your video'}
              onClick={handleVideoRecord}
            />
          )}
          {recipientCondition && !recipientHasVideo && !play && (
            <ToastButton
              block
              size='middle'
              type='primary'
              text='Record your thank you video'
              onClick={handleVideoRecord}
            />
          )}
        </Row>
      </Row>
      {recipientCondition && (
        <Wrapper height='auto'>
          <Space size={30} direction='vertical' style={{ width: '100%' }}>
            <Row>
              <Col xs={24}>
                <ToastText
                  black
                  fontSize={24}
                  lineHeight='36px'
                  textAlign='left'
                  text={(
                    <>
                      <b>{createdChain?.recipientName}&nbsp;Video Chain</b>
                    </>
                  )}
                />
              </Col>
            </Row>
            {!recipientHasVideo && (
              <Row>
                <Col xs={24}>
                  <ToastText
                    textAlign='left'
                    text='Record your thank you video to let your friends know how much you appreciate them. Your thank you video will be added to the beginning of the chain.'
                  />
                </Col>
              </Row>
            )}
            {createdChain?.stitchedVideoUrl && finalizedWithPay && (
              <Row>
                <a
                  className={styles.downloadLink}
                  href={createdChain?.stitchedVideoUrl}
                  download='video'
                >
                  Download final video chain
                </a>
              </Row>
            )}
          </Space>
        </Wrapper>
      )}
      {!createdChain?.finalized && (
        <Wrapper height='auto'>
          <Space size={30} direction='vertical' style={{ width: '100%' }}>
            <Row>
              <Col xs={24}>
                <ToastButton
                  block
                  size='middle'
                  text='Share Invitation'
                  onClick={() => onNativeShare(createdChain)}
                />
              </Col>
              <Col xs={24}>
                <ToastButton
                  block
                  type='text'
                  style={{ justifyContent: 'center' }}
                  text={createdChain?.initiatorLink}
                  onClick={() => onCopyLink(createdChain, 'link-container')}
                  icon={<CopyOutlined />}
                />
              </Col>
            </Row>

            <Row>
              <Col xs={24}>
                <ToastText
                  black
                  fontSize={24}
                  lineHeight='36px'
                  textAlign='left'
                  text={(
                    <>
                      <b>{createdChain?.recipientName}&nbsp;</b> Video Chain
                    </>
                  )}
                />
              </Col>
            </Row>
            {createdChain?.detailsDescription && (
              <Row>
                <Col xs={24}>
                  <ToastText
                    black
                    textAlign='left'
                    text={createdChain?.detailsDescription}
                  />
                </Col>
              </Row>
            )}
            <Row>
              <Col xs={24}>
                <PhotoWithInfo
                  name={createdChain?.recipientName}
                  photo={createdChain?.recipientImg}
                />
              </Col>
            </Row>
            <Row>
              <Col xs={24}>
                <CalendarInfo date={moment.unix(createdChain?.deadline as number).format('dddd, DD MMM YYYY')} />
              </Col>
            </Row>
          </Space>

          <Divider />

          <Row>
            <Col xs={24}>
              <PhotoWithInfo
                text='Toast Master'
                name={createdChain?.initiatorName || createdChain?.initiatorPhone}
                photo={createdChain?.initiatorPhoto}
              />
            </Col>
          </Row>
        </Wrapper>
      )}
      {createdChain?.finalized && (
        <Wrapper height='auto'>
          <Row>
            <ToastButton
              block
              type='primary'
              text='Create a new video chain'
              onClick={() => router.push(Links.CreateChain)}
              margin='0 0 10px 0'
            />
          </Row>
          <Row justify='center'>
            <ToastLink href='https://forms.gle/SJzxUo4vKktZ2P2U9' >
              Give us your feedback
            </ToastLink>
          </Row>
        </Wrapper>
      )}
    </Spin>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Toast);