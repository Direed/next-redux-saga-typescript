import { useEffect } from 'react';
import { connect } from 'react-redux';
import { RcFile } from 'antd/lib/upload';
import { CaretRightOutlined, CopyOutlined, RightOutlined } from '@ant-design/icons';
import { Col, Divider, Row, Space, Spin, Collapse, Modal, Popconfirm } from 'antd';
import moment from 'moment';
import Stripe from 'stripe';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import Helmet from 'next/head';

import { getToastChain, queryRecordedVideosByChainId } from 'graphql/queries';
import { createToastChain, updateRecordedVideo, updateToastChain } from 'graphql/mutations';
import {
  notLoggedInDataReset, createChainGraphAction, createdChainUpdateGraphAction,
  createdChainFetchGraphAction, imageAddOrEditRequestAction,
  createdChainVideosFetchGraphAction, createdChainVideoUpdateGraphAction,
  stripePricesGetRequest, stitchVideosPostRequest,
  deleteChainAction,
} from 'redux-base/actions';

import Links from 'links';
import { config } from 'config';
import { RootState } from 'index';
import { BUCKET_USER_IMAGES } from 'awsConfig';
import { TUser, TChainVideo, TCreatedChain } from 'types';
import { useMemoState, useVideoCreateSubGQL } from 'hooks';
import { checkFinalizedChain, getName, onCopyLink, onNativeShare } from 'utils';

import { ToastButton } from 'components/AntdComponents';
import {
  ToastText, Wrapper, Header, PhotoWithInfo,
  CalendarInfo, Stories, TMenuItem, ToastLink,
} from 'components/common';
import { RecipientInfo, ChainParticipants, CheckoutForm, RecipientDeadline } from './helpers';

import styles from './Chain.module.scss';
import {useRouter} from "next/router";

const { Panel } = Collapse;

const stripePromise = loadStripe(config.api.stripeApiKey);

const mapStateToProps = (state: RootState) => ({
  user: state.auth.user,
  prices: state.createChain.prices,
  isLoading: state.createChain.isLoading,
  chainVideos: state.createChain.chainVideos,
  createdChain: state.createChain.createdChain,
  notAuthChain: state.createChain.notAuthChain,
  initiatedVideo: state.createChain.initiatedVideo,
  recipientVideo: state.createChain.recipientVideo,
  isChainDeleted: state.createChain.isChainDeleted,
});

const mapDispatchToProps = {
  notLoggedInDataReset,
  stripePricesGetRequest,
  stitchVideosPostRequest,
  imageAddOrEditRequestAction,
  createChainGraphAction,
  createdChainFetchGraphAction,
  createdChainUpdateGraphAction,
  createdChainVideosFetchGraphAction,
  createdChainVideoUpdateGraphAction,
  deleteChainAction,
};

interface IChain {
  user: TUser;
  isLoading: boolean;
  prices: Stripe.Price[] | null;
  chainVideos: TChainVideo[] | null;
  initiatedVideo: TChainVideo;
  recipientVideo: TChainVideo;
  createdChain: TCreatedChain;
  notAuthChain: TCreatedChain;
  isChainDeleted: boolean;

  notLoggedInDataReset: () => void;
  stripePricesGetRequest: () => void;
  imageAddOrEditRequestAction: (albumName: string, file: RcFile, key: string) => void;
  stitchVideosPostRequest: (data: { payload: Record<string, unknown> }) => void;
  createChainGraphAction: (data: { schema: unknown; variables: Record<string, unknown> }) => void;
  createdChainFetchGraphAction: (data: { schema: unknown; variables: Record<string, unknown> }) => void;
  createdChainUpdateGraphAction: (data: { schema: unknown; variables: Record<string, unknown> }) => void;
  createdChainVideosFetchGraphAction: (data: { schema: unknown; variables: Record<string, unknown> }) => void;
  createdChainVideoUpdateGraphAction: (data: { schema: unknown; variables: Record<string, unknown> }) => void;
  deleteChainAction: (chainId: string) => void;
}

const Chain = ({
  user,
  prices,
  isLoading,
  chainVideos,
  createdChain,
  notAuthChain,
  initiatedVideo,
  recipientVideo,
  isChainDeleted,

  notLoggedInDataReset,
  stripePricesGetRequest,
  imageAddOrEditRequestAction,
  stitchVideosPostRequest,
  createChainGraphAction,
  createdChainFetchGraphAction,
  createdChainUpdateGraphAction,
  createdChainVideosFetchGraphAction,
  createdChainVideoUpdateGraphAction,

  deleteChainAction,

  // history: { push, goBack },
  // match: { params },
  // location: { state },
}: IChain) => {
  const router = useRouter();
  const [play, setPlay] = useMemoState(false);
  const [isModalVisible, setIsModalVisible] = useMemoState(false);

  // --- menu start --- //
  let chainMenuItems: TMenuItem[] = [{
    text: 'Home',
    border: true,
    onClick: () => router.push(Links.Home),
  }, {
    border: true,
    text: 'Toast Participants',
    disabled: !chainVideos?.length,
    onClick: () => router.push(`${Links.Chain}/${router.query.chainId}/${router.query.userId}/participants`),
  }];

  if(!createdChain?.finalized) {
    chainMenuItems = [...chainMenuItems, {
      border: true,
      text: 'Record invitation again',
      disabled: !initiatedVideo,
      onClick: () => {
        router.push({
          pathname: Links.ToastRecorder,
          // state: { editInvitation: true },
        })
        localStorage.setItem("editInvitation", "true")
      },
    }, {
      border: true,
      text: 'Add your own video',
      onClick: () => router.push(Links.ToastRecorder),
    }, {
      text: 'Remove',
      color: 'red',
      onClick: () => handleDeleteChain(),
    }];
  }
  // --- menu end --- //

  const { finalizedWithoutPay, finalizedWithPay } = checkFinalizedChain(createdChain);

  if (router.query.chainId) {
    useVideoCreateSubGQL(String(router.query.chainId));
  }

  useEffect(() => {
    if(localStorage.getItem("refetchVideos")) {
      handleFetchVideos();
    }
  }, []);

  useEffect(() => {
    if(isChainDeleted) {
      router.push(Links.Home);
    }
  }, [isChainDeleted]);

  useEffect(() => {
    stripePricesGetRequest();

    if(user && router.query.userId !== user.attributes.sub) {
      router.push(Links.Home, undefined, { shallow: true });
    }

    if(!notAuthChain && router.query.chainId) {
      createdChainFetchGraphAction({
        schema: getToastChain,
        variables: { chainId: router.query.chainId },
      });
      handleFetchVideos();
    }

    // here we will complete chain after user logging in
    if(notAuthChain) {

      const { file, ...restChain } = notAuthChain;

      if(file) {
        imageAddOrEditRequestAction(user?.username as string, file, notAuthChain.chainId);
      }

      createChainGraphAction({
        schema: createToastChain,
        variables: {
          input: {
            ...restChain,
            initiatorName: user?.attributes.name,
            initiatorPhone: user?.username,
            initiatorId: user?.attributes?.sub,
            participantIds: [user?.attributes?.sub],
            recipientImg: file ? `https://${BUCKET_USER_IMAGES}.s3.amazonaws.com/%252B${user?.username.replace('+', '')}/${router.query.chainId}` : null,
          },
        },
      });
    }

    return () => {
      if(notAuthChain) {
        notLoggedInDataReset();
      }
    };
  }, []);

  useEffect(() => {
    // if user was not logged in he doesn't have userId but he can save video and we should
    // add initiatorId and other props for video after log in
    if(initiatedVideo && !initiatedVideo.initiatorId) {
      createdChainVideoUpdateGraphAction({
        schema: updateRecordedVideo,
        variables: {
          input: {
            id: initiatedVideo.id,
            initiatorId: user?.attributes?.sub,
            participantName: user?.attributes?.name,
            participantId: user?.attributes?.sub,
          },
        },
      });
    }

    if(!createdChain?.initiatorName && user?.attributes.name && createdChain?.initiatorId === user.attributes.sub) {
      createdChainUpdateGraphAction({
        schema: updateToastChain,
        variables: {
          input: {
            chainId: createdChain?.chainId,
            initiatorName: user?.attributes?.name,
          },
        },
      });
    }
  }, [initiatedVideo, createdChain]);

  const handleFinalize = () => router.push(`${Links.ChainFinalize}/${router.query.chainId}`);

  const handleFetchVideos = () => {
    createdChainVideosFetchGraphAction({
      schema: queryRecordedVideosByChainId,
      variables: { chainId: router.query.chainId },
    });
  };

  const handleStitch = () => {
    const videoUrls = chainVideos?.reduce((acc: string[], video) => {
      if(video?.url) {
        acc.push(video.url);
      }

      return acc;
    }, []);

    stitchVideosPostRequest({
      payload: {
        chainId: router.query.chainId,
        initiatorId: user?.attributes.sub as string,
        recipientName: createdChain?.recipientName as string,
        recipientPhoto: createdChain?.recipientImg as string,
        created: moment().unix(),
        videos: videoUrls,
        addTransition: true,
      },
    });

    createdChainUpdateGraphAction({
      schema: updateToastChain,
      variables: {
        input: {
          chainId: createdChain?.chainId,
          stitchingVideo: true,
        },
      },
    });
  };

  const handleDeleteChain = () => {
    if (router.query.chainId) {
      deleteChainAction(String(router.query.chainId));
    }
  }

  const handleOnPlay = () => setPlay(!play);

  // if(router.query.type === 'participants') {
  //   return (
  //     <ChainParticipants
  //       user={user}
  //       isLoading={isLoading}
  //       chainVideos={chainVideos}
  //       createdChain={createdChain}
  //       createdChainUpdateGraphAction={createdChainUpdateGraphAction}
  //     />
  //   );
  // }
  //
  // if(router.query.type === 'recipient-info') {
  //   return (
  //     <RecipientInfo
  //       user={user}
  //       isLoading={isLoading}
  //       createdChain={createdChain}
  //       imageAddOrEditRequestAction={imageAddOrEditRequestAction}
  //       createdChainUpdateGraphAction={createdChainUpdateGraphAction}
  //       goBack={router.back}
  //     />
  //   );
  // }
  //
  // if(router.query.type === 'recipient-date') {
  //   return (
  //     <RecipientDeadline
  //       isLoading={isLoading}
  //       createdChain={createdChain}
  //       createdChainUpdateGraphAction={createdChainUpdateGraphAction}
  //       goBack={router.back}
  //     />
  //   );
  // }

  return (
    <Spin spinning={isLoading} tip='Loading...'>
          <Helmet>
            <meta property='og:type' content='toast.video'/>
            <meta property='og:title' content={`${createdChain?.recipientName} Video Chain`}/>
            <meta property='og:description' content={createdChain?.detailsDescription}/>
            <meta property='og:image' content={createdChain?.recipientImg}/>
            <meta property='og:url'
                  content={`https://toast.video/toast/${getName(createdChain?.recipientName as string)}/${createdChain?.chainId}`}/>
            <meta property='og:site_name' content='Toast Video'/>
            <meta property='og:image:width' content='280'/>
            <meta property='og:image:height' content='280'/>
          </Helmet>

          <Row style={{position: 'relative'}}>
            <Header
              absolute
              justify='end'
              rightMenu
              menuItems={chainMenuItems}
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
            {(!play && !finalizedWithoutPay) && (
              <div className={styles.share} id='link-container'>
                <Row>
                  <ToastButton
                    block
                    size='middle'
                    type='primary'
                    text={(finalizedWithPay || finalizedWithoutPay) ? `Share video chain with ${createdChain?.recipientName}` : 'Share Invitation'}
                    onClick={() => onNativeShare(createdChain)}
                  />
                </Row>
                <Row>
                  <ToastButton
                    block
                    type='text'
                    style={{
                      color: '#FFFFFF',
                      justifyContent: 'center',
                    }}
                    text={createdChain?.initiatorLink}
                    onClick={() => onCopyLink(createdChain, 'link-container')}
                    icon={<CopyOutlined/>}
                  />
                </Row>
              </div>
            )}
          </Row>
          <Wrapper height='auto'>
            <Space size={30} direction='vertical' style={{width: '100%'}}>
              {!createdChain?.finalized && (
                <Row>
                  <Popconfirm
                    placement='top'
                    title='Are you sure you want to close this video chain? You won’t be able to add new videos from participants.'
                    onConfirm={handleFinalize}
                    okText='Yes'
                    cancelText='No'
                    overlayStyle={{maxWidth: '90%'}}
                    okButtonProps={{
                      style: {
                        color: '#FFFFFF',
                        borderColor: '#5856D6',
                        backgroundColor: '#5856D6',
                      },
                    }}
                  >
                    <ToastButton
                      block
                      size='middle'
                      text='Finalize & send chain to recipient'
                      disabled={!chainVideos?.length}
                    />
                  </Popconfirm>
                </Row>
              )}
              <Row>
                <Col xs={24}>
                  <ToastText
                    black
                    fontSize={24}
                    lineHeight='36px'
                    textAlign='left'
                    text={(
                      <>
                        <b>{createdChain?.recipientName}&nbsp;</b>{(finalizedWithPay || finalizedWithoutPay) ? 'Video Chain' : 'Toast'}
                      </>
                    )}
                  />
                </Col>
              </Row>
              {finalizedWithoutPay && (
                <>
                  <Row>
                    <Col xs={24}>
                      <ToastText
                        textAlign='left'
                        text='You just created this amazing video chain. Send this special gift to your loved one now. It costs less than a traditional greeting card and they will thank you forever.'
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={24}>
                      <Elements stripe={stripePromise}>
                        <CheckoutForm
                          prices={prices}
                          chainId={createdChain?.chainId as string}
                        />
                        <ToastButton
                          block
                          type='text'
                          size='small'
                          text='Don’t Pay - Share final chain with Toast Video logo'
                          onClick={() => setIsModalVisible(true)}
                          style={{
                            padding: 0,
                            color: '#9D9D9D',
                            justifyContent: 'center',
                          }}
                        />
                      </Elements>
                    </Col>
                  </Row>

                  <Row>

                    <Divider/>

                    <Col xs={24}>
                      <Collapse
                        bordered={false}
                        expandIcon={({isActive}) => <CaretRightOutlined rotate={isActive ? 90 : 0}/>}
                      >
                        <Panel header='Details' key='Details'>
                          <ToastText
                            textAlign='left'
                            text='Once your payment is done the watermark will be removed. You will be able to send the finalized and edited video chain to the recipient. After they watch all those great videos, they will be able to record their response as well. The video chain will be accessible with the same URL and you will be able to download it as a single file.'
                          />
                        </Panel>
                      </Collapse>

                      <ToastText
                        black
                        textAlign='left'
                        text='Testimonials :'
                        fontSize='20px'
                        margin='15px 0'
                      />

                      <Collapse
                        bordered={false}
                        expandIcon={({isActive}) => <CaretRightOutlined rotate={isActive ? 90 : 0}/>}
                      >

                        <Panel header='PIC Manuela Goya' key='PIC Manuela Goya'>
                          <ToastText
                            textAlign='left'
                            text='Seeing all those amazing messages from so many of my favorite people was such a beautiful gift. I will keep it forever with me.'
                          />
                        </Panel>

                        <Panel header='PIC Richard Bruno' key='PIC Richard Bruno'>
                          <ToastText
                            textAlign='left'
                            text='This is worth more to me than any physical gift I could have received.'
                          />
                        </Panel>

                        <Panel header='PIC Ionut Pandea' key='PIC Ionut Pandea'>
                          <ToastText
                            textAlign='left'
                            margin='0 0 10px 0'
                            text='Toast.Video made it so easy to assemble a chain of videos. It was a breeze compare to other more tedious methods.'
                          />
                          <ToastText
                            textAlign='left'
                            text='Your payment help us keep the service going. We need to pay for the storage of the videos, the editing tools, the developers and designers, the messages, our kids education, etc. Thank you for your support.'
                          />
                        </Panel>
                      </Collapse>
                    </Col>
                  </Row>
                  <Modal
                    title='Share with recipient'
                    visible={isModalVisible}
                    onCancel={() => setIsModalVisible(false)}
                    footer={null}
                  >
                    <Row>
                      <ToastButton
                        block
                        size='middle'
                        type='primary'
                        text={`Share video chain with ${createdChain?.recipientName}`}
                        onClick={() => onNativeShare(createdChain, true)}
                      />
                    </Row>
                    <Row id='link-container'>
                      <ToastButton
                        block
                        type='text'
                        style={{justifyContent: 'center'}}
                        text={createdChain?.initiatorLink}
                        onClick={() => {
                          onCopyLink(createdChain, 'link-container', true);
                          setIsModalVisible(false);
                        }}
                        icon={<CopyOutlined/>}
                      />
                    </Row>
                  </Modal>
                </>
              )}
              {createdChain?.finalized && (
                <Row justify='center'>
                  <ToastLink href='https://forms.gle/SJzxUo4vKktZ2P2U9'>
                    Give us your feedback
                  </ToastLink>
                </Row>
              )}
              {!finalizedWithoutPay && !finalizedWithPay && (
                <>
                  <Row>
                    <Col xs={24}>
                      <PhotoWithInfo
                        name={createdChain?.recipientName}
                        photo={createdChain?.recipientImg}
                        onClick={() => router.push(`${Links.Chain}/${router.query.chainId}/${router.query.userId}/recipient-info`)}
                        extraElement={<RightOutlined/>}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={24}>
                      <CalendarInfo
                        onClick={() => router.push(`${Links.Chain}/${router.query.chainId}/${router.query.userId}/recipient-date`)}
                        date={moment.unix(createdChain?.deadline as number).format('dddd, DD MMM YYYY')}
                      />
                    </Col>
                  </Row>
                </>
              )}
              {finalizedWithPay && (
                <Row>
                  {createdChain?.stitchedVideoUrl
                    ?
                    (
                      <a
                        className={styles.downloadLink}
                        href={createdChain?.stitchedVideoUrl}
                        download='video'
                      >
                        Download final video chain
                      </a>
                    )
                    :
                    (
                      <ToastButton
                        block
                        size='middle'
                        text='Stitch the video for download'
                        onClick={handleStitch}
                        disabled={createdChain?.stitchingVideo}
                      />
                    )
                  }
                </Row>
              )}
            </Space>
            {!finalizedWithoutPay && !finalizedWithPay && (
              <>
                <Divider/>

                <Row>
                  <Col xs={24}>
                    <PhotoWithInfo
                      text='You'
                      name={user?.attributes.name || user?.username}
                      photo={user?.attributes.picture}
                      onClick={() => router.push(`${Links.Profile}/my-account`)}
                      extraElement={<RightOutlined/>}
                    />
                  </Col>
                </Row>
              </>
            )}
          </Wrapper>
    </Spin>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Chain);
