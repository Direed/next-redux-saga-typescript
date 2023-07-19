import { useDispatch } from 'react-redux';
import { Col, Divider, Row, Space, Spin } from 'antd';
//@ts-ignore there is no package with types
import { parsePhoneNumber } from 'react-phone-number-input';

import { deleteRecordedVideo, updateToastChain } from 'graphql/mutations';
import { createdChainVideoDeleteGraphAction, videoDeleteAction } from 'redux-base/actions';

import Links from 'links';
import { useMemoState } from 'hooks';
import { TChainVideo, TCreatedChain, TUser } from 'types';

import { Header, Wrapper, PhotoWithInfo, Menu, TMenuItem } from 'components/common';
import {useRouter} from "next/router";

interface IToastParticipants {
  user: TUser;
  isLoading: boolean;
  chainVideos: TChainVideo[] | null;
  createdChain: TCreatedChain;

  createdChainUpdateGraphAction: (data: { schema: unknown; variables: Record<string, unknown> }) => void;
}

export const ChainParticipants = ({
  user,
  isLoading,
  chainVideos,
  createdChain,

  createdChainUpdateGraphAction,
}: IToastParticipants) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [participant, setParticipant] = useMemoState<TChainVideo | null>(null);

  let menuItems: TMenuItem[] = [{
    text: 'View video',
    onClick: () => {
      router.push({
        pathname: Links.ToastRecorder,
      })
      if (participant?.id) {
        localStorage.setItem("participantVideoId", participant.id)
      }
    },
  }];

  if(!createdChain?.finalized) {
    menuItems = [{
      ...menuItems[0],
      border: true,
    }, {
      text: 'Remove',
      color: 'red',
      onClick: () => handleRemoveParticipant(),
    }];
  }

  const handleRemoveParticipant = () => {
    if(participant?.initiatorId !== user?.attributes.sub) {
      createdChainUpdateGraphAction({
        schema: updateToastChain,
        variables: {
          input: {
            chainId: createdChain?.chainId,
            participantIds: createdChain?.participantIds.filter(part => part !== participant?.participantId),
          },
        },
      });
    }
    dispatch(createdChainVideoDeleteGraphAction({
      schema: deleteRecordedVideo,
      variables: { input: { id: participant?.id } },
    }));
    dispatch(videoDeleteAction(participant?.videoName as string));
  };

  return (
    <Spin spinning={isLoading} tip='Loading...'>
      <Wrapper>
        <Header
          leftOnClick={router.back}
          margin={0}
          title='Toast Participants'
        />
        <Divider
          style={{
            fontSize: 14,
            margin: '30px 0',
          }}
          orientation='left'
        >
          Video sent
        </Divider>

        <Space size={30} direction='vertical' style={{ width: '100%' }}>
          {chainVideos?.map(video => (
            <Row key={video?.participantPhone}>
              <Col xs={24} style={{ position: 'relative' }}>
                <PhotoWithInfo
                  name={video?.participantName?.replaceAll('+', ' ')}
                  text={parsePhoneNumber(String(video?.participantPhone))?.formatInternational()}
                  photo={video?.participantPhoto}
                  extraElement={(
                    <Menu
                      title='Toast Participant'
                      menuItems={menuItems}
                      onClick={() => setParticipant(video)}
                    />
                  )}
                />
              </Col>
            </Row>
          ))}
        </Space>
      </Wrapper>
    </Spin>
  );
};
