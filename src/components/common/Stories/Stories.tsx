import { useMemo, useRef } from 'react';
import { Col, Row } from 'antd';
import { CaretRightOutlined, PauseOutlined } from '@ant-design/icons';
import { default as Carousel } from 'react-insta-stories';
import map from 'lodash/map';
import toLower from 'lodash/toLower';
import upperFirst from 'lodash/upperFirst';

import { useMemoState } from 'hooks';
import { TChainVideo } from 'types';

import { MuteButton } from './MuteButton';

import styles from './Stories.module.scss';

interface IChainVideos {
  play?: boolean;
  onTogglePlay?: () => void;
  chainVideos: TChainVideo[] | null;
  initiatedVideo: TChainVideo;
  recipientVideo: TChainVideo;
  isPurchased: boolean;
}

export const Stories = ({
  play,
  onTogglePlay,
  chainVideos,
  initiatedVideo,
  recipientVideo,
  isPurchased,
}: IChainVideos) => {
  const ref = useRef<HTMLDivElement>(null);
  const [videoPlayer, setVideoPlayer] = useMemoState<HTMLVideoElement | null>(null);

  const stories = useMemo(() => {
    let videos = [initiatedVideo, ...(chainVideos || [])];

    if(recipientVideo) {
      videos = [recipientVideo, ...videos];
    }

    if(initiatedVideo || chainVideos?.length) {
      return map(videos, video => ({
        url: video?.url,
        type: 'video',
        header: {
          heading: video?.participantName.replaceAll('+', ' ') as string,
          subheading: upperFirst(toLower(video?.type)),
          profileImage: video?.participantPhoto as string,
        },
      }));
    }

    return [];
  }, [chainVideos, initiatedVideo]);

  // for check, player is already mounted
  const checkExist = setInterval(() => {
    const videoPlayer = ref?.current?.getElementsByTagName('video')[0];

    if (videoPlayer) {
      setVideoPlayer(videoPlayer);
      clearInterval(checkExist);
    }
  }, 100);

  if(!initiatedVideo && !chainVideos?.length) {
    return (
      <div className={styles.videoPlayerText}>
        The video has not been uploaded yet.
        You can close this page and come back later or wait, it will update automatically!
      </div>
    );
  }

  if(!play && (initiatedVideo || chainVideos?.length)) {
    return (
      <div className={styles.stubContainer}>
        {!isPurchased && <div className={styles.watermark}/>}
        <div className={styles.stubLinesContainer}>
          <Row className={styles.stubStoriesLine} gutter={4}>
            {stories.map(st => (
              <Col flex={1} key={st.url}>
                <div className={styles.stubStoriesString} />
              </Col>
            ))}
          </Row>
        </div>
        <img
          src={initiatedVideo?.snapshotUrl}
          className={styles.stubImage}
        />
        <button onClick={onTogglePlay} className={styles.playButton}>
          <CaretRightOutlined />
        </button>
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className={styles.storiesContainer}
    >
      {!isPurchased && <div className={styles.watermark}/>}
      <Carousel
        onAllStoriesEnd={onTogglePlay}
        stories={stories.length ? stories : [{ url: '' }]}
        width={window.innerWidth}
        height={350}
        storyStyles={{
          width: 'auto',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      />
      <MuteButton videoPlayer={videoPlayer} />

      <button onClick={onTogglePlay} className={styles.pauseButton}>
        <PauseOutlined />
      </button>
    </div>
  );
};