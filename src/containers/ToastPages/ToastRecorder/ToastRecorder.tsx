import { useEffect } from 'react';
import { connect } from 'react-redux';
import { Popconfirm, Spin } from 'antd';
import find from 'lodash/find';

import { updateToastChain } from 'graphql/mutations';
import { videoDeleteAction, createdChainUpdateGraphAction } from 'redux-base/actions';

import Links from 'links';
import { getName } from 'utils';
import { RootState } from 'index';
import { useMemoState, useVideoCreateSubGQL, useVideoUpdateSubGQL } from 'hooks';
import { TChainVideo, TCreatedChain, TUser } from 'types';

import { NavigationFooter, VideoPlayer, VideoRecorder, Wrapper } from 'components/common';

import Record from 'images/footer/record.svg';
import { SplitCellsOutlined } from '@ant-design/icons';
import {useRouter} from "next/router";

const mapStateToProps = (state: RootState) => ({
  user: state.auth.user,
  isLoading: state.createChain.isLoading,
  chainVideos: state.createChain.chainVideos,
  createdChain: state.createChain.createdChain,
  initiatedVideo: state.createChain.initiatedVideo,
});

const mapDispatchToProps = {
  videoDeleteAction,
  createdChainUpdateGraphAction,
};

interface IChainRecorder {
  user: TUser;
  isLoading: boolean;
  createdChain: TCreatedChain;
  chainVideos: TChainVideo[] | null;
  initiatedVideo: TChainVideo;
  videoDeleteAction: (videoKey: string) => void;
  createdChainUpdateGraphAction: (data: { schema: unknown; variables: Record<string, unknown> }) => void;
}

export const ToastRecorder = ({
  user,
  isLoading,
  createdChain,
  chainVideos,
  initiatedVideo,

  videoDeleteAction,
  createdChainUpdateGraphAction,

  // history: { push },
  // location: { state },
}: IChainRecorder) => {
  const router = useRouter();
  // const state: any = null;
  // console.log(state)
  const [videoSaved, setVideoSaved] = useMemoState(false);
  const [isEditReady, setEditReady] = useMemoState(false);
  const [recordAgain, setRecordAgain] = useMemoState(!!localStorage.getItem("editInvitation"));
  const [videoExist, setVideoExist] = useMemoState<TChainVideo | null>(null);

  useVideoCreateSubGQL(createdChain?.chainId as string);
  useVideoUpdateSubGQL(createdChain?.chainId as string);

  useEffect(() => {
    if(!createdChain) {
      router.push(Links.Home);
    }
  }, []);

  // here we will add new participants to the participantIds array, after which users will be available for fetch
  // chains to their home page, this is only for NEW participants
  useEffect(() => {
    const findParticipant = createdChain?.participantIds.includes(user?.attributes.sub as string);

    if(videoSaved && createdChain && !findParticipant) {
      createdChainUpdateGraphAction({
        schema: updateToastChain,
        variables: {
          input: {
            chainId: createdChain?.chainId,
            participantIds: [...createdChain.participantIds, user?.attributes.sub],
            ...(!!localStorage.getItem("chainRecipient") && { recipientId: user?.attributes.sub }),
          },
        },
      });
    }
  }, [videoSaved]);

  useEffect(() => {
    // if participant has recorded video we must override this video in DB, item with this video will be
    // overrided from lambda toastVideoWebhook
    let foundVideo;
    if(localStorage.getItem("editInvitation")) {
      foundVideo = initiatedVideo;
    } else if (localStorage.getItem("participantVideoId")) {
      foundVideo = find(chainVideos, video => video?.id === localStorage.getItem("participantVideoId"));
    } else {
      foundVideo = find(chainVideos, video => video?.participantId === user?.attributes.sub);
    }

    setVideoExist(foundVideo as TChainVideo);
  }, [chainVideos, initiatedVideo]);

  const renderPlayer = () => {
    if((videoExist || videoSaved) && !recordAgain) {
      return (
        <VideoPlayer
          src={videoExist?.url}
          poster={videoExist?.snapshotUrl}
        />
      );
    }

    let text;

    if(!videoExist && !localStorage.getItem("editInvitation")) {
      text = 'Your Toast has been recorded!';
    } else if (videoExist && localStorage.getItem("editInvitation")) {
      text = 'Your Toast invitations has been edited!';
    } else {
      text = 'Your Toast has been edited!';
    }

    return (
      <VideoRecorder
        user={user}
        successText={text}
        createdChain={createdChain}
        videoSaved={videoSaved}
        onSave={handleSavedVideo}
        videoId={videoExist?.id}
        initiatedVideo={!!localStorage.getItem("editInvitation")}
        chainRecipient={!!localStorage.getItem("chainRecipient")}
      />
    );
  };

  const handleSavedVideo = (status: boolean) => {
    if(status) {
      setVideoSaved(true);
      setRecordAgain(false);

      if(videoExist) {
        setVideoExist(null);
        videoDeleteAction(videoExist.videoName as string);
      }
    }
  };

  const checkExist = setInterval(() => {
    if (videoExist?.id) {
      setEditReady(true);
      clearInterval(checkExist);
    }
  }, 100);

  const centerBtn = (videoExist && !recordAgain && !createdChain?.finalized) && {
    centerText: 'Record Again',
    centerIcon: (
      <Popconfirm
        placement='top'
        title='Are you sure you want to replace your previous video?'
        onConfirm={() => {
          setVideoSaved(false);
          setRecordAgain(true);
        }}
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
        <Record style={{ height: '100%' }} />
      </Popconfirm>
    ),
  };

  const rightBtn = (videoExist || videoSaved) && {
    rightText: 'Back to chain',
    rightIcon: <SplitCellsOutlined style={{ fontSize: 22 }} />,
    rightTo: createdChain?.initiatorId === user?.attributes.sub
      ? `${Links.Chain}/${createdChain?.chainId}/${createdChain?.initiatorId}`
      : `${Links.Toast}/${getName(createdChain?.recipientName as string)}/${createdChain?.chainId}`,
  };

  return (
    <Spin spinning={isLoading} tip='Loading...'>
      <Wrapper noPadding={((videoExist || videoSaved) && !recordAgain)} height='auto'>

        {/* we need isEditReady condition bcoz when we come from Chain menu "Record invitation again", we must w8 for
        all important data for video, bcoz we must render addpipe player just once with all data,
        in any other cases we will before load video, watch it and then override
        PS. we cannot update data inside useEffect bcoz there are bugs on mobile devices */}
        {localStorage.getItem("editInvitation") && !isEditReady ? null : renderPlayer()}

        <NavigationFooter
          {...centerBtn}
          {...rightBtn}
        />
      </Wrapper>
    </Spin>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ToastRecorder);